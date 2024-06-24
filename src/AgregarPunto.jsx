import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './HeaderBackoffice';
import radioButton from './assets/radioButton.png';
import ControlPanel from './ControlPanel';

function AgregarPunto() {
  const user = JSON.parse(localStorage.getItem('user'));
  const username1 = user ? user.username : '';
  const [nombre_es, setNombreEs] = useState("");
  const [nombre_eng, setNombreEng] = useState('');
  const [info_punto_es, setInfoPuntoEs] = useState('');
  const [info_punto_eng, setInfoPuntoEng] = useState('');
  const [coordenadas, setCoordenadas] = useState('{"top":"0px", "left":"0px"}');
  const [descripcion_es, setDescripcionEs] = useState('');
  const [descripcion_eng, setDescripcionEng] = useState('');
  const [type, setType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'nombre_es':
        setNombreEs(value);
        break;
      case 'nombre_eng':
        setNombreEng(value);
        break;
      case 'info_punto_es':
        setInfoPuntoEs(value);
        break;
      case 'info_punto_eng':
        setInfoPuntoEng(value);
        break;
      case 'coordenadas':
        setCoordenadas(value);
        break;
      case 'descripcion_es':
        setDescripcionEs(value);
        break;
      case 'descripcion_eng':
        setDescripcionEng(value);
        break;
      case 'type':
        setType(value);
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const puntoData = {
      nombre_es: nombre_es,
      nombre_eng: nombre_eng,
      info_punto_es: info_punto_es,
      info_punto_eng: info_punto_eng,
      coordenadas: coordenadas,
      descripcion_es: descripcion_es,
      descripcion_eng: descripcion_eng,
      type: type
    };

    fetch(`https://mapaapi.onrender.com/api/points/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(puntoData)
    })
    .then(response => response.json())
    .then(data => {
      navigate('/mapa-sonoro');
      setIsSubmitting(false);
      console.log(data);
      
    })
    .catch(error => console.error('Error:', error));
  };
  const handleMapClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; //x position within the element.
    const y = event.clientY - rect.top;  //y position within the element.
    setCoordenadas(`{"top":"${y}px", "left":"${x}px"}`);
  };
  let coordenadasObj = {};
  try {
    coordenadasObj = JSON.parse(coordenadas);
  } catch (error) {
    console.error('Error al parsear las coordenadas:', error);
  }

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
      <Header username={username1} />
      <ControlPanel />
      <div className="main-content">
      <div className='mapa' onClick={handleMapClick}
       onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUp}
           onMouseLeave={handleMouseUp} 
             style={{ cursor: 'grab', overflow: 'hidden' }} >  
        <div className='contenidoMapa'>
  <div 
    className="punto" 
    style={{top: coordenadasObj.top, left: coordenadasObj.left, backgroundImage: `url(${radioButton})`}} 
    data-name={nombre_es}
    
    ></div>
    </div>
  </div>
<button className='save-btn-point' type="submit" form="editForm">Guardar</button>
        <hr />
        <form id="editForm" onSubmit={handleSubmit} disabled={isSubmitting} className='edit-form'>
  <div className="input-row">
    <div className="input-field">
      <label className="input-titles-edit-usuario">Nombre en español:</label>
      <input type="text" name="nombre_es" value={nombre_es} onChange={handleChange} className="edit-multi-input" />
    </div>
    <div className="input-field">
      <label className="input-titles-edit-usuario">Nombre en inglés:</label>
      <input type="text" name="nombre_eng" value={nombre_eng} onChange={handleChange} className="edit-multi-input" />
    </div>
    <div className="input-field">
      <label className="input-titles-edit-usuario">Info Punto ES:</label>
      <input type="text" name="info_punto_es" value={info_punto_es} onChange={handleChange} className="edit-multi-input" />
    </div>
  </div>
  <div className="input-row">
    <div className="input-field">
      <label className="input-titles-edit-usuario">Info Punto ENG:</label>
      <input type="text" name="info_punto_eng" value={info_punto_eng} onChange={handleChange} className="edit-multi-input" />
    </div>
    <div className="input-field">
      <label className="input-titles-edit-usuario">Coordenadas:</label>
      <input type="text" name="coordenadas" value={coordenadas} onChange={handleChange} className="edit-multi-input" />
    </div>
  <div className="input-field">
    <label className="input-titles-edit-usuario">Type:</label>
              <select name="type" value={type} onChange={handleChange} className="edit-multi-input">
              <option value="">Selecciona un tipo</option>
              <option value="Montaña">Montaña</option>
              <option value="sierra">sierra</option>
              <option value="planicie">planicie</option>
            </select>
    </div>
  </div>
  <div className="input-row">
    <div className="input-field">
      <label className="input-titles-edit-usuario">Descripción ENG:</label>
      <textarea type="text" name="descripcion_eng" value={descripcion_eng} onChange={handleChange} className="edit-multi-input" />
    </div>
    <div className="input-field">
      <label className="input-titles-edit-usuario">Descripción ES:</label>
      <textarea type="text" name="descripcion_es" value={descripcion_es} onChange={handleChange} className="edit-multi-input" />
    </div>
   
    
  </div>
</form>
      </div>
    </div>
  );
}

export default AgregarPunto;