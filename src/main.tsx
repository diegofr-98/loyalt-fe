import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './providers/AuthProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { BusinessProvider } from './providers/BusinessProvider'
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BusinessProvider>
        <ThemeProvider defaultTheme="light">
          <App />
        </ThemeProvider>
      </BusinessProvider>
    </AuthProvider>
  </React.StrictMode>
)