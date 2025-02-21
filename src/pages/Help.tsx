const Help = (): JSX.Element => {

  return (
    <div>
      <iframe
        src="help.pdf"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          border: "none",
        }}
        title="PDF Viewer">
      </iframe>
    </div>
  );
};

export default Help;
