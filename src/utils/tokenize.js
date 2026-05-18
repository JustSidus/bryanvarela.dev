/**
 * tokenize(code, lang) → array of { text, type } tokens
 *
 * Supported types: keyword, string, number, comment, function,
 *                  type, punctuation, operator, key, value, plain
 */

// ── helpers ───────────────────────────────────────────────────────────────────

function esc(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Regex-based tokenizer. Rules are matched in order; first match wins.
 * Each rule: { re, type } where re is a sticky RegExp (lastIndex-aware).
 */
function tokenizeWithRules(code, rules) {
  const tokens = [];
  let pos = 0;

  while (pos < code.length) {
    let matched = false;
    for (const { re, type } of rules) {
      re.lastIndex = pos;
      const m = re.exec(code);
      if (m && m.index === pos) {
        tokens.push({ text: m[0], type });
        pos += m[0].length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      // advance one char as plain
      if (tokens.length && tokens[tokens.length - 1].type === "plain") {
        tokens[tokens.length - 1].text += code[pos];
      } else {
        tokens.push({ text: code[pos], type: "plain" });
      }
      pos++;
    }
  }
  return tokens;
}

// ── language rule sets ────────────────────────────────────────────────────────

const TS_KEYWORDS = [
  "abstract",
  "as",
  "async",
  "await",
  "boolean",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "constructor",
  "continue",
  "declare",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "from",
  "function",
  "get",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "let",
  "module",
  "namespace",
  "new",
  "null",
  "number",
  "object",
  "of",
  "override",
  "private",
  "protected",
  "public",
  "readonly",
  "return",
  "set",
  "static",
  "string",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "type",
  "typeof",
  "undefined",
  "var",
  "void",
  "while",
  "yield",
];

const CS_KEYWORDS = [
  "abstract",
  "async",
  "await",
  "base",
  "bool",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "checked",
  "class",
  "const",
  "continue",
  "decimal",
  "default",
  "delegate",
  "do",
  "double",
  "else",
  "enum",
  "event",
  "explicit",
  "extern",
  "false",
  "finally",
  "fixed",
  "float",
  "for",
  "foreach",
  "get",
  "goto",
  "if",
  "implicit",
  "in",
  "int",
  "interface",
  "internal",
  "is",
  "lock",
  "long",
  "namespace",
  "new",
  "null",
  "object",
  "operator",
  "out",
  "override",
  "params",
  "private",
  "protected",
  "public",
  "readonly",
  "record",
  "ref",
  "return",
  "sbyte",
  "sealed",
  "set",
  "short",
  "sizeof",
  "stackalloc",
  "static",
  "string",
  "struct",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "uint",
  "ulong",
  "unchecked",
  "unsafe",
  "ushort",
  "using",
  "var",
  "virtual",
  "void",
  "volatile",
  "while",
  "yield",
];

function buildTsRules() {
  const kw = new RegExp(`\\b(${TS_KEYWORDS.join("|")})\\b`, "g");
  return [
    { re: /\/\/[^\n]*/g, type: "comment" },
    { re: /\/\*[\s\S]*?\*\//g, type: "comment" },
    { re: /`(?:[^`\\]|\\.)*`/g, type: "string" },
    { re: /"(?:[^"\\]|\\.)*"/g, type: "string" },
    { re: /'(?:[^'\\]|\\.)*'/g, type: "string" },
    { re: /\b\d+(\.\d+)?\b/g, type: "number" },
    { re: kw, type: "keyword" },
    { re: /\b[A-Z][A-Za-z0-9_]*\b/g, type: "type" },
    { re: /\b[a-z_][a-zA-Z0-9_]*(?=\s*\()/g, type: "function" },
    { re: /[{}[\]().,;:<>!=+\-*/%&|^~?]/g, type: "punctuation" },
  ];
}

function buildCsRules() {
  const kw = new RegExp(`\\b(${CS_KEYWORDS.join("|")})\\b`, "g");
  return [
    { re: /\/\/[^\n]*/g, type: "comment" },
    { re: /\/\*[\s\S]*?\*\//g, type: "comment" },
    { re: /"(?:[^"\\]|\\.)*"/g, type: "string" },
    { re: /\$"(?:[^"\\]|\\.)*"/g, type: "string" },
    { re: /@"(?:[^"]|"")*"/g, type: "string" },
    { re: /\b\d+(\.\d+)?[fFdDmML]?\b/g, type: "number" },
    { re: kw, type: "keyword" },
    { re: /\b[A-Z][A-Za-z0-9_<>]*\b/g, type: "type" },
    { re: /\b[a-z_][a-zA-Z0-9_]*(?=\s*\()/g, type: "function" },
    { re: /[{}[\]().,;:<>!=+\-*/%&|^~?]/g, type: "punctuation" },
  ];
}

function buildMdRules() {
  return [
    // fenced code block
    { re: /```[\s\S]*?```/g, type: "comment" },
    // headings - whole line (# heading text)
    { re: /^#{1,6} [^\n]+/gm, type: "heading" },
    // bold **...**
    { re: /\*\*[^*]+\*\*/g, type: "bold" },
    // italic *...*
    { re: /\*[^*\n]+\*/g, type: "italic" },
    // inline code `...`
    { re: /`[^`\n]+`/g, type: "string" },
    // blockquote >
    { re: /^>(?= )/gm, type: "punctuation" },
    // links [text](url)
    { re: /\[[^\]]*\]\([^)]*\)/g, type: "function" },
    // comment-style lines starting with //
    { re: /\/\/[^\n]*/g, type: "comment" },
    // bullet markers - at start of line
    { re: /^[-*+](?= )/gm, type: "punctuation" },
    // numbers
    { re: /\b\d+(\.\d+)?\b/g, type: "number" },
  ];
}

