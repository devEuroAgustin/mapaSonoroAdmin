
import Header from './HeaderBackoffice';
import ControlPanel from './ControlPanel';
import { useNavigate } from 'react-router-dom';

function ModuloPuntos() {
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user ? user.username : '';
  const navigate = useNavigate();

  const puntos = [
    { nombreES: 'Quebrada ALta', nombreEN: 'Quebrada ALta', type: 'quebrada' },
    { nombreES: 'Rio Bajo', nombreEN: 'Rio Bajo', type: 'rio' },
    { nombreES: 'La Barra', nombreEN: 'La Barra', type: 'costa' },

  ];

  return (
    <div className="dashboard">
      <Header username={username} />
      <ControlPanel />
      <div className="main-content">
        <div className='mapa'>
        <div className="punto" style={{top: '335px', left: '200px'}} data-name="Rio Bajo"></div>
<div className="punto" style={{top: '150px', left: '390px'}} data-name="Quebrada ALta"></div>
<div className="punto" style={{top: '433px', left: '580px'}} data-name="La Barra"></div>
        </div>
      <button className='close-ses'>+ Agregar punto</button>
      <table className='table-users'>
          <thead>
            <tr className='table-titles' border="1">
              <th>Nombre ES</th>
              <th>Nombre EN</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {puntos.map((item, index) => (
               <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#FAF8F8' : '#FFFFFF' }}>
                <td>{item.nombreES}</td>
                <td>{item.nombreEN}</td>
                <td>{item.type}</td>
                <td>
                  <button className='table-btn' onClick={() => navigate('/editar-usuario')}>Editar</button>
                  <button className='table-btn'>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
      </div>
    </div>
  );
}

export default ModuloPuntos;