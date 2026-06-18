import './Projects.css'
import ProjectCard from '../components/ProjectCard'

const projects = [
  {
    title: "Nexus AI Intelligence Hub",
    description: "Een gecentraliseerd platform voor AI-agent orchestratie. Gebouwd met Next.js en Python om complexe workflows te automatiseren.",
    tech: ["Next.js", "Python", "FastAPI", "OpenAI API"],
    featured: true,
  },
  {
    title: "Minimalist E-comm",
    description: "High-performance webshop met headless CMS-integratie en Stripe-betalingen.",
    tech: ["React", "Sanity"],
  },
  {
    title: "CloudOps Automator",
    description: "Infrastructure-as-code tool voor snelle deployment op AWS en Vercel.",
    tech: ["AWS", "Node.js"],
  },
]

function Projects() {
  return (
    <div className="container">
      <div className="section-head">
        <h2 className="section-title">Geselecteerde Projecten</h2>
        <div className="section-bar"></div>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            tech={project.tech}
            image={project.image}
            featured={project.featured}
          />
        ))}
      </div>
    </div>
  )
}

export default Projects