import React from 'react';
import logo from '../../assets/logo.png';
import userIcon from '../../assets/avatar.png';
import './navbar.css';

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="navbarlogo" />
        <span className="logo-name">PAF</span>
      </div>
      <ul className="navbar-items">
        <li>
          <a href="/dashboard">Home</a>
        </li>
        <li>
          <a href="/">Dicas</a>
        </li>
        <li>
          <a href="/">Minhas metas</a>
        </li>
        <li>
          <a href="/about">Sobre a Plataforma</a>
        </li>
      </ul>
      <div className="user-profile">
        <img src={userIcon} alt="User Icon" className="user-icon" />
        <span className="username">{username}</span>
      </div>
    </nav>
  );
};

export default Navbar;
