import { useState } from 'react'
import './Login.css'

const API = 'http://localhost:3001/api'

function Login({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Onjuist wachtwoord')
        return res.json()
      })
      .then((data) => {
        localStorage.setItem('cms_token', data.token)
        onSuccess(data.token)
      })
      .catch((err) => setError(err.message))
  }

  return (
    <div className="login-container">
      <div className="login-top"></div>
      <div className="login-bottom"></div>

      <form className="login-center" onSubmit={handleSubmit}>
        <h2>Inloggen</h2>
        <input
          type="password"
          placeholder="wachtwoord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-btn">Sign in</button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  )
}

export default Login
