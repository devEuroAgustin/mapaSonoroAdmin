
import Header from './HeaderBackoffice';
import ControlPanel from './ControlPanel';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import radioButton from './assets/radioButton.png';
import radioButtonBlack from './assets/radioButtonBlack.png';
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
  const [nameVisibility, setNameVisibility] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

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

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setStartY(e.pageY - e.currentTarget.offsetTop);
    e.currentTarget.style.cursor = 'grabbing';
};

const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - e.currentTarget.offsetLeft;
    const y = e.pageY - e.currentTarget.offsetTop;
    const walkX = (x - startX) * .3; // Multiplicar por 2 para hacer el movimiento más rápido
    const walkY = (y - startY) * .3;
    e.currentTarget.scrollLeft -= walkX;
    e.currentTarget.scrollTop -= walkY;
};

const handleMouseUp = (e) => {
    setIsDragging(false);
    e.currentTarget.style.cursor = 'grab';
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

                      <div
                            className="mapa"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp} // Para manejar cuando el cursor sale del contenedor
                            style={{ cursor: 'grab', overflow: 'hidden' }} // Estilo inicial para el cursor y ocultar barras de desplazamiento
                        >
              <div className='contenidoMapa'>
              {puntos.map((punto, index) => {
                let coordenadas = {};
                try {
                  coordenadas = JSON.parse(punto.coordenadas);
                  } catch (error) {
                    console.error('Error al parsear las coordenadas:', error);
                    }
                    const dataNameAttribute = nameVisibility ? punto.nombre_es : undefined;
                    return (
                      <div 
                      key={index} 
                      className="punto" 
                      style={{top: coordenadas.top, left: coordenadas.left, backgroundImage: `url(${radioButton})`}} 
                      data-name={dataNameAttribute}
                      onClick={() => handlePuntoClick(punto)}
                      ></div>
                      );
                      })}
                    </div>
    {isModalOpen && modalData && (
      <ModalMapa onClose={closeModal}>
        <div style={{display: "flex"}}>
          <img src={radioButtonBlack}  className='radioButton'/>
        <h2 className='nombre-modal-mapa'>{modalData.nombre_es}</h2>
        </div>
        <p className='descripcion-modal-mapa'>{modalData.descripcion_es}</p>
        {/* <p className='description-modal-mapa'>{modalData.descripcion_eng}</p> */}
      </ModalMapa>
    )}
            </div>
            <button className='close-ses'onClick={() => navigate('/agregar-punto')}>+ Agregar punto</button>
            <button className='close-ses' onClick={() => setNameVisibility(prevState => !prevState)}>
  {nameVisibility ? 'Ocultar nombres' : 'Mostrar nombres'}
</button>
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