import { createContext, useContext, useState } from "react";

const SearchContext = createContext();
export const useSearch = () => useContext(SearchContext);

const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, searchResults, setSearchResults }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
