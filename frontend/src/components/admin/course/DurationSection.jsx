import React from "react";
import { Clock } from "lucide-react";
import FormSection from "./FormSection";
import FormInput from "../../common/FormInput";

const DurationSection = ({ durationWeeks, handleInputChange }) => {
  return (
    <FormSection 
      title="Duration and Schedule" 
      icon={<Clock className="w-5 h-5 mr-2 text-blue-600" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormInput
          label="Duration (Weeks)"
          name="durationWeeks"
          value={durationWeeks}
          onChange={handleInputChange}
          type="number"
          required
          min="1"
        />
      </div>
    </FormSection>
  );
};

export default DurationSection;