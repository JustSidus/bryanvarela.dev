import { Terminal, TermLine, TermOut, TermCur } from '../ui/Terminal'
import { KeyValue } from '../ui/KeyValue'
import { contact } from '../../data/contact'

/**
 * ContactSh — terminal-style contact section.
 * Contact data comes from src/data/contact.js — edit that file to update info.
 */
export function ContactSh() {
  return (
    <div className="md">
      <h1>
        <span className="h1-prefix">$</span>
        contact.sh
      </h1>
      <p className="lede">
        Si lo que viste te encaja — un rol backend, una arquitectura que
        revisar, o solo cambiar opiniones sobre multi-tenant — escríbeme.
        Respondo en horas hábiles.
      </p>

      <Terminal title="contact.sh — bash · 80×24">
        <TermLine prompt="bryan@portfolio:~$" cmd="cat contact.json" />
        <TermOut>{'{'}</TermOut>
        <TermOut>  "email":    <a href={`mailto:${contact.email}`}>{`"${contact.email}"`}</a>,</TermOut>
        <TermOut>  "github":   <a href={contact.github} target="_blank" rel="noreferrer">{`"${contact.githubUser}"`}</a>,</TermOut>
        <TermOut>  "linkedin": <a href={contact.linkedin} target="_blank" rel="noreferrer">"linkedin.com/in/bryanvarela"</a>,</TermOut>
        <TermOut>{`  "timezone": "${contact.timezone}",`}</TermOut>
        <TermOut>{`  "open_to":  ${JSON.stringify(contact.openTo)}`}</TermOut>
        <TermOut>{'}'}</TermOut>
        <TermLine prompt="bryan@portfolio:~$" cmd={`echo "ready"`} style={{ marginTop: 12 }}>
          <TermCur />
        </TermLine>
      </Terminal>

      <KeyValue entries={[
        { key: 'prefer', value: contact.prefer },
        { key: 'format', value: contact.format },
        { key: 'no-thanks', value: contact.noThanks },
      ]} style={{ marginTop: 28 }} />
    </div>
  )
}