
import Header from './HeaderBackoffice';
import ControlPanel from './ControlPanel';
import { useNavigate } from 'react-router-dom';

function ModuloUsuarios() {
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user ? user.username : '';
  const navigate = useNavigate();
  // Datos de ejemplo
  const users = [
    { username: 'Pedro Aste', email: 'pedroaste@gmail.com', profile: 'Admin' },
    { username: 'Agustin Del Percio', email: 'agusdelpercio@gmail.com', profile: 'Admin' },
    { username: 'Agustin Del Percio', email: 'agusdelpercio@gmail.com', profile: 'Admin' },
    // Agrega más usuarios aquí...
  ];

  return (
    <div className="dashboard">
      <Header username={username} />
      <ControlPanel />
      <div className="main-content">
      <table className='table-users'>
          <thead>
            <tr className='table-titles' border="1">
              <th>Nombre</th>
              <th>Correo</th>
              <th>Perfil</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
               <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#FAF8F8' : '#FFFFFF' }}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.profile}</td>
                <td>
                  <button className='pass-table-btn'>Reestablecer contraseña</button>
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

export default ModuloUsuarios;