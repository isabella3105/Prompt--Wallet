import '../Css/Sidebar.css'

function Sidebar({ activePage, onPageChange, isDarkMode, toggleDarkMode }) {
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">P</div>
        <div className="logo-text">Prompt Wallet</div>
      </div>

      <nav className="nav-menu">
        <div 
          className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
          onClick={() => onPageChange('dashboard')}
        >
          <span className="nav-item-icon">📊</span>
          <span>Dashboard</span>
        </div>

        <div 
          className={`nav-item ${activePage === 'terms' ? 'active' : ''}`}
          onClick={() => onPageChange('terms')}
        >
          <span className="nav-item-icon">📜</span>
          <span>Terms of Use</span>
        </div>

        <div 
          className={`nav-item ${activePage === 'about' ? 'active' : ''}`}
          onClick={() => onPageChange('about')}
        >
          <span className="nav-item-icon">ℹ️</span>
          <span>About</span>
        </div>
      </nav>

      {/* Toggle Dark/Light Mode en bas à gauche */}
      <div className="theme-toggle" onClick={toggleDarkMode}>
        <span className="theme-icon">{isDarkMode ? '☀️' : '🌙'}</span>
        <span className="theme-text">{isDarkMode ? 'Light' : 'Dark'}</span>
      </div>
    </div>
  )
}

export default Sidebar;