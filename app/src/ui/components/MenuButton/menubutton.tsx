import React from 'react';
import './menubutton.css';

interface MenuButtonProps {
  buttonText: string;
  onClick?: () => void | undefined;
}

const MenuButton: React.FC<MenuButtonProps> = ({ buttonText }) => {
  return (
    <button className="menu-button">
      <span className="button-text">{buttonText}</span>
    </button>
  );
}

export default MenuButton;
