import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx'
import RecoverPassword from './RecoverPassword.jsx'
import Dashboard from './Dashboard.jsx';
import ModuloUsuarios from './ModuloUsuarios.jsx';
import EditarUsuario from './EditarUsuario.jsx';
import MapaSonoro from './MapaSonoro.jsx';
import Multimedia from './Multimedia.jsx';
import './App.css'
import EditarMultimedia from './EditarMultimedia.jsx';
import AgregarMultimedia from './AgregarMultimedia.jsx';
import AgregarUsuario from './AgregarUsuarios.jsx';
import AgregarPunto from './AgregarPunto.jsx';
import EditarPunto from './EditarPunto.jsx';
import Vodudahue from './Vodudahue.jsx';

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
        <Route path="/create-multimedia" element={<AgregarMultimedia />} />
        <Route path="/create-usuario" element={<AgregarUsuario />} />
        <Route path="/agregar-punto" element={<AgregarPunto />} />
        <Route path="/editar-punto/:id" element={<EditarPunto />} />
        <Route path="/mapa-fundacion" element={<Vodudahue/>} />
        <Route path="*" element={<Navigate to="/mapa-fundacion" />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)