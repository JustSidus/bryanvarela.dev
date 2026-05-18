import { useState, useEffect } from "react";

/**
 * TypingLine - renders text with a typing animation, ending with a blinking cursor.
 * The text appears character by character, then the cursor blinks indefinitely.
 *
 * @param {string} text - The text to type out
 * @param {number} speed - Milliseconds per character (default: 35)
 * @param {number} startDelay - Milliseconds before typing starts (default: 800)
 */
export function TypingLine({ text, speed = 35, startDelay = 800 }) {
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setTyping(true);
    }, startDelay);
    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!typing) return;
    if (displayed.length >= text.length) {
      setDone(true);
      return;
    }
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [typing, displayed, text, speed]);

  return (
    <span className="typing-line">
      {displayed}
      <span className={`typing-cursor ${done ? "blink" : ""}`}></span>
    </span>
  );
}
