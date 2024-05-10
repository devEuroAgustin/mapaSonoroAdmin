
import Header from './HeaderBackoffice';
import ControlPanel from './ControlPanel';
import { useNavigate } from 'react-router-dom';
import iconVideo from './assets/video.svg';
import iconAudio from './assets/audio.svg';
import iconImg from './assets/img.svg';
import iconShare from './assets/compartir.svg';
import { useState, useEffect } from 'react';
import Loader from './utils/Loader';


function ModuloMulti() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [multimedia, setMultimedia] = useState([]);
  const username = user ? user.username : '';
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 

  const fetchMultimedia = async () => {
    try {
      const response = await fetch('https://mapaapi.onrender.com/api/multi/');
      const data = await response.json();
      setMultimedia(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const deleteMultimedia = async (id) => {
    try {
      const response = await fetch(`https://mapaapi.onrender.com/api/multi/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el multimedia');
      }
     
      const updatedMultimedia = multimedia.filter(item => item.id !== id);
      setMultimedia(updatedMultimedia);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchMultimedia();
  }, []);

  return (
    <div className="dashboard">
      <Header username={username} />
      <ControlPanel />
      <div className="main-content">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <button className='close-ses' onClick={() => navigate(`/create-multimedia`)}>+ Agregar multimedia</button>
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
                {multimedia.map((item, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#FAF8F8' : '#FFFFFF' }}>
                    <td>{item.nombre_es}</td>
                    <td>{item.nombre_eng}</td>
                    <td>
                      <img 
                        src={
                          item.type === 'video' ? iconVideo :
                          item.type === 'audio' ? iconAudio :
                          item.type === 'img' ? iconImg :
                          null
                        } 
                        alt={item.type}
                      />
                    </td>
                    <td>
                      <img src={iconShare} alt="Compartir" />
                      <button className='table-btn' onClick={() => navigate(`/editar-multimedia/${item.id}`)}>Editar</button>
                      <button className='table-btn' onClick={() => deleteMultimedia(item.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> 
          </>
        )}
      </div>
    </div>
  );
}

export default ModuloMulti;