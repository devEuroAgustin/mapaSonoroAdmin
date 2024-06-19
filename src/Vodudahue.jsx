import Header from './HeaderFund';
import { useState, useEffect } from 'react';
import radioButton from './assets/radioButton.png';
import radioButtonBlack from './assets/radioButtonBlack.png';
import Loader from './utils/Loader';
import ModalMapa from './ModalFund';

function MapaMain() {
    const [puntos, setPuntos] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [nameVisibility, setNameVisibility] = useState(true);
    const [language, setLanguage] = useState('English'); 
    const [selectedButton, setSelectedButton] = useState('OTOÑO'); // Nuevo estado para el botón seleccionado
    const [selectedValue, setSelectedValue] = useState('');
    const [Data, setData] = useState(null);
    const [imgRutaArchivo, setImgRutaArchivo] = useState('');

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

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

    
      
      const handleData = (data) => {
        setModalData(data);
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

    let idPoint = modalData?.id;
    let momentDay = selectedValue;
    let season = selectedButton;
    
    useEffect(() => {
      if (idPoint !== undefined ) {
        fetch(`https://mapaapi.onrender.com/api/points/bySeasonAndMoment/${idPoint}`)
          .then(response => response.json())
          .then(data => {
            setData(data);
          });
      }
    }, [ idPoint, momentDay, season,]);


    useEffect(() => {
      if (Data) {
        console.log(Data)
        let imgRegistro = Data.registros_multimedia.find(registro => registro.type === 'image');
        console.log(imgRegistro);
        if (imgRegistro) {
          setImgRutaArchivo(imgRegistro.ruta_archivo);
        }
      }
    }, [Data]);

    return (
      <div className="dashboard">
        <Header onLanguageChange={setLanguage} language={language} />

        <div className="fund-content">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="mapa">
                <div className='contenidoMapa'>
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
                </div>
                {isModalOpen && modalData && (
                  <ModalMapa onClose={closeModal}>
                    <div>
                      <img src={imgRutaArchivo} className="imgfond" />
                      <p className="descripcion-modal-mapa">
                        {language === "English"
                          ? modalData?.info_punto_eng
                          : modalData?.info_punto_es}
                      </p>
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
                    <div style={{ display: "flex" }}>
                      <p className="day-moment">Momento del día</p>
                      <select
                        name=""
                        id=""
                        className="select-fund"
                        value={selectedValue}
                        onChange={handleChange}
                      >
                        <option value="">todos</option>
                        <option value="Mañana">Mañana</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noche">Noche</option>
                      </select>
                    </div>
                    <div>
  {Data && Data.registros_multimedia.map((recurso) => {
    if (recurso.type === 'audio' ) {
      return recurso.type === 'audio' ? (
        <div key={recurso.id}>
          <div style={{display:'flex'}}>
          <h3 className='h3_fund'>{language === "English"
                          ? recurso.nombre_eng
                          : recurso.nombre_es}</h3>
          {recurso?.moment_day && <p className='moment_day'>{recurso.moment_day}</p>}
          </div>
                         
          <audio controls>
            <source src={recurso.ruta_archivo} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ) : (
        <div key={recurso.id}>
          <h3>{recurso.nombre_es}</h3>
          <video controls>
            <source src={recurso.ruta_archivo} type="video/mp4" />
            Your browser does not support the video element.
          </video>
        </div>
      );
    }
    return null;
  })}
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