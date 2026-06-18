import './About.css'

const skills = [
    { label: "Stack", items: ["React", "Next.js"] },
    { label: "Backend", items: ["Python", "PostgreSQL"] },
    { label: "AI Tools", items: ["LangChain", "PyTorch"] },
    { label: "Cloud", items: ["AWS", "Docker"] },
]

function About () {
    return (
        <div className="container about-inner">
            <div className="about-image">
                {/*foto van mezelf*/}
            </div>

            <div className="about-text">
                <h2 className="section-title">Gedreven door innovatie en AI-gestuurde workflows</h2>

                <p className="about-p">
                    Als ICT-student en ondernemer van nature zie ik technologie niet als doel,
                    maar als hefboom. Ik combineer software engineering met moderne AI-tools om
                    sneller, slimmer en met meer precisie te bouwen.
                </p>
                <p className="about-p">
                    Mijn focus ligt op digitale producten die meetbare impact maken — van een
                    complexe SaaS-oplossing tot een gestroomlijnde website. Ik breng een
                    ondernemende mindset naar elke regel code.
                </p>

                <div className="skills-grid">
                    {skills.map((group) =>(
                        <div className="skill-group" key={group.label}>
                            <span className="skill-label">{group.label}</span>
                            <div className="skill-tags">
                                {group.items.map((item) => (
                                    <span className="tag" key={item}>{item}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default About