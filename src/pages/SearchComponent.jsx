import { HashLink } from "react-router-hash-link";
import HighlightText from "./HighlightText";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchComponent = ({
  searchResults,
  searchTerm,
  closeSearchModal,
  isListFocused,
  setIsListFocused,
}) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const navigate = useNavigate();

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex(
          (prevIndex) =>
            (prevIndex - 1 + searchResults.length) % searchResults.length
        );
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex(
          (prevIndex) => (prevIndex + 1) % searchResults.length
        );
      } else if (e.key === "Enter" && highlightedIndex >= 0) {
        closeSearchModal();
        navigate(
          `${searchResults[highlightedIndex].link}#${searchResults[highlightedIndex].id}`
        );

        setTimeout(() => {
          const element = document.getElementById(
            searchResults[highlightedIndex].id
          );
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    },
    [highlightedIndex, searchResults, closeSearchModal, navigate]
  );

  // effect for arrowdown key
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  //removing focus from the list when focus is on input
  const handleListBlur = () => {
    setIsListFocused(false);
    setHighlightedIndex(-1);
  };

  return (
    <div className="search-results">
      {searchTerm && (
        <>
          <h2>Search Results</h2>
          {searchResults.length > 0 ? (
            <ul
              style={{ outline: "none" }}
              onBlur={handleListBlur}
              onKeyDown={(e) => {
                if (isListFocused) handleKeyDown(e);
                handleKeyDown(e);
              }}
            >
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  style={{
                    border:
                      highlightedIndex === index
                        ? "2px solid var(--dark-bg-block)"
                        : "none",
                  }}
                >
                  <HashLink
                    smooth
                    to={`${result.link}#${result.id}`}
                    onClick={closeSearchModal}
                  >
                    <HighlightText
                      text={result.keyword}
                      searchTerm={searchTerm}
                    />
                  </HashLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchComponent;
