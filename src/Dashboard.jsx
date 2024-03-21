
import Header from './HeaderBackoffice';
import ControlPanel from './ControlPanel';

function Dashboard() {
  const username = 'Nombre de usuario'; // Reemplaza esto con el nombre de usuario real

  return (
    <div className="dashboard">
      <Header username={username} />
      <ControlPanel />
      <div className="main-content">
        {/* Aquí va el contenido principal */}
      </div>
    </div>
  );
}

export default Dashboard;