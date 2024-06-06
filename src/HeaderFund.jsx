
import logoFund from './assets/LogoFund.png';
import PropTypes from 'prop-types';

import GbFlag from './assets/gb.svg';
import EsFlag from './assets/es.png';

function Header({ onLanguageChange, language }) { 
    const handleFlagClick = () => {
        onLanguageChange(prevLanguage => prevLanguage === 'English' ? 'Spanish' : 'English');
    };

    return (
        <div className='fund-header'>
            <img src={logoFund} alt="Austral Lab" className='logo-fund'/>
            <div className='login-titles'>
                <h1 className="fund-title">Mapa Sonoro Parque Vodudahue</h1>
            </div>
            <div className="user-info">
                <img src={language === 'English' ? GbFlag : EsFlag} alt={language} className='flag' onClick={handleFlagClick}/>
            </div>
        </div>
    );
}

Header.propTypes = {
    onLanguageChange: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
};

export default Header;