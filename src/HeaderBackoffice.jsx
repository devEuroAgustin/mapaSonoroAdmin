

import PropTypes from 'prop-types';

function Header({ username }) {
    return (
        <div className='login-header'>
            <img src="src\assets/Austral_LAB.png" alt="Austral Lab" className='logo-austral'/>
            <div className='login-titles'>
                <h1 className="login-title">CMS Mapa Sonoro</h1>
                <h2 className="login-subtitle">Fundacion Alerce 3000</h2>
            </div>
            <div className="user-info">
                <span className='username'>{username}</span>
                <button className='close-ses'>Cerrar Sesión</button>
            </div>
        </div>
    );
}

Header.propTypes = {
    username: PropTypes.string.isRequired,
};

export default Header;