import '../Css/InfoPages.css';
 
const About = ({ onPageChange }) => {
  return (
    <div className="info-page">
      <header className="info-header">
        <div className="about-logo">
          <div className="logo-icon-large">P</div>
          <div>
            <h1>Prompt Wallet</h1>
            <p className="version">Version 1.0.0</p>
          </div>
        </div>
      </header>
 
      <div className="info-content">
        <section className="info-section">
          <h2>🚀 About This Project</h2>
          <p>
            Prompt Wallet is a desktop application designed to help developers and AI enthusiasts
            organize, manage, and reuse their AI prompts efficiently. Built with modern web
            technologies, it provides a seamless local-first experience.
          </p>
        </section>
 
        <section className="info-section">
          <h2>🛠️ Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-icon">⚛️</div>
              <div className="tech-info">
                <h3>React 18</h3>
                <p>Modern UI library for building the interface</p>
              </div>
            </div>
            <div className="tech-item">
              <div className="tech-icon">⚡</div>
              <div className="tech-info">
                <h3>Vite</h3>
                <p>Next-generation frontend tooling</p>
              </div>
            </div>
            <div className="tech-item">
              <div className="tech-icon">🖥️</div>
              <div className="tech-info">
                <h3>Electron</h3>
                <p>Cross-platform desktop application framework</p>
              </div>
            </div>
            <div className="tech-item">
              <div className="tech-icon">💾</div>
              <div className="tech-info">
                <h3>Electron Store</h3>
                <p>Local data persistence solution</p>
              </div>
            </div>
            <div className="tech-item">
              <div className="tech-icon">🧪</div>
              <div className="tech-info">
                <h3>Vitest</h3>
                <p>Unit testing framework</p>
              </div>
            </div>
            <div className="tech-item">
              <div className="tech-icon">🎨</div>
              <div className="tech-info">
                <h3>Custom CSS</h3>
                <p>Dark-themed modern design system</p>
              </div>
            </div>
          </div>
        </section>
 
        <section className="info-section">
          <h2>👨‍💻 Development Team</h2>
          <div className="team-info">
            <div className="team-card">
              <div className="team-icon">👤</div>
              <div className="team-details">
                <h3>Student Developer</h3>
                <p>CDA 2nd Year - L'École Multimédia</p>
                <p className="team-role">Full Stack Development</p>
              </div>
            </div>
            <div className="team-card">
              <div className="team-icon">🎓</div>
              <div className="team-details">
                <h3>Academic Project</h3>
                <p>Projet #3 - 2025</p>
                <p className="team-role">Desktop Application Development</p>
              </div>
            </div>
          </div>
        </section>
 
        <section className="info-section">
          <h2>📚 Development Context</h2>
          <div className="text-block">
            <p>
              This application was developed as part of the Concepteur Développeur d'Applications
              (CDA) program at L'École Multimédia in Paris. The project demonstrates competencies
              in desktop application development, user interface design, and software architecture.
            </p>
          </div>
         
          <div className="context-list">
            <div className="context-item">
              <span className="context-icon">🎯</span>
              <div>
                <h4>Project Objective</h4>
                <p>Create a production-ready desktop application using Electron and React</p>
              </div>
            </div>
            <div className="context-item">
              <span className="context-icon">📅</span>
              <div>
                <h4>Timeline</h4>
                <p>4 weeks of development, testing, and documentation</p>
              </div>
            </div>
            <div className="context-item">
              <span className="context-icon">✅</span>
              <div>
                <h4>Key Competencies</h4>
                <p>Environment setup, UI development, architecture design, testing</p>
              </div>
            </div>
          </div>
        </section>
 
        <section className="info-section">
          <h2>🌟 Key Features</h2>
          <ul className="features-list">
            <li>
              <span className="check-icon">✓</span>
              Create and manage unlimited prompts with dynamic variables
            </li>
            <li>
              <span className="check-icon">✓</span>
              Organize prompts by categories (Marketing, Development, Content, etc.)
            </li>
            <li>
              <span className="check-icon">✓</span>
              Search and filter prompts instantly
            </li>
            <li>
              <span className="check-icon">✓</span>
              Copy prompts to clipboard with one click
            </li>
            <li>
              <span className="check-icon">✓</span>
              Dark mode interface with modern design
            </li>
            <li>
              <span className="check-icon">✓</span>
              Keyboard shortcuts for productivity
            </li>
            <li>
              <span className="check-icon">✓</span>
              100% offline - no internet required
            </li>
            <li>
              <span className="check-icon">✓</span>
              Local storage - your data stays on your device
            </li>
          </ul>
        </section>
 
        <section className="info-section highlight-section">
          <h2>📬 Contact & Feedback</h2>
          <p>
            We value your feedback! If you encounter any issues, have suggestions for improvements,
            or would like to contribute to the project, please reach out through the following channels:
          </p>
          <div className="contact-buttons">
            <button className="contact-btn">
              📧 Email Support
            </button>
            <button className="contact-btn" onClick={() => onPageChange('dashboard')}>
              🏠 Back to Dashboard
            </button>
          </div>
        </section>
 
        <section className="info-section footer-section">
          <p className="copyright">
            © 2025 Prompt Wallet - L'École Multimédia
          </p>
          <p className="made-with">
            Made with ❤️ using React + Electron
          </p>
        </section>
      </div>
    </div>
  );
};
 
export default About;
 