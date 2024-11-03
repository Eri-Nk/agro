import { HashLink } from "react-router-hash-link";
import HighlightText from "./HighlightText";

const SearchComponent = ({ searchResults, searchTerm, closeSearchModal }) => {
  return (
    <div className="search-results">
      {searchTerm && (
        <>
          <h2>Search Results</h2>
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>
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
