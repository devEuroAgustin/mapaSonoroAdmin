
import { Link } from 'react-router-dom';

function Dashboard() {
  const username = 'Nombre de usuario'; // Reemplaza esto con el nombre de usuario real

  return (
    <div className="dashboard">
      <div className='login-header'>
        <img src="src\assets/Austral_LAB.png" alt="Austral Lab" className='logo-austral'/>
        <div className='login-titles'>
          <h1 className="login-title">CMS Mapa Sonoro</h1>
          <h2 className="login-subtitle">Fundacion Alerce 3000</h2>
        </div>
        <div className="user-info">
          <span className='username'>{username}</span>
          <button className='close-ses'>Cerrar Sesión</button>
        </div>
      </div>
      <div className="control-panel">
        <Link to="/modulo1">Módulo 1</Link>
        <Link to="/modulo2">Módulo 2</Link>
        <Link to="/modulo3">Módulo 3</Link>
      </div>
      <div className="main-content">
        {/* Aquí va el contenido principal */}
      </div>
    </div>
  );
}

export default Dashboard;