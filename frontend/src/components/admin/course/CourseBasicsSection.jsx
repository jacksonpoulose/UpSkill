import React from "react";
import { BookOpen } from "lucide-react";
import FormSection from "./FormSection";
import FormInput from "../../common/FormInput";
import FormSelect from "../../common/FormSelect";
import FormTextarea from "../../common/FormTextarea";

const CourseBasicsSection = ({ courseData, categories, handleInputChange }) => {
  return (
    <FormSection 
      title="Course Basics" 
      icon={<BookOpen className="w-5 h-5 mr-2 text-blue-600" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Course Title"
          name="title"
          value={courseData.title}
          onChange={handleInputChange}
          required
          placeholder="Enter course title"
        />

        <FormSelect
          label="Category"
          name="category"
          value={courseData.category}
          onChange={handleInputChange}
          required
          options={[
            { value: "", label: "Select category" },
            ...categories.map(cat => ({ value: cat._id, label: cat.name }))
          ]}
        />
      </div>

      <FormTextarea
        label="Course Description"
        name="description"
        value={courseData.description}
        onChange={handleInputChange}
        rows={4}
        required
        placeholder="Describe your course..."
      />
    </FormSection>
  );
};

export default CourseBasicsSection;