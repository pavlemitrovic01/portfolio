import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'

console.log('%ccl3menza.com // v1.0\n> scroll down. there is another layer.', 'color: #5db8ff; font-family: monospace; font-size: 13px;')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
