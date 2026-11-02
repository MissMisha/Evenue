import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    setMessage('Login details submitted.')
  }

  return (
    <main className="login-page login-themed">
      <div className="login-decoration login-decoration-left" aria-hidden="true">
        <span className="login-spark">✦</span>
        <span className="login-decoration-line" />
        <strong>Plan beautifully</strong>
        <small>Bring every detail together.</small>
      </div>
      <div className="login-decoration login-decoration-right" aria-hidden="true">
        <span className="login-orbit-dot" />
        <span className="login-orbit-dot login-orbit-dot-small" />
        <strong>12,000+</strong>
        <small>vetted artisans</small>
      </div>
      <section className="login-card">
        <div className="login-accent" />
        <div className="login-visual">
          <img src="/images/wedding-hero.jpg" alt="A beautifully planned celebration" />
          <div className="login-visual-overlay">
            <span>Curated celebrations</span>
            <strong>Bring your next big moment to life.</strong>
          </div>
        </div>
        <div className="login-content">
          <div className="login-heading">
            <p>Welcome back</p>
            <h1>Sign in to Evenue</h1>
            <span>Access your business and citizen services.</span>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="login-email">
              Email ID
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label htmlFor="login-password">
              Password
              <div className="login-password-field">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  className="login-password-toggle"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            <div className="login-options">
              <label className="login-remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button className="login-forgot" type="button">Forgot password?</button>
            </div>

            <button className="login-submit" type="submit">Sign in</button>
            {message && <p className="login-message" role="status">{message}</p>}
          </form>

          <p className="login-signup-link">
            New to Evenue? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Login