import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import '../styles/Navbar.css'

export default function Navbar() {
  const { pathname } = useLocation()
  const { isDark, toggleTheme } = useTheme()

  const linkClass = (path) =>
    `nav-link ${pathname === path ? 'active' : ''}`

  return (
    <nav className="navbar">
      <div className="nav-container">
        <ul className="nav-list">
           <li>
            <Link to="/about" className={linkClass('/about')}>
              About
            </Link>
          </li>
          <li>
            <Link to="/" className={linkClass('/')}>
              Prediction
            </Link>
          </li>
          <li>
            <Link to="/mortgage" className={linkClass('/mortgage')}>
              Mortgage
            </Link>
          </li>
          <li>
            <Link to="/rental" className={linkClass('/rental')}>
              Rental Yield
            </Link>
          </li>
         
        </ul>
        <button onClick={toggleTheme} className="theme-toggle">
          {isDark ? '🌞' : '🌙'}
        </button>
      </div>
    </nav>
  )
}

