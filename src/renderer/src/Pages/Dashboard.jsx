import React, { useState } from 'react';
import '../Css/Dashboard.css';

const Dashboard = ({ onPageChange }) => { 
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Liste des catégories pour le filtre
  const categories = [
    { name: 'All', color: '#9333ea' },
    { name: 'Marketing', color: '#ec4899' },
    { name: 'Création de Contenu', color: '#8b5cf6' },
    { name: 'E-commerce', color: '#6366f1' },
    { name: 'Development', color: '#3b82f6' }
  ];

  // Données temporaires des prompts (plus tard tu les récupéreras depuis electron-store)
  const promptData = [
    { title: 'Marketing', count: 4, category: 'Marketing', icon: '📊' },
    { title: 'Contenu', count: 4, category: 'Création de Contenu', icon: '✍️' },
    { title: 'E-commerce', count: 4, category: 'E-commerce', icon: '🛍️' },
    { title: 'Dev', count: 4, category: 'Development', icon: '💻' }
  ];

  // Liste des prompts récents
  const recentPrompts = [
    { title: 'Pricing Strategy', category: 'Marketing', color: '#ec4899' },
    { title: 'Database Schema', category: 'Development', color: '#3b82f6' },
    { title: 'Influencer Outreach', category: 'Marketing', color: '#ec4899' },
    { title: 'Content Calendar', category: 'Création de Contenu', color: '#8b5cf6' }
  ];

  // Filtre les prompts selon la catégorie sélectionnée
  const filteredPrompts = selectedCategory === 'All' 
    ? promptData 
    : promptData.filter(p => p.category === selectedCategory);

  return (
    <div className="main-content">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="new-prompt-btn-top"
         onClick={() => onPageChange('form')}
         >
          + New Prompt
        </button>
      </header>

      {/* Section des catégories */}
      <section className="categories-section">
        <h2>YOUR CATEGORIES</h2>
        <div className="categories-filter">
          {categories.map(cat => (
            <button
              key={cat.name}
              className={`category-btn ${selectedCategory === cat.name ? 'active' : ''}`}
              style={{
                backgroundColor: selectedCategory === cat.name ? cat.color : 'transparent',
                borderColor: cat.color
              }}
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grille des cards circulaires */}
        <div className="prompts-grid-circular">
          {filteredPrompts.map((prompt, index) => (
            <div key={index} className="prompt-card-circular">
              <div className="circle-container">
                <div className="circle-content">
                  <span className="circle-icon">{prompt.icon}</span>
                  <h3 className="circle-title">{prompt.title}</h3>
                  <p className="circle-count">{prompt.count}</p>
                </div>
              </div>
              <p className="card-label">Prompts {prompt.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section des prompts récents */}
      <section className="recent-section">
        <h2>RECENT PROMPTS</h2>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="recent-list">
          {recentPrompts.map((prompt, index) => (
            <div key={index} className="recent-item">
              <div className="recent-dot" style={{ backgroundColor: prompt.color }}></div>
              <div className="recent-info">
                <h4>{prompt.title}</h4>
                <p>{prompt.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;