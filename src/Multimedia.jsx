
import Header from './HeaderBackoffice';
import ControlPanel from './ControlPanel';
import { useNavigate } from 'react-router-dom';
import iconVideo from './assets/video.svg';
import iconAudio from './assets/audio.svg';
import iconImg from './assets/img.svg';
import iconShare from './assets/compartir.svg';
import { useState, useEffect } from 'react';
import Loader from './utils/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
    
function ModuloMulti() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [multimedia, setMultimedia] = useState([]);
  const username = user ? user.username : '';
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
const [selectedImage, setSelectedImage] = useState(null); 

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
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
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
                          item.type === 'image' ? iconImg :
                          null
                        } 
                        alt={item.type}
                      />
                    </td>
                    <td>
                    <a onClick={() => navigator.clipboard.writeText(item.ruta_archivo)}>
  <img src={iconShare} alt="Compartir" />
</a>
{showModal && (
  <div className="modal-imagen">
    <a onClick={handleCloseModal} style={{
      display: 'flex',
      textDecoration: 'none',
      color: 'black',
      cursor: 'pointer',
      flexDirection: "row-reverse"
    }}><FontAwesomeIcon icon={faTimes} /></a>
    {selectedImage.endsWith('.jpg') || selectedImage.endsWith('.png') ? (
      <img className="modal-content-imagen" src={selectedImage} />
    ) : (
      <audio controls>
        <source src={selectedImage} type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    )}
  </div>
)}
                      <button className='table-btn' onClick={() => navigate(`/editar-multimedia/${item.id}`)}>Editar</button>
                      <button className='table-btn' onClick={() => deleteMultimedia(item.id)}>Eliminar</button>
                      <button className='table-btn' onClick={() => handleImageClick(`${item.ruta_archivo}`)}>
  {item.type === 'image' ? 'Visualizar' : 'Reproducir'}
</button>
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