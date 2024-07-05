import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Loader from "./utils/LoaderModal";
import React, {useState} from 'react';

function ModalMapa({ children, onClose,  }) {
    
  const [isLoading, setIsLoading] = useState(true); 

    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      };

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

  return (
    <div className="modalmapa" onClick={handleBackgroundClick}>
       <div className="modal-content-mapa">
      {isLoading ? (
          <Loader />
        ) : (
          <><a onClick={onClose} style={{
            display: 'flex',
            textDecoration: 'none',
            color: 'black',
            cursor: 'pointer',
              flexDirection: "row-reverse"
          }}><FontAwesomeIcon icon={faTimes} /></a>
          
                  {children}</>
        )}
      </div>
    </div>
  );
}

export default ModalMapa;