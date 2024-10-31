import React from 'react';

const InputField = ({ placeholder, type = "text", value, onChange }) => (
  <input 
    type={type} 
    placeholder={placeholder} 
    value={value} 
    onChange={onChange} 
    style={{
      padding: "10px", 
      margin: "8px 0",
      width: "100%",
      borderRadius: "5px",
      border: "1px solid #ddd"
    }}
  />
);

export default InputField;
