import '../Css/InfoPages.css';
 
const Terms = () => {
  return (
    <div className="info-page">
      <header className="info-header">
        <h1>Terms of Use</h1>
        <p className="info-subtitle">Last updated: February 2025</p>
      </header>
 
      <div className="info-content">
        <section className="info-section">
          <h2>📋 Overview</h2>
          <p>
            Welcome to Prompt Wallet. By using this application, you agree to these terms of use.
            Please read them carefully before using the software.
          </p>
        </section>
 
        <section className="info-section">
          <h2>✨ Application Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">💾</span>
              <div>
                <h3>Local Storage</h3>
                <p>All your prompts are stored locally on your device using Electron Store</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <div>
                <h3>Privacy First</h3>
                <p>No data is sent to external servers. Everything stays on your machine</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <div>
                <h3>Offline Access</h3>
                <p>Works completely offline. No internet connection required</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <div>
                <h3>Customization</h3>
                <p>Organize prompts with categories and dynamic variables</p>
              </div>
            </div>
          </div>
        </section>
 
        <section className="info-section">
          <h2>🔐 Data & Privacy</h2>
          <div className="text-block">
            <h3>Data Storage</h3>
            <p>
              Prompt Wallet stores all data locally on your computer using electron-store.
              Your prompts, settings, and preferences are saved in a local database file
              on your system.
            </p>
          </div>
         
          <div className="text-block">
            <h3>Data Collection</h3>
            <p>
              We do NOT collect, transmit, or store any of your data on external servers.
              All information remains exclusively on your device. This application does not
              require internet access and does not communicate with any external services.
            </p>
          </div>
 
          <div className="text-block">
            <h3>Your Rights</h3>
            <p>
              You have full control over your data. You can export, delete, or modify your
              prompts at any time. All data is stored in a human-readable format and can be
              accessed through the application or directly from your file system.
            </p>
          </div>
        </section>
 
        <section className="info-section">
          <h2>⚖️ Legal Framework</h2>
          <div className="text-block">
            <h3>License</h3>
            <p>
              Prompt Wallet is provided as-is for personal and educational use. This software
              was developed as part of an academic project at L'École Multimédia.
            </p>
          </div>
 
          <div className="text-block">
            <h3>Disclaimer</h3>
            <p>
              This application is provided "as is" without warranty of any kind. The developers
              are not liable for any damages or data loss that may occur from using this software.
            </p>
          </div>
 
          <div className="text-block">
            <h3>Third-Party Content</h3>
            <p>
              Users are responsible for the content of their prompts. Any use of prompts with
              AI services (ChatGPT, Claude, etc.) is subject to those services' own terms of use.
            </p>
          </div>
        </section>
 
        <section className="info-section">
          <h2>🔄 Updates & Support</h2>
          <p>
            This application may receive updates to fix bugs or add new features. Users will
            be notified of significant updates through the application interface.
          </p>
          <p>
            For support, bug reports, or feature requests, please contact the development team
            through the channels provided in the About section.
          </p>
        </section>
 
        <section className="info-section highlight-section">
          <h2>📝 Acceptance</h2>
          <p>
            By using Prompt Wallet, you acknowledge that you have read, understood, and agree
            to be bound by these Terms of Use. If you do not agree to these terms, please
            discontinue use of the application.
          </p>
        </section>
      </div>
    </div>
  );
};
 
export default Terms;
 