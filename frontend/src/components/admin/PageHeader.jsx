import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PageHeader = ({ title, subtitle, backLink, backLabel }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        {backLink && (
          <Link to={backLink}>
            <button
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <ArrowLeft size={18} />
              <span>{backLabel || "Back"}</span>
            </button>
          </Link>
        )}
        <div className="animate-fadeIn">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;