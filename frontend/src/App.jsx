import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Footer from "./components/Footer"


function App() {
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

export default App
 
