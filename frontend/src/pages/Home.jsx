import './Home.css'
import heroFoto from '../assets/hero.png'
import Terminal from '../components/Terminal'
import { useLanguage } from '../context/LanguageContext'


function Home() {
    const { t } = useLanguage()

    return (
        <div className="hero">
            <div className="hero-glow"></div>

            <div className="container hero-inner">
                <div className="hero-text">

                    <h1 className="hero-title">
                        {t.hero.titlePre}<span className="accent">David</span>{t.hero.titlePost}
                    </h1>

                    <p className="hero-subtitle">
                        {t.hero.subtitle}
                    </p>

                    <div className="hero-actions">
                        <a href="#projecten" className="btn btn-primary">{t.hero.projectsBtn}</a>
                        <a href="#about" className="btn btn-secondary">{t.hero.aboutBtn}</a>
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