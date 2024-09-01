import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchIconClick = () => {
    setIsModalOpen(true); // Open the search modal
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    // Logic to fetch search results based on input
  };

  return (
    <div className="search-container">
      <FaSearch onClick={handleSearchIconClick} />

      {isModalOpen && (
        <div className="search-modal">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleInputChange}
          />
          {/* Display search results here */}
          <div className="search-results">
            {/* Render list of search results based on `searchQuery` */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
