import React from "react";
import { DollarSign } from "lucide-react";
import FormSection from "./FormSection";

const PricingSection = ({ courseFee, handleInputChange, errors }) => {
  return (
    <FormSection 
      title="Pricing and Mentors" 
      icon={<DollarSign className="w-5 h-5 mr-2 text-blue-600" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Fee (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
            <input
              type="number"
              name="courseFee"
              value={courseFee}
              onChange={handleInputChange}
              className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors?.courseFee ? 'border-red-500' : 'border-gray-300'
              }`}
              min="0"
            />
          </div>
          {errors?.courseFee && (
            <p className="text-red-500 text-sm mt-1">{errors.courseFee}</p>
          )}
        </div>
      </div>
    </FormSection>
  );
};

export default PricingSection;
