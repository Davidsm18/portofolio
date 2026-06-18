import './Home.css'
import heroFoto from '../assets/hero.png'


function Home () {
    return (
        <div className="hero">
            <div className="hero-glow"></div>

            <div className="container hero-inner">
                <div className="hero-text">
                    <div className="hero-badge">
                        <span className="hero-dot"></span>
                        <span>AI-FIRST WORKFLOW</span>
                    </div>

                    <h1 className="hero-title">
                        Ik ben <span className="accent">David</span>, ICT-student &amp; ondernemer
                    </h1>

                    <p cassName="hero-subtitle">
                        Ik bouw software niet als schoolopdracht, maar om er echte producten mee te lanceren
                    </p>

                    <div className="hero-actions">
                        <a href="#projecten" className="btn btn-primary">Bekijk projecten</a>
                        <a href="#about" className="btn btn-secondary">Meer over mij</a>
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