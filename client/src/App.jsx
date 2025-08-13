// src/App.jsx
import { useState } from 'react';
import './index.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to summarize.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummaryText('');

    try {
      // The API call is now a relative path, so it works on Vercel
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong with the API call.');
      }

      const data = await response.json();
      setSummaryText(data.summary);

    } catch (err) {
      console.error(err);
      setError('Failed to fetch summary. Please check your network and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="summarizer-card">
        <h1 className="main-title">AI Text Summarizer 🧠</h1>
        <p className="subtitle">Enter a long text below and let the AI summarize it for you.</p>
        
        <textarea
          className="input-textarea"
          placeholder="Paste your text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        
        <button
          onClick={handleSummarize}
          disabled={isLoading}
          className={`summarize-button ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? 'Summarizing...' : 'Summarize Text'}
        </button>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {summaryText && (
          <div className="summary-result">
            <h2 className="summary-title">Summary:</h2>
            <p className="summary-text">{summaryText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
