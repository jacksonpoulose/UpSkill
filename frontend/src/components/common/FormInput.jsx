import React from "react";

const FormInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "text", 
  required = false, 
  placeholder = "", 
  min,
  max,
  className = ""
}) => {
  return (
    <div className="animate-fadeIn">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
      />
    </div>
  );
};

export default FormInput;