import React from "react";

const FormTextarea = ({ 
  label, 
  name, 
  value, 
  onChange, 
  rows = 3, 
  required = false, 
  placeholder = "",
  className = "" 
}) => {
  return (
    <div className="animate-fadeIn">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormTextarea;