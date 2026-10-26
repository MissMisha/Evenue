import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-navbar">
      <div className="navbar-content">
        <a className="navbar-brand" href="/" aria-label="Evenue home">
          <span className="brand-mark">e</span>
          <span>evenue</span>
        </a>

        <button
          className="navbar-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar-links${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#businesses" onClick={() => setMenuOpen(false)}>Businesses</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About us</a>
          <a className="navbar-action" href="#register" onClick={() => setMenuOpen(false)}>
           <Link to="/vendor-form"> Register your business</Link>
          </a>
           <a className="navbar-action" href="#register" onClick={() => setMenuOpen(false)}>
           <Link to="/citizen-form"> Register citizen</Link>
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar