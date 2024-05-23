import { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Header from './HeaderBackoffice';
import ControlPanel from './ControlPanel';
import Loader from './utils/Loader';

function EditarMultimedia() {
  const user = JSON.parse(localStorage.getItem('user'));
  const username1 = user ? user.username : '';
  const [nombre_eng, setNombreEng] = useState("");
  const [ruta_archivo, setRutaArchivo] = useState(null);
  let [hora, setHora] = useState( '');
  const [nombre_es, setNombreEs] = useState('');
  const [type, setType] = useState('');
  const [destacado, setDestacado] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [fileName, setFileName] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://mapaapi.onrender.com/api/multi/${id}`)
      .then(response => response.json())
      .then(data => {
        setNombreEng(data.nombre_eng || '');
        setRutaArchivo(data.ruta_archivo || '');
        
        // Formatea la fecha y hora
        const date = new Date(data.hora);
        const formattedDate = date.toISOString().substring(0, 16);
        setHora(formattedDate || '');
        
        setNombreEs(data.nombre_es || '');
        setType(data.type || '');
        setDestacado(data.destacado || false);
        setIsLoading(false);
      })
      .catch(error => console.error('Error:', error));
  }, [id]);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    switch (name) {
        case 'nombre_eng':
          setNombreEng(value);
          break;
        case 'archivo':
          setRutaArchivo(event.target.files[0]);
          setFileName(event.target.files[0].name);
          break;
        case 'hora':
          console.log(value)
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

    hora = new Date(hora).toISOString();
    const formData = new FormData();
    formData.append('nombre_eng', nombre_eng);
    formData.append('archivo', ruta_archivo);
    formData.append('hora', hora);
    formData.append('nombre_es', nombre_es);
    formData.append('type', type);
    formData.append('destacado', destacado);

    fetch(`https://mapaapi.onrender.com/api/multi/update/${id}`, {
      method: 'PUT',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigate('/multimedia');
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="dashboard">
      <Header username={username1} />
      <ControlPanel />
      <div className="main-content">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <button className='save-btn' type="submit" form="editForm">Guardar</button>
            <hr />
            <form id="editForm" onSubmit={handleSubmit} className='edit-form' encType="multipart/form-data">
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
                    <option value="img">Imagen</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                  </select>
                </div>
                <div className="input-field">
                  <label className="input-titles-edit-usuario-destacado">Destacado:</label>
                  <input type="checkbox" name="destacado" checked={destacado} onChange={handleChange} className="edit-multi-input" />
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default EditarMultimedia;