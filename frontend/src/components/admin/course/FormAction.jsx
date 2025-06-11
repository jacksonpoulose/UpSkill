import React from "react";
import { BookOpen } from "lucide-react";

const FormActions = ({ loading }) => {
  return (
    <div className="pt-6 border-t border-gray-200">
      <button
        type="submit"
        className={`w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 ${
          loading ? "opacity-75 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Creating Course...</span>
          </>
        ) : (
          <>
            <BookOpen size={20} className="mr-2" />
            <span>Create Course</span>
          </>
        )}
      </button>
    </div>
  );
};

export default FormActions;
