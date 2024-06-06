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
    const [language, setLanguage] = useState('English'); // Nuevo estado para el idioma

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
            <Header onLanguageChange={setLanguage} language={language} /> {/* Pasa setLanguage y language a Header */}

            <div className="fund-content">
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
                    const dataNameAttribute = nameVisibility ? (language === 'English' ? punto.nombre_eng : punto.nombre_es) : undefined; // Usamos el idioma para determinar qué propiedad mostrar
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
                    {isModalOpen && modalData && (
                    <ModalMapa onClose={closeModal}>
                        <div style={{display: "flex"}}>
                        <img src={radioButtonBlack}  className='radioButton'/>
                        <h2 className='nombre-modal-mapa'>{language === 'English' ? modalData.nombre_eng : modalData.nombre_es}</h2> {/* Usamos el idioma para determinar qué propiedad mostrar */}
                        </div>
                        <p className='descripcion-modal-mapa'>{language === 'English' ? modalData.descripcion_eng : modalData.descripcion_es}</p>
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