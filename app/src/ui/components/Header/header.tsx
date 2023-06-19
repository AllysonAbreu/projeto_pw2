import React from 'react';
import './header.css';

const Header: React.FC = () => {
  return (
    <div className="header-container">
      <h1>
        <span className="header-text-left">Saúde é</span>
        <br />
        <span className="header-text-middle">o que interessa,</span>
        <br />
        <span className="header-text-right">o resto não tem pressa!</span>
      </h1>
    </div>
  );
}

export default Header;
