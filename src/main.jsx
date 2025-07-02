import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1 style= {{textAlign: 'center', fontFamily: 'Futura, sans-serif', paddingTop: '50'}}>Purple Crow IT Toner Log</h1>
    <App />
  </StrictMode>,
)