function buildJsonRules() {
  return [
    // string keys (before colon)
    { re: /"(?:[^"\\]|\\.)*"(?=\s*:)/g, type: "key" },
    // short strings (≤30 chars) inside arrays — tech names like "C#", "React", ".NET 10"
    { re: /"[^"\\]{1,30}"(?=\s*[,\]])/g, type: "type" },
    // string values (long descriptions)
    { re: /"(?:[^"\\]|\\.)*"/g, type: "string" },
    // numbers
    { re: /\b-?\d+(\.\d+)?([eE][+-]?\d+)?\b/g, type: "number" },
    // keywords: true, false, null
    { re: /\b(true|false|null)\b/g, type: "keyword" },
    // punctuation
    { re: /[{}[\],:]/g, type: "punctuation" },
  ];
}

function buildPhpRules() {
  const PHP_KEYWORDS = [
    "abstract",
    "array",
    "as",
    "bool",
    "break",
    "callable",
    "case",
    "catch",
    "class",
    "clone",
    "const",
    "continue",
    "declare",
    "default",
    "do",
    "echo",
    "else",
    "elseif",
    "empty",
    "enum",
    "extends",
    "false",
    "final",
    "finally",
    "float",
    "fn",
    "for",
    "foreach",
    "function",
    "if",
    "implements",
    "include",
    "instanceof",
    "interface",
    "int",
    "isset",
    "list",
    "match",
    "namespace",
    "new",
    "null",
    "object",
    "print",
    "private",
    "protected",
    "public",
    "readonly",
    "return",
    "static",
    "string",
    "switch",
    "throw",
    "trait",
    "true",
    "try",
    "unset",
    "use",
    "void",
    "while",
    "yield",
  ];
  const kw = new RegExp(`\\b(${PHP_KEYWORDS.join("|")})\\b`, "g");
  return [
    { re: /\/\/[^\n]*/g, type: "comment" },
    { re: /#[^\n]*/g, type: "comment" },
    { re: /\/\*[\s\S]*?\*\//g, type: "comment" },
    { re: /"(?:[^"\\]|\\.)*"/g, type: "string" },
    // array key (single-quoted) before => must come BEFORE generic string rule
    { re: /'[^']*'(?=\s*=>)/g, type: "prop" },
    { re: /'(?:[^'\\]|\\.)*'/g, type: "string" },
    // PHP variables ($var) — distinct from class names
    { re: /\$[a-zA-Z_][a-zA-Z0-9_]*/g, type: "variable" },
    { re: /\b\d+(\.\d+)?\b/g, type: "number" },
    { re: kw, type: "keyword" },
    { re: /\b[A-Z][A-Za-z0-9_]*\b/g, type: "type" },
    { re: /\b[a-z_][a-zA-Z0-9_]*(?=\s*\()/g, type: "function" },
    { re: /[{}[\]().,;:<>!=+\-*\/%&|^~?@\\]/g, type: "punctuation" },
  ];
}

function buildShRules() {
  return [
    // shebang
    { re: /^#!.*/gm, type: "comment" },
    // comments
    { re: /#[^\n]*/g, type: "comment" },
    // JSON-style keys ("key": ...) inside heredocs
    { re: /"[^"\\]*"(?=\s*:)/g, type: "prop" },
    // strings
    { re: /"(?:[^"\\]|\\.)*"/g, type: "string" },
    { re: /'[^']*'/g, type: "string" },
    // heredoc-ish (just colorize $(...) and `...`)
    { re: /\$\([^)]*\)/g, type: "function" },
    { re: /`[^`]*`/g, type: "function" },
    // variables $VAR, ${VAR}
    { re: /\$\{?[A-Za-z_][A-Za-z0-9_]*\}?/g, type: "variable" },
    // numbers
    { re: /\b\d+\b/g, type: "number" },
    // shell keywords
    {
      re: /\b(if|then|else|elif|fi|for|while|do|done|case|esac|in|function|return|local|export|echo|read|set|unset|source|exit|shift|break|continue|true|false)\b/g,
      type: "keyword",
    },
    // shell builtins / common commands
    {
      re: /\b(cat|ls|cd|mkdir|rm|cp|mv|grep|sed|awk|curl|wget|git|npm|node|bash|sh|printf|test)\b/g,
      type: "function",
    },
    // operators
    { re: /[|&;><()\[\]=!+\-*\/{}]/g, type: "punctuation" },
  ];
}

// ── cache rule sets (avoid rebuilding per line) ───────────────────────────────

const RULE_CACHE = {};

function getRules(lang) {
  if (!RULE_CACHE[lang]) {
    switch (lang) {
      case "ts":
        RULE_CACHE[lang] = buildTsRules();
        break;
      case "cs":
        RULE_CACHE[lang] = buildCsRules();
        break;
      case "md":
        RULE_CACHE[lang] = buildMdRules();
        break;
      case "json":
        RULE_CACHE[lang] = buildJsonRules();
        break;
      case "php":
        RULE_CACHE[lang] = buildPhpRules();
        break;
      case "sh":
        RULE_CACHE[lang] = buildShRules();
        break;
      default:
        RULE_CACHE[lang] = [];
        break;
    }
  }
  // reset lastIndex on all rules before each use
  const rules = RULE_CACHE[lang];
  rules.forEach((r) => {
    r.re.lastIndex = 0;
  });
  return rules;
}

// ── public API ────────────────────────────────────────────────────────────────

/**
 * tokenize(code, lang) → { lines: string[][], tokens: Token[][] }
 * where tokens[i] is the array of { text, type } for line i.
 */
export function tokenize(code, lang) {
  const rules = getRules(lang);

  if (!rules.length) {
    // no highlighting - each line is a single plain token
    const lines = code.split("\n");
    return lines.map((line) => [{ text: line, type: "plain" }]);
  }

  // tokenize the full code, then split into lines
  const allTokens = tokenizeWithRules(code, rules);

  // re-split tokens at newline boundaries to get per-line arrays
  const lines = [];
  let currentLine = [];

  for (const tok of allTokens) {
    const parts = tok.text.split("\n");
    parts.forEach((part, i) => {
      if (part) currentLine.push({ text: part, type: tok.type });
      if (i < parts.length - 1) {
        lines.push(currentLine);
        currentLine = [];
      }
    });
  }
  lines.push(currentLine);

  return lines;
}

/**
 * CSS class for a token type.
 */
export function tokenClass(type) {
  const map = {
    keyword: "tk-key",
    string: "tk-str",
    number: "tk-num",
    comment: "tk-com",
    function: "tk-fn",
    type: "tk-typ",
    variable: "tk-var",
    prop: "tk-prop",
    heading: "tk-head",
    bold: "tk-bold",
    italic: "tk-italic",
    punctuation: "tk-pun",
    operator: "tk-pun",
    key: "tk-prop",
    value: "tk-str",
    plain: "",
  };
  return map[type] || "";
}
