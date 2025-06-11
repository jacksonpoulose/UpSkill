import React from "react";
import { Upload, X } from "lucide-react";
import FormSection from "./FormSection";

const ImageUploadSection = ({
  preview,
  handleImageChange,
  handleRemoveImage,
  setImage,
  setPreview,
  error,
}) => {
  return (
    <FormSection
      title="Course Image"
      icon={<Upload className="w-5 h-5 mr-2 text-blue-600" />}
    >
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <label className="cursor-pointer group flex items-center px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-200 border-2 border-blue-200">
          <Upload
            className="mr-2 group-hover:scale-110 transition-transform duration-200"
            size={18}
          />
          <span>Upload Image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="h-24 w-24 rounded-lg object-cover border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => {
                setImage(null);
                setPreview(null);
                if (handleRemoveImage) handleRemoveImage();
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors flex items-center justify-center"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="h-24 w-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-gray-50">
            <span className="text-xs text-center px-2">No image</span>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

      <p className="text-xs text-gray-500 mt-2">
        Recommended: 1280×720px, JPG or PNG, max 2MB
      </p>
    </FormSection>
  );
};

export default ImageUploadSection;
