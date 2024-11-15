import { useRef, useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import ModalComponent from "./ModalComponenet";
import { useTheme } from "./contexts/ThemeProvider";
import debounce from "lodash.debounce";
import SearchComponent from "./pages/SearchComponent.jsx";
import KeywordData from "./data/KeywordData.js";
import { useNavigate } from "react-router-dom";

const Search = ({ isSearchModalOpen, setIsSearchModalOpen }) => {
  const { isDarkTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const debouncedFunctionRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [isListFocused, setIsListFocused] = useState(false);

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };
  const handleFirstResultNavigation = () => {
    if (filteredResults.length > 0) {
      const firstResults = filteredResults[0];
      navigate(firstResults.link);
      closeSearchModal();

      setTimeout(() => {
        const element = document.getElementById(firstResults.id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      alert("No results found");
    }
  };

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => {
        if (inputRef.current && !isListFocused) {
          inputRef.current.focus();
        }
      }, 0);
    }
  }, [isSearchModalOpen, isListFocused]);

  useEffect(() => {
    debouncedFunctionRef.current = debounce((term) => {
      if (term) {
        const results = [];

        Object.keys(KeywordData).forEach((component) => {
          KeywordData[component].forEach((entry) => {
            if (entry.keyword.toLowerCase().includes(term.toLowerCase())) {
              results.push({
                keyword: entry.keyword,
                id: entry.id,
                link: entry.link,
              });
            }
          });
        });
        setFilteredResults(results);
      } else {
        setFilteredResults([]);
      }
    }, 500);
  }, []);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedFunctionRef.current(term);
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
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="search for keywords"
            ref={inputRef}
            spellCheck="false"
            name="search-text"
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleFirstResultNavigation();
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setIsListFocused(true);
              }
            }}
          />
          <FaArrowRight onClick={handleFirstResultNavigation} />
        </div>

        <SearchComponent
          searchResults={filteredResults}
          searchTerm={searchTerm}
          closeSearchModal={closeSearchModal}
          isListFocused={isListFocused}
          setIsListFocused={setIsListFocused}
        />
      </div>
    </ModalComponent>
  );
};

export default Search;
