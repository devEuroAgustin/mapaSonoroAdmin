
import Header from './HeaderBackoffice';
import ControlPanel from './ControlPanel';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user ? user.username : '';

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