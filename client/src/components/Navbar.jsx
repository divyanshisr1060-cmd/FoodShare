import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path) => (location.pathname === path ? 'nav-link active' : 'nav-link');

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🍽️</span>
          <span className="logo-text">FoodShare</span>
        </Link>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={isActive('/')} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link
            to="/available-food"
            className={isActive('/available-food')}
            onClick={() => setMenuOpen(false)}
          >
            Available Food
          </Link>
          <Link
            to="/dashboard"
            className={isActive('/dashboard')}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link to="/about" className={isActive('/about')} onClick={() => setMenuOpen(false)}>
            About
          </Link>

          <div className="nav-auth">
            {isAuthenticated ? (
              <div className="nav-user-info">
                <div className="user-profile-tag">
                  <span className="user-role-badge">{user?.role}</span>
                  <span className="user-display-name">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-sm logout-btn"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline btn-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
