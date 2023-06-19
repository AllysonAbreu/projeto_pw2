import React from 'react';

interface ButtonProps {
  buttonColor: string;
  textColor: string;
  buttonText: string;
  width?: string;
  height?: string;
  fontSize?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ buttonColor, textColor, buttonText, width, height, fontSize, onClick }) => {
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
    <button style={buttonStyle} onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default Button;
