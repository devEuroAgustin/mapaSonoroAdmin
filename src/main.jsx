import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import RecoverPassword from './RecoverPassword.jsx'
import Dashboard from './Dashboard.jsx';
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)