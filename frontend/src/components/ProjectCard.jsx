import './ProjectCard.css'

function ProjectCard({ title, description, tech, image, featured, link}) {
    return (
        <article className={featured ? "project-card featured" : "project-card"}>
            <div className="project-media">
                {image
                ? <img src={image} alt={title} />
                : <div className="project-placeholder"></div>}
            </div>

            <div className="project-body">
                <h3 className="project-title">{title}</h3>
                <p className="project-desc">{description}</p>

                <div className="project-tags">
                    {tech.map((t) => (
                        <span className="tag" key={t}>{t}</span>
                    ))}
                </div>

                <a href={link} className="project-link" target="_blank" rel="noopener noreferrer">Bekijk project →</a>
            </div>
        </article>
    )
}

export default ProjectCard