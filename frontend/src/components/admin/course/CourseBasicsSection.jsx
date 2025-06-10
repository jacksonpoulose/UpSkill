import React from "react";
import { BookOpen } from "lucide-react";
import FormSection from "./FormSection"; 
import FormInput from "../../common/FormInput";
import FormSelect from "../../common/FormSelect";
import FormTextarea from "../../common/FormTextarea";


const CourseBasicsSection = ({ courseData, categories, handleInputChange, errors }) => {
  return (
    <FormSection title="Course Basics" icon={<BookOpen className="w-5 h-5 mr-2 text-blue-600" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Course Title"
          name="title"
          value={courseData.title}
          onChange={handleInputChange}
          placeholder="Enter course title"
          error={errors.title}
        />

        <FormSelect
          label="Category"
          name="category"
          value={courseData.category}
          onChange={handleInputChange}
          options={[
            { value: "", label: "Select category" },
            ...categories.map(cat => ({ value: cat._id, label: cat.name })),
          ]}
          error={errors.category}
        />
      </div>

      <FormTextarea
        label="Course Description"
        name="description"
        value={courseData.description}
        onChange={handleInputChange}
        rows={4}
        placeholder="Describe your course..."
        error={errors.description}
      />
    </FormSection>
  );
};

export default CourseBasicsSection;