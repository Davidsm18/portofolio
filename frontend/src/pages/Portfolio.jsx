import Navbar from "../components/Navbar"
import Home from "./Home"
import Contact from "./Contact"
import About from "./About"
import Projects from "./Projects"
import Footer from "../components/Footer"

function Portfolio() {
  return (
    <div className="App">
      <Navbar />
      <section id="home"><Home /></section>
      <section id="projecten"><Projects /></section>
      <section id="about"><About /></section>
      <section id="contact"><Contact /></section>
      <Footer />
    </div>
  )
}

export default Portfolio
