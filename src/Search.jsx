import React, { useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import ModalComponent from "./ModalComponenet";
import { useTheme } from "./contexts/ThemeProvider";

const Search = ({ isSearchModalOpen, setIsSearchModalOpen }) => {
  const { isDarkTheme } = useTheme();
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const searchModalStyle = {
    content: {
      top: "20px",
      left: "10%",
      right: "10%",
      bottom: "20px",
      border: "none",
      borderRadius: "20px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    },
  };

  return (
    <ModalComponent
      isOpen={isSearchModalOpen}
      onClose={closeSearchModal}
      isDarkTheme={isDarkTheme}
      contentLabel="search modal"
      additionalStyles={searchModalStyle}
    >
      <div className="search-container">
        <div className="text-container">
          <FaMagnifyingGlass onClick={handleInput} />

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="search"
            ref={inputRef}
          />
        </div>
      </div>
    </ModalComponent>
  );
};

export default Search;
