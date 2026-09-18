import './About.css';

function About() {
  return (
    <div className="about">
      <div className="container">
        <section className="about-hero">
          <h1>About FoodShare</h1>
          <p className="about-lead">
            FoodShare is a platform dedicated to reducing food waste by connecting
            surplus food from organizations to NGOs and volunteers who can distribute it.
          </p>
        </section>

        <section className="about-mission">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To create a bridge between food surplus and food scarcity, ensuring
                that no edible food goes to waste while people go hungry.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>
                A world where technology enables communities to share resources
                efficiently, reducing food waste and hunger simultaneously.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">💚</div>
              <h3>Our Values</h3>
              <p>
                Community, sustainability, transparency, and inclusivity guide
                everything we do at FoodShare.
              </p>
            </div>
          </div>
        </section>

        <section className="about-problem">
          <h2 className="section-title">The Problem We're Solving</h2>
          <div className="problem-content">
            <div className="problem-stat">
              <span className="big-number">1/3</span>
              <p>of all food produced globally is wasted — roughly <strong>1.3 billion tonnes</strong> per year.</p>
            </div>
            <div className="problem-stat">
              <span className="big-number">690M</span>
              <p>people around the world suffer from hunger and food insecurity.</p>
            </div>
            <div className="problem-stat">
              <span className="big-number">8%</span>
              <p>of global greenhouse gas emissions come from food waste in landfills.</p>
            </div>
          </div>
        </section>

        <section className="about-team">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">Built with ❤️ as a college mini project</p>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">👩💻</div>
              <h4>Student Developer</h4>
              <p>Full Stack Development</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">👨💻</div>
              <h4>Student Developer</h4>
              <p>Backend & Database</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">👩🎨</div>
              <h4>Student Developer</h4>
              <p>UI/UX Design</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
