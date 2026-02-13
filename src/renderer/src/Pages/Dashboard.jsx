import React, { useState } from 'react';
import '../Css/Dashboard.css';

const Dashboard = ({ onPageChange, prompts, onDeletePrompt }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Catégories avec icônes
  const categories = [
    { name: 'All', color: '#9333ea', icon: '📊' },
    { name: 'Marketing', color: '#ec4899', icon: '📊' },
    { name: 'Development', color: '#3b82f6', icon: '💻' },
    { name: 'Content', color: '#8b5cf6', icon: '✍️' },
    { name: 'E-commerce', color: '#6366f1', icon: '🛍️' },
    { name: 'Other', color: '#a855f7', icon: '📝' }
  ];

  // Compter les prompts par catégorie
  const getCategoryCount = (categoryName) => {
    if (categoryName === 'All') return prompts.length;
    return prompts.filter(p => p.category === categoryName).length;
  };

  // Filtrer d'abord par catégorie
  const filteredByCategory = selectedCategory === 'All' 
    ? prompts 
    : prompts.filter(p => p.category === selectedCategory);

  // Ensuite filtrer par recherche
  const filteredPrompts = searchQuery
    ? filteredByCategory.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredByCategory;

  // Gérer la suppression avec confirmation
  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      onDeletePrompt(id);
    }
  };

  return (
    <div className="main-content">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button 
          className="new-prompt-btn-top"
          onClick={() => onPageChange('form')}
        >
          + New Prompt
        </button>
      </header>

      {/* Barre de recherche en haut */}
      <section className="search-section">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search prompts by title or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="clear-search"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>
      </section>

      {/* Section des catégories */}
      <section className="categories-section">
        <h2>YOUR CATEGORIES</h2>
        
        {/* Filtres de catégories */}
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

        {/* Cercles avec stats par catégorie */}
        <div className="prompts-grid-circular">
          {categories
            .filter(cat => cat.name !== 'All') // Ne pas afficher "All" dans les cercles
            .map((cat) => {
              const count = getCategoryCount(cat.name);
              return (
                <div 
                  key={cat.name} 
                  className="prompt-card-circular"
                  onClick={() => setSelectedCategory(cat.name)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="circle-container">
                    <div 
                      className="circle-content"
                      style={{
                        borderColor: selectedCategory === cat.name ? cat.color : '#3a3a3a'
                      }}
                    >
                      <span className="circle-icon">{cat.icon}</span>
                      <h3 className="circle-title">{cat.name}</h3>
                      <p className="circle-count" style={{ color: cat.color }}>
                        {count}
                      </p>
                    </div>
                  </div>
                  <p className="card-label">{count} Prompt{count !== 1 ? 's' : ''}</p>
                </div>
              );
            })}
        </div>
      </section>

      {/* Section des prompts (cards rectangulaires) */}
      <section className="prompts-list-section">
        <div className="section-header">
          <h2>
            {selectedCategory === 'All' ? 'ALL PROMPTS' : `${selectedCategory.toUpperCase()} PROMPTS`}
          </h2>
          <span className="prompts-count">
            {filteredPrompts.length} result{filteredPrompts.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="prompts-grid-cards">
          {filteredPrompts.length > 0 ? (
            filteredPrompts.map((prompt) => (
              <div key={prompt.id} className="prompt-card-rect">
                <div 
                  className="prompt-card-header"
                  onClick={() => onPageChange('use', prompt)}
                  style={{ cursor: 'pointer' }}
                >
                  <h3>{prompt.title}</h3>
                  <span 
                    className="prompt-category-badge"
                    style={{
                      backgroundColor: categories.find(c => c.name === prompt.category)?.color || '#666'
                    }}
                  >
                    {prompt.category}
                  </span>
                </div>
                
                <p className="prompt-preview">
                  {prompt.text.substring(0, 120)}
                  {prompt.text.length > 120 ? '...' : ''}
                </p>

                <div className="prompt-card-footer">
                  <span className="prompt-date">
                    Updated {new Date(prompt.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="prompt-card-actions">
                    <button 
                      className="btn-edit"
                      onClick={() => onPageChange('form', prompt)}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(prompt.id, prompt.title)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-prompts">
              <div className="no-prompts-icon">🔍</div>
              <p>
                {searchQuery 
                  ? `No prompts found for "${searchQuery}"`
                  : selectedCategory === 'All'
                  ? 'No prompts yet'
                  : `No prompts in ${selectedCategory}`
                }
              </p>
              <button 
                className="btn-create-first"
                onClick={() => onPageChange('form')}
              >
                + Create your first prompt
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;