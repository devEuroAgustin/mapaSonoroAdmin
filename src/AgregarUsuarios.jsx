import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './HeaderBackoffice';
import ControlPanel from './ControlPanel';

function AgregarUsuario() {
  const user = JSON.parse(localStorage.getItem('user'));
  const username1 = user ? user.username : '';
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'nombre':
        setNombre(value);
        break;
      case 'apellido':
        setApellido(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    const userData = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      username: username,
      password: password
    };

    fetch(`https://mapaapi.onrender.com/api/clients/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setIsSubmitting(false);
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
        <form id="editForm" onSubmit={handleSubmit} disabled={isSubmitting} className='edit-form'>
          <div className="input-row">
            <div className="input-field">
              <label className="input-titles-edit-usuario">Nombre:</label>
              <input type="text" name="nombre" value={nombre} onChange={handleChange} className="edit-user-input" />
            </div>
            <div className="input-field">
              <label className="input-titles-edit-usuario">Apellido:</label>
              <input type="text" name="apellido" value={apellido} onChange={handleChange} className="edit-user-input" />
            </div>
            <div className="input-field">
              <label className="input-titles-edit-usuario">Email:</label>
              <input type="email" name="email" value={email} onChange={handleChange} className="edit-user-input" />
            </div>
          </div>
          <div className="input-row">
            <div className="input-field">
              <label className="input-titles-edit-usuario">Username:</label>
              <input type="text" name="username" value={username} onChange={handleChange} className="edit-user-input" />
            </div>
            <div className="input-field">
              <label className="input-titles-edit-usuario">Password:</label>
              <input type="password" name="password" value={password} onChange={handleChange} className="edit-user-input" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgregarUsuario;