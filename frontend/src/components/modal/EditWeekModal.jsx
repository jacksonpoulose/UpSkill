import React, { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import Button from "../common/Button";
import axiosInstance from "../../services/axiosInstance";

const EditWeekModal = ({ isOpen, onClose, onWeekUpdated, week }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [weekData, setWeekData] = useState({
    weekNumber: 1,
    title: "",
    objectives: [""],
    tasks: [{ title: "", description: "", resources: [""], isMandatory: true }],
    reviewNotes: ""
  });

  useEffect(() => {
    if (week) {
      setWeekData({
        weekNumber: week.weekNumber,
        title: week.title,
        objectives: week.objectives && week.objectives.length > 0 ? week.objectives : [""],
        tasks: week.tasks && week.tasks.length > 0 
          ? week.tasks.map(task => ({
              ...task,
              resources: task.resources && task.resources.length > 0 ? task.resources : [""]
            }))
          : [{ title: "", description: "", resources: [""], isMandatory: true }],
        reviewNotes: week.reviewNotes || ""
      });
    }
  }, [week]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWeekData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addObjective = () => {
    setWeekData(prev => ({
      ...prev,
      objectives: [...prev.objectives, ""]
    }));
  };

  const removeObjective = (index) => {
    setWeekData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }));
  };

  const updateObjective = (index, value) => {
    setWeekData(prev => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => i === index ? value : obj)
    }));
  };

  const addTask = () => {
    setWeekData(prev => ({
      ...prev,
      tasks: [...prev.tasks, { title: "", description: "", resources: [""], isMandatory: true }]
    }));
  };

  const removeTask = (index) => {
    setWeekData(prev => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index)
    }));
  };

  const updateTask = (index, field, value) => {
    setWeekData(prev => ({
      ...prev,
      tasks: prev.tasks.map((task, i) => 
        i === index ? { ...task, [field]: value } : task
      )
    }));
  };

  const addTaskResource = (taskIndex) => {
    setWeekData(prev => ({
      ...prev,
      tasks: prev.tasks.map((task, i) => 
        i === taskIndex ? { ...task, resources: [...task.resources, ""] } : task
      )
    }));
  };

  const removeTaskResource = (taskIndex, resourceIndex) => {
    setWeekData(prev => ({
      ...prev,
      tasks: prev.tasks.map((task, i) => 
        i === taskIndex 
          ? { ...task, resources: task.resources.filter((_, ri) => ri !== resourceIndex) }
          : task
      )
    }));
  };

  const updateTaskResource = (taskIndex, resourceIndex, value) => {
    setWeekData(prev => ({
      ...prev,
      tasks: prev.tasks.map((task, i) => 
        i === taskIndex 
          ? { 
              ...task, 
              resources: task.resources.map((res, ri) => ri === resourceIndex ? value : res)
            }
          : task
      )
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!weekData.title.trim()) newErrors.title = "Week title is required";
    if (!weekData.weekNumber || weekData.weekNumber < 1) newErrors.weekNumber = "Valid week number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      // Clean up data before sending
      const cleanedData = {
        ...weekData,
        objectives: weekData.objectives.filter(obj => obj.trim() !== ""),
        tasks: weekData.tasks
          .filter(task => task.title.trim() !== "")
          .map(task => ({
            ...task,
            resources: task.resources.filter(res => res.trim() !== "")
          }))
      };

      const response = await axiosInstance.put(`/admin/syllabus/${week._id}`, cleanedData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      onWeekUpdated(response.data.week);
      onClose();
    } catch (error) {
      console.error("Error updating week:", error);
      setErrors({ submit: "Failed to update week" });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Edit Week</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Week Number
              </label>
              <input
                type="number"
                name="weekNumber"
                value={weekData.weekNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                required
              />
              {errors.weekNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.weekNumber}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Week Title
              </label>
              <input
                type="text"
                name="title"
                value={weekData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
          </div>

          {/* Learning Objectives */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Learning Objectives
            </label>
            <div className="space-y-2">
              {weekData.objectives.map((objective, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={objective}
                    onChange={(e) => updateObjective(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add learning objective"
                  />
                  {weekData.objectives.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeObjective(index)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addObjective}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
              >
                <Plus size={16} />
                <span>Add objective</span>
              </button>
            </div>
          </div>

          {/* Tasks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tasks & Assignments
            </label>
            <div className="space-y-4">
              {weekData.tasks.map((task, taskIndex) => (
                <div key={taskIndex} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Task {taskIndex + 1}</h4>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={task.isMandatory}
                          onChange={(e) => updateTask(taskIndex, 'isMandatory', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Mandatory</span>
                      </label>
                      {weekData.tasks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTask(taskIndex)}
                          className="p-1 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Task Title
                      </label>
                      <input
                        type="text"
                        value={task.title}
                        onChange={(e) => updateTask(taskIndex, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Task title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={task.description}
                        onChange={(e) => updateTask(taskIndex, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={2}
                        placeholder="Task description"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resources
                    </label>
                    <div className="space-y-2">
                      {task.resources.map((resource, resourceIndex) => (
                        <div key={resourceIndex} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={resource}
                            onChange={(e) => updateTaskResource(taskIndex, resourceIndex, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Resource link or reference"
                          />
                          {task.resources.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTaskResource(taskIndex, resourceIndex)}
                              className="p-2 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addTaskResource(taskIndex)}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
                      >
                        <Plus size={16} />
                        <span>Add resource</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addTask}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Task</span>
              </button>
            </div>
          </div>

          {/* Review Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review Notes
            </label>
            <textarea
              name="reviewNotes"
              value={weekData.reviewNotes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Add review notes for this week..."
            />
          </div>

          {errors.submit && (
            <p className="text-red-500 text-sm">{errors.submit}</p>
          )}

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="blue"
              loading={loading}
              className="flex-1"
            >
              Update Week
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWeekModal;