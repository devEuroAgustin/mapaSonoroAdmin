import Header from './HeaderFund';
import { useState, useEffect } from 'react';
import radioButton from './assets/radioButton.png';
import radioButtonBlack from './assets/radioButtonBlack.png';
import Loader from './utils/Loader';
import ModalMapa from './ModalMapa';

function MapaMain() {
    const [puntos, setPuntos] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [nameVisibility, setNameVisibility] = useState(true);
    const [language, setLanguage] = useState('English'); 
    const [selectedButton, setSelectedButton] = useState('OTOÑO'); // Nuevo estado para el botón seleccionado

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    
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
        .then(data => {
          setPuntos(data);
          setIsLoading(false);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    return (
      <div className="dashboard">
        <Header onLanguageChange={setLanguage} language={language} />

        <div className="fund-content">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="mapa">
                {puntos.map((punto, index) => {
                  let coordenadas = {};
                  try {
                    coordenadas = JSON.parse(punto.coordenadas);
                  } catch (error) {
                    console.error("Error al parsear las coordenadas:", error);
                  }
                  const dataNameAttribute = nameVisibility
                    ? language === "English"
                      ? punto.nombre_eng
                      : punto.nombre_es
                    : undefined; // Usamos el idioma para determinar qué propiedad mostrar
                  return (
                    <div
                      key={index}
                      className="punto"
                      style={{
                        top: coordenadas.top,
                        left: coordenadas.left,
                        backgroundImage: `url(${radioButton})`,
                      }}
                      data-name={dataNameAttribute}
                      onClick={() => handlePuntoClick(punto)}
                    ></div>
                  );
                })}
                {isModalOpen && modalData && (
                  <ModalMapa onClose={closeModal}>
                    <div>
                      <img
                        src="https://img.freepik.com/foto-gratis/santa-maddalena-cordillera-dolomitastirol-sur_661209-237.jpg"
                        className="imgfond"
                      />
                      <p className="descripcion-modal-mapa">info de punto</p>
                      <h2 className="nombre-modal-fund">
                        {language === "English"
                          ? modalData.nombre_eng
                          : modalData.nombre_es}
                      </h2>
                    </div>
                    <p className="descripcion-modal-mapa">
                      {language === "English"
                        ? modalData.descripcion_eng
                        : modalData.descripcion_es}
                    </p>
                    <div className="buttons-container">
                      <button
                        className={`button-fund ${
                          selectedButton === "OTOÑO" ? "selected" : ""
                        }`}
                        onClick={() => handleButtonClick("OTOÑO")}
                      >
                        OTOÑO
                      </button>
                      <button
                        className={`button-fund ${
                          selectedButton === "INVIERNO" ? "selected" : ""
                        }`}
                        onClick={() => handleButtonClick("INVIERNO")}
                      >
                        INVIERNO
                      </button>
                      <button
                        className={`button-fund-xl ${
                          selectedButton === "PRIMAVERA" ? "selected" : ""
                        }`}
                        onClick={() => handleButtonClick("PRIMAVERA")}
                      >
                        PRIMAVERA
                      </button>
                      <button
                        className={`button-fund ${
                          selectedButton === "VERANO" ? "selected" : ""
                        }`}
                        onClick={() => handleButtonClick("VERANO")}
                      >
                        VERANO
                      </button>
                    </div>
                    <div style={{display:'flex'}}>
                        <p className='day-moment'>Momento del día</p>
                        <select name="" id="" className='select-fund'>
                            <option value="">todos</option>
                            <option value="">Mañana</option>
                            <option value="">Tarde</option>
                            <option value="">Noche</option>
                        </select>
                    </div>
                    {/* <p className='description-modal-mapa'>{modalData.descripcion_engg}</p> */}
                  </ModalMapa>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
}

export default MapaMain;