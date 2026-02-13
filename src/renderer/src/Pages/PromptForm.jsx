import { useState, useEffect } from 'react';
import '../Css/PromptForm.css';

const PromptForm = ({ selectedPrompt, onSave, onPageChange }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'Other'
  });
  const [detectedVariables, setDetectedVariables] = useState([]);
  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);

  // Categories matching Dashboard
  const categories = [
    'Marketing',
    'Development',
    'Content',
    'E-commerce',
    'Other'
  ];

  // Load existing prompt data if editing
  useEffect(() => {
    if (selectedPrompt) {
      setFormData({
        title: selectedPrompt.title || '',
        text: selectedPrompt.text || '',
        category: selectedPrompt.category || 'Other'
      });
      setCharCount(selectedPrompt.text?.length || 0);
    }
  }, [selectedPrompt]);

  // Extract dynamic variables from text
  useEffect(() => {
    if (formData.text) {
      const matches = formData.text.match(/\[([^\]]+)\]/g);
      if (matches) {
        const variables = matches.map(match => match.replace(/[\[\]]/g, ''));
        setDetectedVariables([...new Set(variables)]); // Remove duplicates
      } else {
        setDetectedVariables([]);
      }
    } else {
      setDetectedVariables([]);
    }
  }, [formData.text]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'text') {
      setCharCount(value.length);
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.text.trim()) {
      newErrors.text = 'Prompt text is required';
    }

    if (formData.text.length < 10) {
      newErrors.text = 'Prompt text must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const promptData = {
      ...formData,
      id: selectedPrompt?.id,
      updatedAt: new Date().toISOString(),
      createdAt: selectedPrompt?.createdAt || new Date().toISOString()
    };

    onSave(promptData);
  };

  // Handle cancel
  const handleCancel = () => {
    onPageChange('dashboard');
  };

  // Insert example variable
  const insertExample = () => {
    const exampleText = 'As a [role] expert, please help me with [task]. ';
    setFormData(prev => ({
      ...prev,
      text: prev.text + exampleText
    }));
    setCharCount(formData.text.length + exampleText.length);
  };

  return (
    <div className="form-container">
      <header className="form-header">
        <div>
          <h1>{selectedPrompt ? 'Edit Prompt' : 'New Prompt'}</h1>
          <p className="form-subtitle">
            Create or modify dynamic prompt definitions for optimal use
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="prompt-form">
        <div className="form-grid">
          {/* Left Column - Prompt Details */}
          <div className="form-column">
            <div className="form-section">
              <h2 className="section-title">Prompt Details</h2>

              {/* Title Input */}
              <div className="form-group">
                <label htmlFor="title">
                  Prompt Title
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Learning Assistant, Code Review Helper..."
                  className={`form-input ${errors.title ? 'error' : ''}`}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>

              {/* Category Select */}
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-select"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Prompt Text Textarea */}
              <div className="form-group">
                <label htmlFor="text">
                  Prompt Instructions
                  <span className="required">*</span>
                </label>
                <div className="textarea-wrapper">
                  <textarea
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    placeholder="Write your prompt here. Use [brackets] to define dynamic variables.&#10;&#10;Example: As a [role] expert in [field], please help me with [task]..."
                    className={`form-textarea ${errors.text ? 'error' : ''}`}
                    rows="12"
                  />
                  <div className="textarea-footer">
                    <span className="char-counter">
                      {charCount} characters
                    </span>
                    <button
                      type="button"
                      className="helper-btn"
                      onClick={insertExample}
                    >
                      💡 Insert Example
                    </button>
                  </div>
                </div>
                {errors.text && <span className="error-message">{errors.text}</span>}
                
                <div className="help-text">
                  <span className="help-icon">ℹ️</span>
                  Use square brackets <code>[variable_name]</code> to create dynamic fields that can be filled when using the prompt.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Preview & Variables */}
          <div className="form-column">
            <div className="form-section preview-section">
              <h2 className="section-title">Dynamic Variables Preview</h2>

              {detectedVariables.length > 0 ? (
                <div className="variables-detected">
                  <div className="variables-header">
                    <span className="variables-count">
                      {detectedVariables.length} variable{detectedVariables.length > 1 ? 's' : ''} detected
                    </span>
                  </div>
                  
                  <div className="variables-list">
                    {detectedVariables.map((variable, index) => (
                      <div key={index} className="variable-item">
                        <div className="variable-icon">🔤</div>
                        <div className="variable-info">
                          <span className="variable-name">{variable}</span>
                          <span className="variable-type">Text Input</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="preview-box">
                    <div className="preview-header">
                      <span>Preview</span>
                    </div>
                    <div className="preview-content">
                      {formData.text || 'Your prompt will appear here...'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-variables">
                  <div className="no-variables-icon">📝</div>
                  <p>No dynamic variables detected</p>
                  <span className="hint">
                    Add [variable] in your prompt text to create dynamic fields
                  </span>
                </div>
              )}

              {/* Usage Example */}
              <div className="usage-example">
                <h3>Usage Example</h3>
                <div className="example-box">
                  <code>
                    As a [role] student, I need help with [subject]. 
                    Can you explain [topic] with examples?
                  </code>
                </div>
                <p className="example-note">
                  This will create 3 input fields: role, subject, and topic
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-save"
          >
            <span>💾</span>
            {selectedPrompt ? 'Update Prompt' : 'Save Prompt'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptForm;