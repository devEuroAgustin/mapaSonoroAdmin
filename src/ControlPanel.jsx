
import { Link } from 'react-router-dom';

function ControlPanel() {
  return (
    <div className="control-panel">
      <Link to="/modulo1">Módulo 1</Link>
      <Link to="/modulo2">Módulo 2</Link>
      <Link to="/usuarios">Usuarios</Link>
    </div>
  );
}

export default ControlPanel;