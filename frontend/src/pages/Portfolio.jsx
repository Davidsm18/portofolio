import Navbar from "../components/Navbar"
import Home from "./Home"
import Contact from "./Contact"
import About from "./About"
import Projects from "./Projects"
import Footer from "../components/Footer"
import CursorGlow from "../components/CursorGlow"
import IntroReveal from "../components/IntroReveal"

function Portfolio() {
  return (
    <div className="App">
      <IntroReveal />
      <CursorGlow />
      <header>
        <Navbar />
      </header>
      <main>
        <section id="home"><Home /></section>
        <section id="projecten"><Projects /></section>
        <section id="about"><About /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  )
}

export default Portfolio
