
import logoAustral from './assets/Austral_LAB.png';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Header({ username }) {
    const navigate = useNavigate();
    return (
        <div className='login-header'>
            <img src={logoAustral} alt="Austral Lab" className='logo-austral'/>
            <div className='login-titles'>
                <h1 className="login-title">CMS Mapa Sonoro</h1>
                <h2 className="login-subtitle">Fundacion Alerce 3000</h2>
            </div>
            <div className="user-info">
                <span className='username'>{username}</span>
                <button className='close-ses' onClick={() => navigate('/')}>Cerrar Sesión</button>
            </div>
        </div>
    );
}

Header.propTypes = {
    username: PropTypes.string.isRequired,
};

export default Header;