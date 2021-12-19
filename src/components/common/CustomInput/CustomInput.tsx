import React from 'react';

interface Props {
  id: string;
  type: string;
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const CustomInput = ({ id, type, name, value, placeholder, onChange, className }: Props) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      className={className}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;
