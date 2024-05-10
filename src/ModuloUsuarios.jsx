
import Header from './HeaderBackoffice';
import ControlPanel from './ControlPanel';
import { useNavigate } from 'react-router-dom';
import Loader from './utils/Loader';
import { useState, useEffect } from 'react';

function ModuloUsuarios() {
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user ? user.username : '';
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  const navigate = useNavigate();
  // Datos de ejemplo
  function fetchUsers() {
    fetch('https://mapaapi.onrender.com/api/clients/')
      .then(response => response.json())
      
      .then(data => {setUsers(data)
    
        setIsLoading(false);
 

      })
      .catch(error => console.error('Error:', error));
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenModal = (userId) => {
    setUserId(userId);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function deleteUser(id) {
    fetch(`https://mapaapi.onrender.com/api/clients/delete/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      console.log(id);
      console.log(users);
      return response.json();
    })
    .then(data => {
      // Actualiza la lista de usuarios después de eliminar un usuario
      setUsers(users.filter(user => user.id !== id));
      setIsLoading(false);
    })
    .catch(error => console.error('Error:', error));
    setIsLoading(false);
  }

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };


  const handleResetPassword = (event) => {
    event.preventDefault();
  
    fetch(`https://mapaapi.onrender.com/api/clients/update/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: newPassword })
    })
    .then(response => {
      console.log('Respuesta de la API (sin convertir):', response);
      return response.json();
    })
    .then(data => {
      console.log('Respuesta de la API (convertida a JSON):', data);
      setIsModalOpen(false);  // Mueve esta línea aquí
    })
    .catch(error => console.error('Error:', error));
  };
  return (
    <div className="dashboard">
      <Header username={username} />
      <ControlPanel />
  
      <div className="main-content">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <button className='close-ses'onClick={() => navigate("/create-usuario")}>+ Agregar Usuarios</button>
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
                    <td>{user.profile || "admin"}</td>
                    <td>
                      <button className='pass-table-btn' onClick={() => handleOpenModal(user.id)}>Reestablecer contraseña</button>
                      <button className='table-btn' onClick={() => navigate(`/editar-usuario/${user.id}`)}>Editar</button>
                      <button className='table-btn' onClick={() => deleteUser(user.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> 
            {isModalOpen && (
              <div className="modal">
                <form onSubmit={handleResetPassword} className='modal-form'>
                  <label className="input-titles-modal">Nueva contraseña:</label>
                  <input type="password" name="newPassword" value={newPassword} onChange={handleNewPasswordChange} className="user-input" />
                  <input type="submit" value="Confirmar" className="submit-btn-modal" />
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ModuloUsuarios;