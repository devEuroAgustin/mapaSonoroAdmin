
import { Link } from 'react-router-dom';

function ControlPanel() {
  return (
    <div className="control-panel">
      <Link to="/mapa-sonoro">Mapa Sonoro</Link>
      <Link to="/multimedia">Multimedia</Link>
      <Link to="/usuarios">Usuarios</Link>
    </div>
  );
}

export default ControlPanel;