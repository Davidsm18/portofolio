import { useState, useEffect } from 'react'
import './About.css'

function About() {
  const [about, setAbout] = useState({ heading: '', intro: '' })
  const [skills, setSkills] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/about')
      .then((res) => res.json())
      .then((data) => setAbout(data))
      .catch((err) => console.error('Kon about niet laden:', err))

    fetch('http://localhost:3001/api/skills')
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error('Kon skills niet laden:', err))
  }, [])

  return (
    <div className="container about-inner">
      <div className="about-image"></div>

      <div className="about-text">
        <h2 className="section-title">{about.heading}</h2>

        {about.intro.split('\n\n').map((alinea, i) => (
          <p className="about-p" key={i}>{alinea}</p>
        ))}

        <div className="skills-grid">
          {skills.map((group) => (
            <div className="skill-group" key={group.id}>
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