import React from 'react';
import './custombutton.css';

interface CustomButtonProps {
  text: string;
  icon?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, icon }) => {
  return (
    <button className="custom-button">
      <span className="button-text">{text}</span>
      {icon && <img className="button-icon" src={icon} alt="Icon" />} 
    </button>
  );
}

export default CustomButton;
