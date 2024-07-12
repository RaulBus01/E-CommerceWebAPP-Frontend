import React, { useState, useEffect } from 'react';
import './searchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (searchInput.length > 0) {
      setSuggestions(['Suggestion 1', 'Suggestion 2', 'Suggestion 3']);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchInput]);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchInput(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    setShowDropdown(false);
  };

  return (
    <div className="search-bar-container">
      <div className={`search-input-wrapper ${showDropdown ? 'no-bottom-border' : ''}`}>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchInput}
          onChange={handleChange}
          enterKeyHint="search"
        />
        {searchInput.length > 0 && <CloseIcon className="close-icon" onClick={() => setSearchInput('')} />}
        <SearchIcon className="search-icon" />
      </div>
      {showDropdown && (
        <div className="search-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="search-dropdown-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
