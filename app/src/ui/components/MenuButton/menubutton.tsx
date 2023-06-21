import React from 'react';
import './menubutton.css';

interface MenuButtonProps {
  buttonText: string;
  onClick?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ buttonText, onClick }) => {
  return (
    <button className="menu-button" onClick={onClick}>
      <span className="button-text">{buttonText}</span>
    </button>
  );
}

export default MenuButton;
