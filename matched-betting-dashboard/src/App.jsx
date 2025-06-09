import React, { useState, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SimpleLayout from './components/SimpleLayout'
import SimpleDashboard from './components/SimpleDashboard'

function ErrorFallback({ error }) {
  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid red', 
      borderRadius: '5px',
      margin: '20px',
      backgroundColor: '#fff5f5' 
    }}>
      <h2>Something went wrong:</h2>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button 
        onClick={() => window.location.reload()}
        style={{
          padding: '8px 16px',
          backgroundColor: '#000',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Try again
      </button>
    </div>
  );
}

export default function App() {
  // Theme handling
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Update the class on the html element when theme changes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }

    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SimpleLayout theme={theme} toggleTheme={toggleTheme}>
        <SimpleDashboard theme={theme} />
      </SimpleLayout>
        </ErrorBoundary>
  )
}