import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function ModalMapa({ children, onClose }) {
    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      };
  return (
    <div className="modalmapa" onClick={handleBackgroundClick}>
      <div className="modal-content-mapa">
      <a onClick={onClose} style={{
  display: 'flex',
  textDecoration: 'none',
  color: 'black',
  cursor: 'pointer',
    flexDirection: "row-reverse"
}}><FontAwesomeIcon icon={faTimes} /></a>

        {children}
      </div>
    </div>
  );
}

export default ModalMapa;