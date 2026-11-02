import { useState, type FormEvent } from 'react'

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
    <main className="login-page">
      <section className="login-card">
        <div className="login-accent" />
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
        </div>
      </section>
    </main>
  )
}

export default Login