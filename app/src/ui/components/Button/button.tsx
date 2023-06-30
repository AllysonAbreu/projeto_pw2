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
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ buttonColor, textColor, buttonText, width, height, fontSize, type, onClick, className, disabled }) => {
  const buttonStyle = {
    backgroundColor: buttonColor,
    color: textColor,
    border: 'none',
    width: width || 'auto',
    height: height || 'auto',
    fontSize: fontSize || 'inherit',
    borderRadius: '3px',
    cursor:'pointer'
  };

  return (
    <button style={buttonStyle} type={type} onClick={onClick} className={className} disabled={disabled}>
      {buttonText}
    </button>
  );
}

export default Button;
