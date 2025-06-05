import React from "react";

const FormSection = ({ title, icon, children }) => {
  return (
    <div className="space-y-6 pt-6 first:pt-0 border-t border-gray-200 first:border-t-0 animate-fadeIn">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center">
        {icon}
        {title}
      </h2>
      {children}
    </div>
  );
};

export default FormSection;