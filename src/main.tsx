import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App'

console.log('%ccl3menza.com // v1.0\n> curious? try clicking my name.', 'color: #5db8ff; font-family: monospace; font-size: 13px;')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
