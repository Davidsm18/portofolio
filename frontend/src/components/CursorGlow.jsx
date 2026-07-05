import { useEffect, useRef } from 'react'
import './CursorGlow.css'

function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current

    // Doel = waar de muis is; huidig = waar de gloed nu is
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let frame

    function handleMove(e) {
      targetX = e.clientX
      targetY = e.clientY
    }

    function animate() {
      // Beweeg de gloed 15% richting de muis per frame → zachte, volgende beweging
      currentX += (targetX - currentX) * 0.15
      currentY += (targetY - currentY) * 0.15
      glow.style.transform = `translate(${currentX}px, ${currentY}px)`
      frame = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove)
    frame = requestAnimationFrame(animate)

    // Opruimen als het component verdwijnt
    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true"></div>
}

export default CursorGlow
