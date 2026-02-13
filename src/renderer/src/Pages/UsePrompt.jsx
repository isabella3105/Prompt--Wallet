import { useState, useEffect } from 'react';
import '../Css/UsePrompt.css';

const UsePrompt = ({ selectedPrompt, onPageChange }) => {
  const [variables, setVariables] = useState([]);
  const [values, setValues] = useState({});
  const [finalPrompt, setFinalPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  // Détecter les variables au chargement
  useEffect(() => {
    if (selectedPrompt?.text) {
      const matches = selectedPrompt.text.match(/\[([^\]]+)\]/g);
      if (matches) {
        const vars = matches.map(match => match.replace(/[\[\]]/g, ''));
        const uniqueVars = [...new Set(vars)]; // Enlever les doublons
        setVariables(uniqueVars);
        
        // Initialiser les valeurs vides
        const initialValues = {};
        uniqueVars.forEach(v => {
          initialValues[v] = '';
        });
        setValues(initialValues);
      }
      setFinalPrompt(selectedPrompt.text);
    }
  }, [selectedPrompt]);

  // Mettre à jour le prompt final quand les valeurs changent
  useEffect(() => {
    if (selectedPrompt?.text) {
      let updated = selectedPrompt.text;
      
      // Remplacer chaque variable par sa valeur
      Object.keys(values).forEach(variable => {
        const regex = new RegExp(`\\[${variable}\\]`, 'g');
        updated = updated.replace(regex, values[variable] || `[${variable}]`);
      });
      
      setFinalPrompt(updated);
    }
  }, [values, selectedPrompt]);

  // Gérer le changement de valeur
  const handleValueChange = (variable, value) => {
    setValues(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  // Copier dans le presse-papier
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset après 2 secondes
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy to clipboard');
    }
  };

  // Réinitialiser les champs
  const handleReset = () => {
    const resetValues = {};
    variables.forEach(v => {
      resetValues[v] = '';
    });
    setValues(resetValues);
  };

  if (!selectedPrompt) {
    return (
      <div className="use-prompt-container">
        <div className="no-prompt-selected">
          <span className="icon">⚠️</span>
          <p>No prompt selected</p>
          <button 
            className="btn-back"
            onClick={() => onPageChange('dashboard')}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="use-prompt-container">
      <header className="use-prompt-header">
        <div>
          <button 
            className="btn-back-small"
            onClick={() => onPageChange('dashboard')}
          >
            ← Back
          </button>
          <h1>{selectedPrompt.title}</h1>
          <span className="category-badge" style={{
            backgroundColor: getCategoryColor(selectedPrompt.category)
          }}>
            {selectedPrompt.category}
          </span>
        </div>
      </header>

      <div className="use-prompt-content">
        {/* Colonne gauche : Variables à remplir */}
        <div className="variables-column">
          <div className="section-card">
            <h2>Fill Variables</h2>
            {variables.length > 0 ? (
              <>
                <div className="variables-form">
                  {variables.map((variable, index) => (
                    <div key={index} className="form-group">
                      <label htmlFor={variable}>
                        <span className="variable-icon">🔤</span>
                        {variable}
                      </label>
                      <input
                        type="text"
                        id={variable}
                        value={values[variable] || ''}
                        onChange={(e) => handleValueChange(variable, e.target.value)}
                        placeholder={`Enter ${variable}...`}
                        className="variable-input"
                      />
                    </div>
                  ))}
                </div>
                <button 
                  className="btn-reset"
                  onClick={handleReset}
                >
                  🔄 Reset All
                </button>
              </>
            ) : (
              <div className="no-variables-info">
                <span className="info-icon">ℹ️</span>
                <p>This prompt has no dynamic variables</p>
              </div>
            )}
          </div>
        </div>

        {/* Colonne droite : Aperçu et copie */}
        <div className="preview-column">
          <div className="section-card">
            <div className="preview-header">
              <h2>Prompt Preview</h2>
              <button 
                className={`btn-copy ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
              >
                {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
              </button>
            </div>

            <div className="prompt-preview-box">
              <pre className="prompt-text">{finalPrompt}</pre>
            </div>

            <div className="preview-info">
              <div className="info-item">
                <span className="info-label">Characters:</span>
                <span className="info-value">{finalPrompt.length}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Variables:</span>
                <span className="info-value">{variables.length}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Last updated:</span>
                <span className="info-value">
                  {new Date(selectedPrompt.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="instructions-card">
            <h3>💡 How to use</h3>
            <ol>
              <li>Fill in the variable fields on the left</li>
              <li>Watch the preview update in real-time</li>
              <li>Click "Copy to Clipboard" when ready</li>
              <li>Paste into your AI tool (ChatGPT, Claude, etc.)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function pour les couleurs de catégorie
function getCategoryColor(category) {
  const colors = {
    'Marketing': '#ec4899',
    'Development': '#3b82f6',
    'Content': '#8b5cf6',
    'E-commerce': '#6366f1',
    'Other': '#a855f7'
  };
  return colors[category] || '#666';
}

export default UsePrompt;