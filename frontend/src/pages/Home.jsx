import './Home.css'
import heroFoto from '../assets/hero.png'
import Terminal from '../components/Terminal'


function Home() {
    return (
        <div className="hero">
            <div className="hero-glow"></div>

            <div className="container hero-inner">
                <div className="hero-text">

                    <h1 className="hero-title">
                        Ik ben <span className="accent">David</span>, ICT-student &amp; ondernemer
                    </h1>

                    <p className="hero-subtitle">
                        School is voor mij de startbaan, niet de bestemming. Ik gebruik elke skill die ik leer meteen om m'n eigen bedrijven groter te maken. Tegen de tijd dat ik klaar ben met studeren, draaien ze al jaren.
                    </p>

                    <div className="hero-actions">
                        <a href="#projecten" className="btn btn-primary">Bekijk projecten</a>
                        <a href="#about" className="btn btn-secondary">Meer over mij</a>
                    </div>
                    <div className="hero-terminal">
                        <Terminal />
                    </div>
                </div>

                <div className="hero-image">
                    <img src={heroFoto} alt="David Mateman" />
                </div>
            </div>
        </div>
    )
}

export default Home