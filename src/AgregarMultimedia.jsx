import { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import Header from './HeaderBackoffice';
import ControlPanel from './ControlPanel';

function AgregarMultimedia() {
  const user = JSON.parse(localStorage.getItem('user'));
  const username1 = user ? user.username : '';
const [nombre_eng, setNombreEng] = useState("");
const [ruta_archivo, setRutaArchivo] = useState('');
let [hora, setHora] = useState( '');
const [nombre_es, setNombreEs] = useState('');
const [type, setType] = useState('');
const [destacado, setDestacado] = useState(false);
const [punto_id, setPuntoId] = useState('');
const [user_id, setUserId] = useState('');
const [puntos, setPuntos] = useState([]);
const [usuarios, setUsuarios] = useState([]);
const [isSubmitting, setIsSubmitting] = useState(false);
const [fileName, setFileName] = useState('');
const [momentDay, setMomentDay] = useState('');
const [season, setSeason] = useState('');


useEffect(() => {
  console.log(punto_id);
}, [punto_id]);

useEffect(() => {
  console.log(user_id);
}, [user_id]);

  const handleChange = (event) => {
    const { name, value, checked, type, files } = event.target;

    switch (name) {
        case 'nombre_eng':
          setNombreEng(value);
          break;
        case 'archivo':
          console.log(files)
          setRutaArchivo(files[0]);
          setFileName(event.target.files[0].name);
          console.log(ruta_archivo)
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
          case 'punto_id':
            setPuntoId(parseInt(value, 10) );
            console.log(punto_id)
            break;
          case 'user_id':
            setUserId(parseInt(value, 10));
            console.log(user_id)
          case 'momentDay':
            setMomentDay(value);
          break;
          case 'season':
            setSeason(value);
          break;
            break;
        default:
          break;
      }
  };
  
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    hora = new Date(hora).toISOString();
console.log(hora)
      const formData = new FormData();
      formData.append('nombre_eng', nombre_eng);
      formData.append('archivo', ruta_archivo);
      formData.append('hora', hora);
      formData.append('nombre_es', nombre_es);
      formData.append('punto_id', punto_id);
      formData.append('user_id', user_id);
      formData.append('type', type);
      formData.append('destacado', destacado);
      formData.append('moment_day', momentDay);
      formData.append('season', season);


    

    fetch(`https://mapaapi.onrender.com/api/multi/create/`, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(`HTTP error! status: ${response.status}, message: ${error.message}`);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setIsSubmitting(false);
      navigate('/multimedia             ');
    })
    .catch(error => console.error('Error:', error));
  };
  
  useEffect(() => {
    // Obtener los puntos
    fetch('https://mapaapi.onrender.com/api/points')
      .then(response => response.json())
      .then(data => setPuntos(data))
      .catch(error => console.error('Error:', error));
  
    // Obtener los usuarios
    fetch('https://mapaapi.onrender.com/api/clients')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error:', error));
  
    // ...
  }, []);

  return (
<div className="dashboard">
  <Header username={username1} />
  <ControlPanel />
  <div className="main-content">
    <button className='save-btn' type="submit" form="editForm">Guardar</button>
    <hr />
    <form id="editForm" onSubmit={handleSubmit} disabled={isSubmitting} className='edit-form'>
    <div className="input-row">
    <div className="input-field">
      <label className="input-titles-edit-usuario">Nombre en inglés:</label>
      <input type="text" name="nombre_eng" value={nombre_eng} onChange={handleChange} className="edit-multi-input" />
    </div>
    <div className="input-field">
  <label className="input-titles-edit-usuario">Archivo:</label>
  <input type="file" id="archivo" name="archivo" onChange={handleChange} className="edit-multi-input-file" />
  <label for="archivo" class="custom-file-upload">
  <p>Subir archivo</p>
{fileName && <span className='sub-text'>Archivo seleccionado: {fileName}</span>}
</label>
  </div>
<div className="input-field">
  <label className="input-titles-edit-usuario">Fecha y hora:</label>
  <input type="datetime-local" name="hora" value={hora} onChange={handleChange} className="edit-multi-input" />
</div>
</div>
  <div className="input-row">
    <div className="input-field">
      <label className="input-titles-edit-usuario">Nombre en español:</label>
      <input type="text" name="nombre_es" value={nombre_es} onChange={handleChange} className="edit-multi-input" />
    </div>
    <div className="input-field">
  <label className="input-titles-edit-usuario">Tipo:</label>
  <select name="type" value={type} onChange={handleChange} className="edit-multi-input">
    <option value="">Selecciona un tipo</option>
    <option value="image">Imagen</option>
    <option value="video">Video</option>
    <option value="audio">Audio</option>
  </select>
</div>
    <div className="input-field">
      <label className="input-titles-edit-usuario-destacado">Destacado:</label>
      <input type="checkbox" name="destacado" checked={destacado} onChange={handleChange} className="edit-multi-input" />
    </div>
  </div>
  <div className="input-row">
    <div className="input-field">
      <label className="input-titles-edit-usuario">Punto ID:</label>
      <select name="punto_id" value={punto_id} onChange={handleChange} className="edit-multi-input">
      <option value="">Selecciona uno</option>
  {puntos.map(punto => (
    <option key={punto.id} value={punto.id}>
      {punto.nombre_es}
    </option>
  ))}
</select>
    </div>
    <div className="input-field">
      <label className="input-titles-edit-usuario">User ID:</label>
      <select name="user_id" value={user_id} onChange={handleChange} className="edit-multi-input">
      <option value="">Selecciona uno</option>
      {usuarios.map(usuario => (
      <option key={usuario.id} value={usuario.id}>
        {usuario.username}
      </option>
  ))}
</select>
    </div>
    <div className="input-field">
                  <label className="input-titles-edit-usuario">Momento del dia:</label>
                  <select name="momentDay" value={momentDay} onChange={handleChange} className="edit-multi-input">
                    <option value="">Selecciona uno</option>
                    <option value="mañana">Mañana</option>
                    <option value="tarde">Tarde</option>
                    <option value="noche">Noche</option>
                  </select>
                </div>
                <div className="input-field">
                  <label className="input-titles-edit-usuario">Temporada:</label>
                  <select name="season" value={season} onChange={handleChange} className="edit-multi-input">
                    <option value="">Selecciona uno</option>
                    <option value="OTOÑO">Otoño</option>
                    <option value="INVIERNO">Invierno</option>
                    <option value="PRIMAVERA">Primavera</option>
                    <option value="VERANO">Verano</option>
                  </select>
                </div>
  </div>
    </form>
  </div>
</div>
  );
}

export default AgregarMultimedia;