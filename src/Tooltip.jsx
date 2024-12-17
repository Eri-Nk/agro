const Tooltip = ({ closeTooltip }) => {
  return (
    <div className="tooltip-container">
      <p>Click your name to view RSVP&apos;d events and account details!</p>
      <button
        onClick={closeTooltip}
        style={{
          background: "transparent",
          border: "none",
          color: "#ccc",
          fontSize: "1.2rem",
          cursor: "pointer",
          position: "absolute",
          top: "5px",
          right: "5px",
        }}
      >
        X
      </button>
    </div>
  );
};

export default Tooltip;
