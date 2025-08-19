import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route} from 'react-router-dom';
import Peripherals from './peripherals';
import './index.css'
import Toners from './toners.jsx'
import Landing from './landing.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/peripherals" element={<Peripherals />} />
      <Route path="/toners" element={<Toners />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
