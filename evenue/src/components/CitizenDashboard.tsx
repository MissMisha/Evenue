import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function CitizenDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <main className={`citizen-dashboard${sidebarOpen ? '' : ' sidebar-collapsed'}`}>
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-header">
          {sidebarOpen && <span className="dashboard-sidebar-title">Citizen portal</span>}
          <button
            className="dashboard-toggle"
            type="button"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? '‹' : '›'}
          </button>
        </div>

        <nav className="dashboard-navigation" aria-label="Dashboard navigation">
          <NavLink
            className={({ isActive }) => `dashboard-nav-item${isActive ? ' is-active' : ''}`}
            to="search"
          >
            <span className="dashboard-nav-icon">⌕</span>
            {sidebarOpen && <span>Search service providers</span>}
          </NavLink>
          <NavLink
            className={({ isActive }) => `dashboard-nav-item${isActive ? ' is-active' : ''}`}
            to="favourites"
          >
            <span className="dashboard-nav-icon">♡</span>
            {sidebarOpen && <span>My favourites</span>}
          </NavLink>
          {/* <NavLink
            className={({ isActive }) => `dashboard-nav-item${isActive ? ' is-active' : ''}`}
            to="profile"
          >
            <span className="dashboard-nav-icon">✅</span>
            {sidebarOpen && <span>Complete your profile</span>}
          </NavLink> */}
          <NavLink
            className={({ isActive }) => `dashboard-nav-item${isActive ? ' is-active' : ''}`}
            to="profile-details"
          >
            <span className="dashboard-nav-icon">◉</span>
            {sidebarOpen && <span>View saved profile</span>}
          </NavLink>
        </nav>
      </aside>

      <section className="dashboard-main">
        <Outlet />
      </section>
    </main>
  )
}

export default CitizenDashboard