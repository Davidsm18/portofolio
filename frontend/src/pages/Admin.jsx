import { useState } from 'react'
import './Admin.css'
import Login from '../components/Login'
import ProjectsManager from '../components/ProjectsManager'
import AboutManager from '../components/AboutManager'
import SkillsManager from '../components/SkillsManager'

function Admin() {
  const [token, setToken] = useState(localStorage.getItem('cms_token') || '')

  function handleLogout() {
    localStorage.removeItem('cms_token')
    setToken('')
  }

  // Niet ingelogd → toon het login-scherm
  if (!token) {
    return <Login onSuccess={setToken} />
  }

  // Wel ingelogd → toon de beheer-managers
  return (
    <div className="admin-page">
      <div className="admin">
        <div className="admin-row">
          <h1 className="admin-title">CMS — Beheer</h1>
          <button className="admin-btn" onClick={handleLogout}>Uitloggen</button>
        </div>
        <p className="admin-sub">Beheer hier je portfolio-inhoud.</p>

        <ProjectsManager />
        <AboutManager />
        <SkillsManager />
      </div>
    </div>
  )
}

export default Admin
