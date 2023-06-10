import React from 'react';

interface ButtonProps {
  buttonColor: string;
  textColor: string;
  buttonText: string;
  width?: string;
  height?: string;
  fontSize?: string;
}

const Button: React.FC<ButtonProps> = ({ buttonColor, textColor, buttonText, width, height, fontSize }) => {
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
    <button style={buttonStyle}>
      {buttonText}
    </button>
  );
}

export default Button;
