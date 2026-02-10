import { useState } from 'react'
import './Css/App.css'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './Pages/Dashboard'
import PromptForm from './Pages/PromptForm'
import UsePrompt from './Pages/UsePrompt'
import Terms from './Pages/Terms'
import About from './Pages/About'



function App() {
  // État pour gérer la page active
  const [activePage, setActivePage] = useState('dashboard')
  
  // État pour le dark mode (true = dark par défaut)
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Fonction pour changer de page
  const handlePageChange = (page) => {
    setActivePage(page)
  }

  // Fonction pour toggle le dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Sidebar 
        activePage={activePage} 
        onPageChange={handlePageChange}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <div className="main-content">
        <TopBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        {/* Affichage conditionnel des pages */}
        {activePage === 'dashboard' && <Dashboard onPageChange={handlePageChange} />}
        {activePage === 'form' && <PromptForm onPageChange={handlePageChange} />}
        {activePage === 'use' && <UsePrompt />}
        {activePage === 'terms' && <Terms />}
        {activePage === 'about' && <About onPageChange={handlePageChange} />}
        
      </div>
    </div>
  )
}

export default App;
