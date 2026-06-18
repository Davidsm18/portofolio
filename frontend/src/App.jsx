import { useEffect } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Projects from "./pages/Projects"


function App() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`)
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="App">
      <div className="cursor-glow"></div>
      <Navbar />
      <section id="home"><Home /></section>
      <section id="projecten"><Projects /></section>
      <section id="about"><About /></section>
      <section id="contact"><Contact /></section>
    </div>
  )
}

export default App
 
