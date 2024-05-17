import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoAustral from './assets/Austral_LAB.png';

function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true); 
    setErrorMessage(''); // Limpiar el mensaje de error
    const userData = {
      username: username,
      password: password
    };
  
    // Hacer una solicitud POST al endpoint de inicio de sesión
    fetch('https://mapaapi.onrender.com/api/clients/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
      setIsSubmitting(false);
      if (data.message) {
        handleServerResponse(data.message); 
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/dashboard');
      }
    })
    .catch(error => {
      setIsSubmitting(false);
      console.error('Error:', error);
    });
  };
  function handleServerResponse(response) {
    setErrorMessage(response);
}
  return (
    <div className="container">
<div className="login-container">
      <div className='login-header'>
      <img src={logoAustral} alt="Austral Lab" className='logo-austral'/>
        <div className='login-titles'>
          <h1 className="login-title">CMS Mapa Sonoro</h1>
          <h2 className="login-subtitle">Fundacion Alerce 3000</h2>
        </div>
      </div>
    <p className="login-instructions">indique su nombre de usuario y contraseña para entrar al sistema:</p>
  <form onSubmit={handleSubmit}>
  <div className="input-field">
  <label className="input-titles">Usuario:</label>
  <input type="text" name="username" value={username} onChange={handleChange} className="user-input" />
</div>
<div className="input-field">
  <label className="input-titles">Contraseña:</label>
  <input type="password" name="password" value={password} onChange={handleChange} className="user-input" />
</div>

    <input type="submit"disabled={isSubmitting} value="Ingresar al sistema" className='submit-btn'/>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    <Link to="/recover-password" className='lost-pass'>Olvide mi contraseña</Link>
  </form>
</div>
</div>
  );
}

export default Login;