
import { NavLink } from 'react-router-dom';

function ControlPanel() {
  return (
    <div className="control-panel">
      <NavLink to="/mapa-sonoro" activeClassName="active-link">Mapa Sonoro</NavLink>
      <NavLink to="/multimedia" activeClassName="active-link">Multimedia</NavLink>
      <NavLink to="/usuarios" activeClassName="active-link">Usuarios</NavLink>
    </div>
  );
}

export default ControlPanel;