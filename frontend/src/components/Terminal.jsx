import { useEffect, useRef, useState } from 'react'
import './Terminal.css'

// De tekst die "getypt" wordt — pas dit gerust aan
const SCRIPT = [
  { prompt: false, text: "import { useState } from 'react'" },
  { prompt: false, text: "import { bouwen } from './ambitie'" },
  { prompt: false, text: '' },
  { prompt: false, text: 'function Developer() {' },
  { prompt: false, text: '  const [naam] = useState("David Mateman")' },
  { prompt: false, text: '  const rol = "ICT-student & ondernemer"' },
  { prompt: false, text: '  const stack = ["React", "PHP", "MySQL", "Shopify"]' },
  { prompt: false, text: '' },
  { prompt: false, text: '  // geen schoolopdrachten,' },
  { prompt: false, text: '  // maar echte producten' },
  { prompt: false, text: '  return bouwen(naam, stack)' },
  { prompt: false, text: '}' },
  { prompt: false, text: '' },
  { prompt: false, text: 'export default Developer' },
]

// Declaratie-keywords (blauw) en control-keywords (paars) — vul gerust aan
const KEYWORDS = ['const', 'let', 'var', 'function', 'true', 'false', 'null']
const CONTROL = ['return', 'if', 'else', 'await', 'async', 'new', 'import', 'export', 'from']

// Mini-tokenizer: hakt een (halve) regel in stukjes en geeft elk een kleur-class
function highlight(code) {
  const re = /(\s+)|("[^"]*"?|'[^']*'?)|(\/\/.*)|(\d+(?:\.\d+)?)|([A-Za-z_$][\w$]*)|([^\s])/g
  const parts = []
  let m
  while ((m = re.exec(code)) !== null) {
    const token = m[0]
    if (m[1]) { parts.push(token); continue }   // spaties: ongekleurd doorlaten
    let cls
    if (m[2]) cls = 'tok-string'                 // "..." of '...'
    else if (m[3]) cls = 'tok-comment'           // // commentaar
    else if (m[4]) cls = 'tok-number'            // getallen
    else if (m[5]) {                             // een woord (naam of keyword)
      if (CONTROL.includes(token)) cls = 'tok-control'         // return, import... (paars)
      else if (KEYWORDS.includes(token)) cls = 'tok-keyword'   // const, let... (blauw)
      else if (/^[A-Z]/.test(token)) cls = 'tok-type'          // Component/Type (groenblauw)
      else if (code[re.lastIndex] === '(') cls = 'tok-func'    // functie-aanroep (geel)
      else cls = 'tok-ident'                                   // variabele/property (lichtblauw)
    }
    else cls = 'tok-punct'                        // { } ( ) , ; : = > enz.
    parts.push(<span className={cls} key={parts.length}>{token}</span>)
  }
  return parts
}

function Terminal() {
  // Respecteert 'reduced motion' zonder extra library
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [lines, setLines] = useState(reduce ? SCRIPT.map((l) => l.text) : [])
  const [current, setCurrent] = useState('')
  const bodyRef = useRef(null)

  useEffect(() => {
    if (reduce) return
    let line = 0
    let char = 0
    const timer = setInterval(() => {

      if (line >= SCRIPT.length) {
        line = 0
        char = 0
        setLines([])
        setCurrent('')
        return
      }

      const target = SCRIPT[line].text
      char++
      setCurrent(target.slice(0, char))
      if (char >= target.length) {
        setLines((prev) => [...prev, target])
        setCurrent('')
        line++
        char = 0
      }
    }, 28) // lager = sneller typen
    return () => clearInterval(timer)
  }, [reduce])

  // Scroll automatisch mee naar onderen zodra er een regel bijkomt
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [lines, current])

  const renderLine = (text, i) => {
    const isPrompt = SCRIPT[i]?.prompt
    return (
      <p key={i} className="term-line">
        {isPrompt && <span className="term-prompt">$ </span>}
        {highlight(text)}
      </p>
    )
  }

  return (
    <div className="terminal" aria-hidden="true">
      {/* Vensterbalk */}
      <div className="terminal-bar">
        <span className="term-dot term-dot-red"></span>
        <span className="term-dot term-dot-yellow"></span>
        <span className="term-dot term-dot-green"></span>
        <span className="terminal-title">david@portfolio ~ zsh</span>
      </div>

      {/* Inhoud */}
      <div className="terminal-body" ref={bodyRef}>
        {lines.map(renderLine)}
        {current && renderLine(current, lines.length)}
        <span className="term-cursor"></span>
      </div>
    </div>
  )
}

export default Terminal
