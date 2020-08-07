import React, { TextareaHTMLAttributes } from 'react';
import './styles.css';

interface TextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const TextArea: React.FC<TextArea> = ({ label, name, ...rest }) => {

  return (
    <div className="text-area-block">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...rest} />
    </div>
  )
}

export default TextArea;