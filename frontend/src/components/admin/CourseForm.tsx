import React, { useState } from 'react';
import { XCircle, Plus, Save } from 'lucide-react';
import { Course, Week } from '../../types';
import Button from '../common/Button';

interface CourseFormProps {
  initialData?: Partial<Course>;
  onSubmit: (data: Partial<Course>) => void;
  isSubmitting: boolean;
}

const CourseForm: React.FC<CourseFormProps> = ({
  initialData = {},
  onSubmit,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState<Partial<Course>>({
    title: '',
    description: '',
    category: 'Web Development',
    thumbnail: '',
    duration: 8,
    price: 99.99,
    syllabus: [],
    ...initialData,
  });
  
  const [newWeek, setNewWeek] = useState<Partial<Week>>({
    weekNumber: (formData.syllabus?.length || 0) + 1,
    title: '',
    description: '',
    syllabusPdf: '',
  });
  
  const categories = [
    'Web Development',
    'Data Science',
    'AI and Machine Learning',
    'Data Visualization',
    'Mobile Development',
    'DevOps',
    'Blockchain',
    'Game Development',
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'duration' ? parseFloat(value) : value,
    });
  };
  
  const handleNewWeekChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewWeek({
      ...newWeek,
      [name]: name === 'weekNumber' ? parseInt(value) : value,
    });
  };
  
  const addWeek = () => {
    if (!newWeek.title || !newWeek.description) return;
    
    const updatedSyllabus = [...(formData.syllabus || []), newWeek as Week];
    
    setFormData({
      ...formData,
      syllabus: updatedSyllabus,
    });
    
    setNewWeek({
      weekNumber: updatedSyllabus.length + 1,
      title: '',
      description: '',
      syllabusPdf: '',
    });
  };
  
  const removeWeek = (weekNumber: number) => {
    if (!formData.syllabus) return;
    
    // Filter out the week to remove
    const updatedSyllabus = formData.syllabus.filter(
      (week) => week.weekNumber !== weekNumber
    );
    
    // Re-number remaining weeks
    const reorderedSyllabus = updatedSyllabus.map((week, index) => ({
      ...week,
      weekNumber: index + 1,
    }));
    
    setFormData({
      ...formData,
      syllabus: reorderedSyllabus,
    });
    
    // Update the new week number
    setNewWeek({
      ...newWeek,
      weekNumber: reorderedSyllabus.length + 1,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-admin-500 focus:border-admin-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-admin-500 focus:border-admin-500"
            required
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-admin-500 focus:border-admin-500"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thumbnail URL
          </label>
          <input
            type="url"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-admin-500 focus:border-admin-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration (weeks)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            max="52"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-admin-500 focus:border-admin-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-admin-500 focus:border-admin-500"
            required
          />
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Course Syllabus</h3>
        
        {/* Existing Weeks */}
        {formData.syllabus && formData.syllabus.length > 0 && (
          <div className="space-y-4 mb-6">
            {formData.syllabus.map((week) => (
              <div 
                key={week.weekNumber} 
                className="p-4 border border-gray-200 rounded-md bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-admin-100 text-admin-800 text-sm mr-2">
                        {week.weekNumber}
                      </span>
                      <h4 className="font-medium">{week.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{week.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeWeek(week.weekNumber)}
                    className="text-gray-400 hover:text-error-500"
                  >
                    <XCircle size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Add New Week */}
        <div className="p-4 border border-dashed border-gray-300 rounded-md bg-gray-50">
          <h4 className="font-medium mb-3">Add Week {newWeek.weekNumber}</h4>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Week Title
              </label>
              <input
                type="text"
                name="title"
                value={newWeek.title}
                onChange={handleNewWeekChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-admin-500 focus:border-admin-500"
                placeholder="e.g., Introduction to HTML & CSS"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Week Description
              </label>
              <textarea
                name="description"
                value={newWeek.description}
                onChange={handleNewWeekChange}
                rows={2}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-admin-500 focus:border-admin-500"
                placeholder="Brief overview of what will be covered this week"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Syllabus PDF URL (optional)
              </label>
              <input
                type="url"
                name="syllabusPdf"
                value={newWeek.syllabusPdf}
                onChange={handleNewWeekChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-admin-500 focus:border-admin-500"
                placeholder="https://example.com/syllabus-week-1.pdf"
              />
            </div>
          </div>
          
          <div className="mt-3">
            <Button
              type="button"
              variant="admin"
              size="sm"
              leftIcon={<Plus size={16} />}
              onClick={addWeek}
              disabled={!newWeek.title || !newWeek.description}
            >
              Add Week
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button
          type="submit"
          variant="admin"
          isLoading={isSubmitting}
          leftIcon={<Save size={18} />}
        >
          {initialData._id ? 'Update Course' : 'Create Course'}
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;