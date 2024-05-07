import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import RecoverPassword from './RecoverPassword.jsx'
import Dashboard from './Dashboard.jsx';
import ModuloUsuarios from './ModuloUsuarios.jsx';
import EditarUsuario from './EditarUsuario.jsx';
import MapaSonoro from './MapaSonoro.jsx';
import Multimedia from './Multimedia.jsx';
import './App.css'
import EditarMultimedia from './EditarMultimedia.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuarios" element={<ModuloUsuarios />} />
        <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
        <Route path="/mapa-sonoro" element={<MapaSonoro />} />
        <Route path="/multimedia" element={<Multimedia />} />
        <Route path="/editar-multimedia/:id" element={<EditarMultimedia />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)