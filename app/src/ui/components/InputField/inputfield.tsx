import React from 'react';

interface InputFieldProps {
  type?: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  iconImage?: string;
  width?: string;
  height?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  name,
  onChange,
  iconImage,
  width,
  height
}) => {
  const inputStyle = {
    backgroundColor: 'white',
    border: 'none',
    borderBottom: '1px solid gray',
    color: 'gray',
    outline: 'none',
    width: width || '100%',
    height: height || 'auto',
    padding: '5px',
    backgroundImage: `url(${iconImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right center',
    backgroundSize: 'auto 80%',
  };

  return (
    <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} style={inputStyle} />
  );
}

export default InputField;
