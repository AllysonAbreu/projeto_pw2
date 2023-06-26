import React from 'react';

interface ButtonProps {
  buttonColor: string;
  textColor: string;
  buttonText: string;
  width?: string;
  height?: string;
  fontSize?: string;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ buttonColor, textColor, buttonText, width, height, fontSize, type, onClick }) => {
  const buttonStyle = {
    backgroundColor: buttonColor,
    color: textColor,
    border: 'none',
    width: width || 'auto',
    height: height || 'auto',
    fontSize: fontSize || 'inherit',
    borderRadius: '3px'
  };

  return (
    <button style={buttonStyle} type={type} onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default Button;
