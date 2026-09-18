import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">
            <span>🍽️</span> FoodShare
          </h3>
          <p className="footer-desc">
            Connecting surplus food with those who need it most.
            Reducing waste, feeding communities.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/available-food">Available Food</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Get Involved</h4>
          <ul>
            <li><Link to="/register">Register as Donor</Link></li>
            <li><Link to="/register">Register as NGO</Link></li>
            <li><Link to="/register">Register as Volunteer</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>📧 contact@foodshare.org</li>
            <li>📞 +91 98765 43210</li>
            <li>📍 Mumbai, India</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 FoodShare. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
