import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import { ErrorBoundary } from 'react-error-boundary'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import theme from './theme'

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
  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider attribute="class" defaultTheme="system">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Layout>
            <Dashboard />
          </Layout>
        </ErrorBoundary>
      </ThemeProvider>
    </ChakraProvider>
  )
}