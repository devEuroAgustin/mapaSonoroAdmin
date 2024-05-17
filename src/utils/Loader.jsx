

function Loader() {
  return (
    <div style={{
        width: "50px",
        height: "50px",
      
        /* centrar vertical y horizontalmente */
        position: "absolute",
        top: "20vh",
        left: "50vw",
        margin: "205px 0px 0px -165px", 
    }}>
      <div style={{
        border: '16px solid #f3f3f3',
        borderTop: '16px solid black',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        animation: 'spin 2s linear infinite'
      }}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Loader;