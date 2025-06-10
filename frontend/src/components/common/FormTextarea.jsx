import React from "react";

const FormTextarea = ({ 
  label, 
  name, 
  value, 
  onChange, 
  rows = 3, 
  required = false, 
  placeholder = "",
  error,
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
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 transition-all ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
        } ${className}`}
        required={required}
        placeholder={placeholder}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FormTextarea;
