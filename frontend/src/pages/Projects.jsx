import { useState, useEffect } from 'react'
import './Projects.css'
import ProjectCard from '../components/ProjectCard'

function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Kon projecten niet laden:', err))
  }, [])

  return (
    <div className="container">
      <div className="section-head">
        <h2 className="section-title">Geselecteerde Projecten</h2>
        <div className="section-bar"></div>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  )
}

export default Projects