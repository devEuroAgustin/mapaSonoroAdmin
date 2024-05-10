import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './HeaderBackoffice';
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
      console.log(data);
      navigate('/mapa-sonoro');
    })
    .catch(error => console.error('Error:', error));
  };

 
  return (
    <div className="dashboard">
      <Header username={username1} />
      <ControlPanel />
      <div className="main-content">
<button className='save-btn' type="submit" form="editForm">Guardar</button>
        <hr />
        <form id="editForm" onSubmit={handleSubmit} className='edit-form'>
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
      <label className="input-titles-edit-usuario">Descripción ES:</label>
      <input type="text" name="descripcion_es" value={descripcion_es} onChange={handleChange} className="edit-multi-input" />
    </div>
  </div>
  <div className="input-row">
    <div className="input-field">
      <label className="input-titles-edit-usuario">Descripción ENG:</label>
      <input type="text" name="descripcion_eng" value={descripcion_eng} onChange={handleChange} className="edit-multi-input" />
    </div>
    <div className="input-field">
      <label className="input-titles-edit-usuario">Type:</label>
      <input type="text" name="type" value={type} onChange={handleChange} className="edit-multi-input" />
    </div>
  </div>
</form>
      </div>
    </div>
  );
}

export default AgregarPunto;