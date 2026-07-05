import { useEffect, useState } from 'react'
import './IntroReveal.css'

function IntroReveal() {
  const [leaving, setLeaving] = useState(false) // scherm veegt weg
  const [gone, setGone] = useState(false)       // helemaal uit de pagina

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), 1600)
    const goneTimer = setTimeout(() => setGone(true), 2400)
    return () => {
      clearTimeout(leaveTimer)
      clearTimeout(goneTimer)
    }
  }, [])

  if (gone) return null

  return (
    <div className={leaving ? 'intro-reveal leaving' : 'intro-reveal'} aria-hidden="true">
      <div className="reveal-glow"></div>
      <div className="reveal-content">
        <div className="reveal-mask">
          <h1 className="reveal-name">
            David <span className="reveal-accent">Mateman</span>
          </h1>
        </div>
        <div className="reveal-line"></div>
      </div>
    </div>
  )
}

export default IntroReveal
