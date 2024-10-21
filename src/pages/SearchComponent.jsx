import React from "react";
import { useSearch } from "../contexts/SearchContext";
import { Link } from "react-router-dom";

const SearchComponent = () => {
  const { searchResults } = useSearch();

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              <Link to={`#blog-${result.id}`}>{result.title}</Link>
              <p>{result.author}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchComponent;
