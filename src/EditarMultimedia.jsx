import { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Header from './HeaderBackoffice';
import ControlPanel from './ControlPanel';

function EditarMultimedia() {
  const user = JSON.parse(localStorage.getItem('user'));
  const username1 = user ? user.username : '';
const [nombre_eng, setNombreEng] = useState("");
const [ruta_archivo, setRutaArchivo] = useState('');
const [hora, setHora] = useState( '');
const [nombre_es, setNombreEs] = useState('');
const [type, setType] = useState('');
const [destacado, setDestacado] = useState(false);
  const { id } = useParams();

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    switch (name) {
        case 'nombre_eng':
          setNombreEng(value);
          break;
        case 'ruta_archivo':
          setRutaArchivo(value);
          break;
        case 'hora':
          setHora(value);
          break;
        case 'nombre_es':
          setNombreEs(value);
          break;
        case 'type':
          setType(value);
          break;
        case 'destacado':
            setDestacado(type === 'checkbox' ? checked : value);
          break;
        default:
          break;
      }
  };
  
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();


    const userData = {
        nombre_eng: nombre_eng,
        ruta_archivo: ruta_archivo,
        hora: hora,
        nombre_es: nombre_es,
        type: type,
        destacado: destacado
      };

    fetch(`https://mapaapi.onrender.com/api/multi/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigate('/multimedia             ');
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
    <form id="editForm" onSubmit={handleSubmit}className='edit-form'>
    <div className="input-row">
    <div className="input-field">
      <label className="input-titles-edit-usuario">Nombre en inglés:</label>
      <input type="text" name="nombre_eng" value={nombre_eng} onChange={handleChange} className="edit-multi-input" />
    </div>
    <div className="input-field">
      <label className="input-titles-edit-usuario">Ruta del archivo:</label>
      <input type="text" name="ruta_archivo" value={ruta_archivo} onChange={handleChange} className="edit-multi-input" />
    </div>
    <div className="input-field">
      <label className="input-titles-edit-usuario">Hora:</label>
      <input type="text" name="hora" value={hora} onChange={handleChange} className="edit-multi-input" />
    </div>
  </div>
  <div className="input-row">
    <div className="input-field">
      <label className="input-titles-edit-usuario">Nombre en español:</label>
      <input type="text" name="nombre_es" value={nombre_es} onChange={handleChange} className="edit-multi-input" />
    </div>
    <div className="input-field">
      <label className="input-titles-edit-usuario">Tipo:</label>
      <input type="text" name="type" value={type} onChange={handleChange} className="edit-multi-input" />
    </div>
    <div className="input-field">
      <label className="input-titles-edit-usuario-destacado">Destacado:</label>
      <input type="checkbox" name="destacado" checked={destacado} onChange={handleChange} className="edit-multi-input" />
    </div>
  </div>
    </form>
  </div>
</div>
  );
}

export default EditarMultimedia;