import React, { InputHTMLAttributes } from 'react';
import './styles.css';

interface Select extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const InputForm: React.FC<Select> = ({ label, name, ...rest }) => {

  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input className='input' id={name} {...rest} required />
    </div>
  )
}

export default InputForm;