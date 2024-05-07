import { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Header from './HeaderBackoffice';
import ControlPanel from './ControlPanel';

function EditarUsuarios() {
  const user = JSON.parse(localStorage.getItem('user'));
  const username1 = user ? user.username : '';
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('');
  const { id } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'profile':
        setProfile(value);
        break;
      default:
        break;
    }
  };
  
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      username: username,
      email: email,
      profile: profile
    };

    fetch(`https://mapaapi.onrender.com/api/clients/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigate('/usuarios');
    })
    .catch(error => console.error('Error:', error));
  };

  return (
<div className="dashboard">
  <Header username={username1} />
  <ControlPanel />
  <div className="main-content">
    <button className='save-btn' type="submit" form="editForm">Guardar</button>
    <hr />
    <form id="editForm" onSubmit={handleSubmit}className='edit-form'>
      <div className="input-field">
        <label className="input-titles-edit-usuario">Usuario:</label>
        <input type="text" name="username" value={username} onChange={handleChange} className="edit-user-input" />
      </div>
      <div className="input-field">
        <label className="input-titles-edit-usuario">Email:</label>
        <input type="text" name="email" value={email} onChange={handleChange} className="edit-user-input" />
      </div>
      <div className="input-field">
        <label className="input-titles-edit-usuario">Perfil:</label>
        <select name="profile" value={profile} onChange={handleChange} className="user-select">
          <option value=""></option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
    </form>
  </div>
</div>
  );
}

export default EditarUsuarios;