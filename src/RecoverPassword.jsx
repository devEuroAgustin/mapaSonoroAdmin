import { useState } from 'react';

function RecoverPassword() {
  const [username, setUsername] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'username') {
      setUsername(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la recuperación de la contraseña, por ejemplo, enviando los datos a una API
    console.log(`Username: ${username}`);
  };

  return (
    <div className="container">
    <div className="pass-container">
      <div className='login-header'>
        <img src="src\assets/Austral_LAB.png" alt="Austral Lab" className='logo-austral'/>
        <div className='login-titles'>
          <h1 className="login-title">CMS Mapa Sonoro</h1>
          <h2 className="login-subtitle">Fundacion Alerce 3000</h2>
        </div>
        </div>
        <p className="login-instructions">indique su correo electronico para recuperar su contraseña:</p>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label className="input-titles">Email:</label>
          <input type="text" name="username" value={username} onChange={handleChange} className="user-input" />
        </div>
        <input type="submit" value="Recuperar contraseña" className="submit-btn" />
      </form>
    </div>
    </div>
  );
}

export default RecoverPassword;