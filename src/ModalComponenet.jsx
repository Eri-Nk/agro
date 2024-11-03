// ModalComponent.js
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "0",
    left: "0",
    right: "30%",
    bottom: "0",
    margin: "0",
    border: "none",
    padding: "2em",
    zIndex: "200",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(5px)",
    zIndex: "199",
  },
};

Modal.setAppElement("#root");

const ModalComponent = ({
  isOpen,
  onClose,
  contentLabel,
  children,
  isDarkTheme,
  additionalStyles = {},
}) => {
  const dynamicStyles = {
    ...customStyles,
    content: {
      ...customStyles.content,
      backgroundColor: isDarkTheme ? "var(--dark-bg)" : "var(--light-bg)",
      color: isDarkTheme ? "var(--dark-color)" : "var(--light-color)",
      ...additionalStyles.content,
    },
    overlay: {
      ...customStyles.overlay,
      ...additionalStyles.overlay,
    },
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={dynamicStyles}
      contentLabel={contentLabel}
    >
      {children}
      <button
        onClick={onClose}
        className="modal-close"
        style={{
          color: isDarkTheme ? "var(--dark-color)" : "var(--light-color)",
        }}
      >
        Close
      </button>
    </Modal>
  );
};

export default ModalComponent;
