import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

type SignupRole = 'citizen' | 'vendor'

function Signup() {
  const [role, setRole] = useState<SignupRole>('citizen')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const  handleSubmit = (event: FormEvent<HTMLFormElement>) =>{
    
    event.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }
    
    setMessage(`Signup details submitted as a ${role}.`)
  }

  return (
    <main className="login-page signup-page">
      <section className="login-card signup-card">
        <div className="login-accent" />
        <div className="login-content">
          <div className="login-heading">
            <p>Get started</p>
            <h1>Create your Evenue account</h1>
            <span>Choose how you want to use Evenue and start planning today.</span>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="signup-role">
              I am signing up as
              <select
                id="signup-role"
                name="signup-role"
                value={role}
                onChange={(event) => setRole(event.target.value === 'vendor' ? 'vendor' : 'citizen')}
              >
                <option value="citizen">Citizen — Plan and discover events</option>
                <option value="vendor">Vendor — Offer event services</option>
              </select>
            </label>

            <label htmlFor="signup-name">
              Full name
              <input id="signup-name" type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your full name" autoComplete="name" required />
            </label>
            <label htmlFor="signup-email">
              Email ID
              <input id="signup-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required />
            </label>
            <label htmlFor="signup-password">
              Password
              <input id="signup-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Create a password" autoComplete="new-password" minLength={8} required />
            </label>
            <label htmlFor="signup-confirm-password">
              Confirm password
              <input id="signup-confirm-password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Re-enter your password" autoComplete="new-password" minLength={8} required />
            </label>

            <button className="login-submit" type="submit">Create account</button>
            {message && <p className="login-message" role="status">{message}</p>}
          </form>

          <p className="signup-login-link">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Signup