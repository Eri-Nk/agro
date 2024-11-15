import { HashLink } from "react-router-hash-link";
import HighlightText from "./HighlightText";
import { useEffect, useState, useRef } from "react";

const SearchComponent = ({
  searchResults,
  searchTerm,
  closeSearchModal,
  isListFocused,
  setIsListFocused,
}) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const listRef = useRef(null);

  const handleKeyDown = (e) => {
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
      window.location.href = `${searchResults[highlightedIndex].link}#${searchResults[highlightedIndex].id}`;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [highlightedIndex, searchResults]);

  useEffect(() => {
    if (isListFocused && listRef.current) {
      setTimeout(() => {
        listRef.current.focus();
      }, 0);
    }
  }, [isListFocused]);

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
              ref={listRef}
              tabIndex="-1"
              onKeyDown={(e) => {
                if (isListFocused) handleKeyDown(e);
              }}
              style={{ outline: "red" }}
              onBlur={handleListBlur}
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
