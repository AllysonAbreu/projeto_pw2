import React from 'react';
import './searchbar.css';
import searchIcon from '../../assets/search.png'

const SearchBar = () => {
  return (
    <div className="searchbar-container">
      <input type="text" className="search-input" placeholder="Pesquise..." />
      <img src={searchIcon} alt="Search Icon" className="search-icon" />
    </div>
  );
}

export default SearchBar;
