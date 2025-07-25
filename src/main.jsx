import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ColorThemeProvider } from './ColorThemeContext';

createRoot(document.getElementById('root')).render(
  <div className="hide-scrollbar overflow-scroll h-screen">
    {/* your app content */}
    <StrictMode>
      <App />
    </StrictMode>,
  </div>
)
