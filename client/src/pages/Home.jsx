import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Share Food,<br />
            <span className="highlight">Spread Hope</span>
          </h1>
          <p className="hero-subtitle">
            FoodShare connects organizations with surplus edible food
            to NGOs and volunteers who can collect and distribute it
            to communities in need.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/available-food" className="btn btn-outline">Browse Food</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-emoji">🤝</div>
          <div className="hero-circle"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Meals Shared</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Active Donors</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">30+</span>
              <span className="stat-label">NGO Partners</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Volunteers</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Three simple steps to reduce food waste</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">📝</div>
              <div className="step-number">1</div>
              <h3>List Surplus Food</h3>
              <p>Restaurants, caterers, and organizations list their surplus food with pickup details.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">🔍</div>
              <div className="step-number">2</div>
              <h3>Browse & Claim</h3>
              <p>NGOs and volunteers browse available listings and claim the food they can distribute.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">🚗</div>
              <div className="step-number">3</div>
              <h3>Collect & Distribute</h3>
              <p>Volunteers pick up the food and deliver it to communities in need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="roles">
        <div className="container">
          <h2 className="section-title">Who Can Join?</h2>
          <p className="section-subtitle">Everyone has a role to play in fighting food waste</p>
          <div className="roles-grid">
            <div className="role-card">
              <div className="role-icon">🏢</div>
              <h3>Donors</h3>
              <p>Restaurants, hotels, caterers, and any organization with surplus food can list it for pickup.</p>
              <Link to="/register" className="btn btn-primary">Register as Donor</Link>
            </div>
            <div className="role-card">
              <div className="role-icon">🏛️</div>
              <h3>NGOs</h3>
              <p>Non-profit organizations can browse and claim food to distribute through their networks.</p>
              <Link to="/register" className="btn btn-primary">Register as NGO</Link>
            </div>
            <div className="role-card">
              <div className="role-icon">🙋</div>
              <h3>Volunteers</h3>
              <p>Individuals who want to help by picking up and delivering food to those in need.</p>
              <Link to="/register" className="btn btn-primary">Register as Volunteer</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to make a difference?</h2>
            <p>Join FoodShare today and help reduce food waste in your community.</p>
            <Link to="/register" className="btn btn-secondary">Join Now — It's Free</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
