
import Header from './HeaderBackoffice';
import ControlPanel from './ControlPanel';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import radioButton from './assets/radioButton.svg';
import Loader from './utils/Loader';
import ModalMapa from './ModalMapa';

function ModuloPuntos() {
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user ? user.username : '';
  const navigate = useNavigate();
  const [puntos, setPuntos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handlePuntoClick = (punto) => {
    setModalData(punto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };
  
  useEffect(() => {
    fetch('https://mapaapi.onrender.com/api/points/')
      .then(response => response.json())
      .then(data => {setPuntos(data)
        setIsLoading(false);

      })
      .catch(error => console.error('Error:', error));
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
            <div className='mapa'>
              {puntos.map((punto, index) => {
                let coordenadas = {};
                try {
                  coordenadas = JSON.parse(punto.coordenadas);
                } catch (error) {
                  console.error('Error al parsear las coordenadas:', error);
                }
                return (
                  <div 
                    key={index} 
                    className="punto" 
                    style={{top: coordenadas.top, left: coordenadas.left, backgroundImage: `url('../src/assets/radioButton.svg')`}} 
                    data-name={punto.nombre_es}
                    onClick={() => handlePuntoClick(punto)}
                  ></div>
                );
              })}
    {isModalOpen && modalData && (
      <ModalMapa onClose={closeModal}>
        <div style={{display: "flex"}}>
          <img src={radioButton} />
        <h2 className='nombre-modal-mapa'>{modalData.nombre_es}</h2>
        </div>
        <p className='descripcion-modal-mapa'>{modalData.descripcion_es}</p>
        {/* <p className='description-modal-mapa'>{modalData.descripcion_eng}</p> */}
      </ModalMapa>
    )}
            </div>
            <button className='close-ses'onClick={() => navigate('/agregar-punto')}>+ Agregar punto</button>
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
                {puntos.map((item, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#FAF8F8' : '#FFFFFF' }}>
                    <td>{item.nombre_es }</td>
                    <td>{item.nombre_eng}</td>
                    <td>{item.type}</td>
                    <td>
                      <button className='table-btn' onClick={() => navigate(`/editar-punto/${item.id}`)}>Editar</button>
                      <button 
                        className='table-btn' 
                        onClick={() => {
                          fetch(`https://mapaapi.onrender.com/api/points/delete/${item.id}`, {
                            method: 'DELETE',
                          })
                          .then(response => response.json())
                          .then(data => {
                            console.log(data);
                            setPuntos(puntos.filter(punto => punto.id !== item.id));
                          })
                          .catch(error => console.error('Error:', error));
                        }}
                      >
                        Eliminar
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

export default ModuloPuntos;