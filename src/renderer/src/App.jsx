import { useState, useEffect } from 'react'
import './css/App.css'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './pages/Dashboard'
import PromptForm from './pages/PromptForm'
import UsePrompt from './pages/UsePrompt'
import Terms from './pages/Terms'
import About from './pages/About'
import { promptStore, settingsStore } from './utils/store'

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [prompts, setPrompts] = useState([])
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [loading, setLoading] = useState(true)

  // Charger les données au démarrage
  useEffect(() => {
    const loadData = async () => {
      try {
        const theme = await settingsStore.getTheme()
        setIsDarkMode(theme === 'dark')
        
        const loadedPrompts = await promptStore.getAll()
        setPrompts(loadedPrompts)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])


// Écouter les raccourcis clavier
useEffect(() => {
  if (window.api?.navigation) {
    window.api.navigation.onNavigate((page) => {
      handlePageChange(page)
    })
  }
}, [])


  const handlePageChange = (page, prompt = null) => {
    setActivePage(page)
    setSelectedPrompt(prompt || null)
  }

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    await settingsStore.setTheme(newMode ? 'dark' : 'light')
  }

  const handleSavePrompt = async (promptData) => {
    try {
      if (promptData.id) {
        await promptStore.update(promptData.id, promptData)
      } else {
        await promptStore.add(promptData)
      }
      
      const updatedPrompts = await promptStore.getAll()
      setPrompts(updatedPrompts)
      handlePageChange('dashboard')
    } catch (error) {
      console.error('Error saving prompt:', error)
    }
  }

  const handleDeletePrompt = async (id) => {
    try {
      await promptStore.delete(id)
      const updatedPrompts = await promptStore.getAll()
      setPrompts(updatedPrompts)
    } catch (error) {
      console.error('Error deleting prompt:', error)
    }
  }


// ========== DRAG & DROP ==========

// Gérer le drag over
const handleDragOver = (e) => {
  e.preventDefault()
  e.stopPropagation()
  e.dataTransfer.dropEffect = 'copy'
}

// Gérer le drag enter (effet visuel)
const handleDragEnter = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

// Gérer le drop
const handleDrop = async (e) => {
  e.preventDefault()
  e.stopPropagation()

  const files = e.dataTransfer.files
  
  if (files && files.length > 0) {
    const file = files[0]
    
    // Vérifier que c'est un fichier texte
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      try {
        const text = await file.text()
        
        // Créer un nouveau prompt avec le contenu du fichier
        const newPrompt = {
          title: file.name.replace('.txt', ''),
          text: text,
          category: 'Other'
        }
        
        await promptStore.add(newPrompt)
        const updatedPrompts = await promptStore.getAll()
        setPrompts(updatedPrompts)
        
        // Rediriger vers le dashboard
        handlePageChange('dashboard')
        
        // Notification (tu peux améliorer ça plus tard avec un toast)
        setTimeout(() => {
          alert(`✅ Prompt "${newPrompt.title}" created from file!`)
        }, 100)
      } catch (error) {
        console.error('Error reading file:', error)
        alert('❌ Error reading file. Please try again.')
      }
    } else {
      alert('⚠️ Please drop a .txt file only')
    }
  }
}

// ===================================



  if (loading) {
    return (
      <div className="app-container dark-mode">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          color: '#ffffff'
        }}>
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div 
    className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
    onDragOver={handleDragOver}
    onDragEnter={handleDragEnter}
    onDrop={handleDrop}
  >
      <Sidebar 
        activePage={activePage} 
        onPageChange={handlePageChange}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <div className="main-content">
        <TopBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        {activePage === 'dashboard' && (
          <Dashboard 
            onPageChange={handlePageChange}
            prompts={prompts}
            onDeletePrompt={handleDeletePrompt}
          />
        )}
        {activePage === 'form' && (
          <PromptForm 
            selectedPrompt={selectedPrompt}
            onSave={handleSavePrompt}
            onPageChange={handlePageChange}
          />
        )}
        {activePage === 'use' && (
          <UsePrompt 
            selectedPrompt={selectedPrompt}
            onPageChange={handlePageChange}
          />
        )}
        {activePage === 'terms' && <Terms />}
        {activePage === 'about' && <About onPageChange={handlePageChange} />}
      </div>
    </div>
  )
}

export default App;