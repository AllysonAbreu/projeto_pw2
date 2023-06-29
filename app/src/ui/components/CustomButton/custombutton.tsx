import React from 'react';
import './custombutton.css';

interface CustomButtonProps {
  text: string;
  icon?: string;
  className?:string;
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: React.ButtonHTMLAttributes<HTMLButtonElement>['disabled'];
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, icon, className, onClick, type, disabled }) => {
  return (
    <button className={`custom-button ${className}`} onClick={onClick} type={type} disabled={disabled}>
      <span className="button-text">{text}</span>
      {icon && <img className="button-icon" src={icon} alt="Icon" />} 
    </button>
  );
}

export default CustomButton;
