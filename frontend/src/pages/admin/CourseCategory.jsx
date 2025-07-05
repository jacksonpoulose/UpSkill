import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Button from "../../components/common/Button";
import AddCategoryModal from "../../components/modal/AddCategoryModal";
import EditCategoryModal from "../../components/modal/EditCategoryModal";
import Notification from "../../components/common/Notification";
import { Plus, Search, Edit2 } from "lucide-react";
import axiosInstance from "../../services/axiosInstance";

const CourseCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [notification, setNotification] = useState({
    type: "success",
    message: "",
    isVisible: false,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/category");
      setCategories(res.data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      showNotification("error", "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    setIsAddModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleCategoryAdded = (newCategory) => {
    setCategories((prev) => [newCategory, ...prev]);
    showNotification("success", "Category added successfully");
  };

  const handleCategoryUpdated = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat._id === updatedCategory._id ? updatedCategory : cat
      )
    );
    showNotification("success", "Category updated successfully");
  };

  const showNotification = (type, message) => {
    setNotification({
      type,
      message,
      isVisible: true,
    });
  };

  const toggleCategoryStatus = async (categoryId) => {
    try {
      const res = await axiosInstance.patch(`/admin/category/${categoryId}/toggle`);
      const updated = res.data.category;

      setCategories((prev) =>
        prev.map((cat) => (cat._id === updated._id ? updated : cat))
      );

      showNotification("success", `Category ${updated.isActive ? "listed" : "unlisted"} successfully`);
    } catch (error) {
      console.error("Failed to toggle category status:", error);
      showNotification("error", "Failed to update category status");
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Course Categories</h1>
            <p className="text-gray-600">Manage course categories like Web, Mobile etc.</p>
          </div>
          <Button
            variant="blue"
            className="flex items-center space-x-2"
            onClick={handleAddCategory}
          >
            <Plus size={20} />
            <span>Add Category</span>
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-500 mb-4"></div>
              <p>Loading categories...</p>
            </div>
          ) : filteredCategories.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCategories.map((cat) => (
                    <tr key={cat._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {cat.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cat.description || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded font-semibold ${
                            cat.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {cat.isActive ? "Listed" : "Unlisted"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleEditCategory(cat)}
                            className="text-gray-600 hover:text-blue-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                            aria-label={`Edit ${cat.name}`}
                          >
                            <Edit2 size={18} />
                          </button>
                          <Button
                            variant={cat.isActive ? "red" : "green"}
                            size="sm"
                            onClick={() => toggleCategoryStatus(cat._id)}
                          >
                            {cat.isActive ? "Unlist" : "List"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="mb-4 text-gray-400">
                <Search size={48} className="mx-auto opacity-40" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? `No results found for "${searchQuery}"`
                  : "There are no categories added yet. Create your first category!"}
              </p>
              {!searchQuery && (
                <Button
                  variant="blue"
                  className="inline-flex items-center space-x-2"
                  onClick={handleAddCategory}
                >
                  <Plus size={18} />
                  <span>Add Your First Category</span>
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCategoryAdded={handleCategoryAdded}
      />

      {selectedCategory && (
        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedCategory(null);
          }}
          onCategoryUpdated={handleCategoryUpdated}
          category={selectedCategory}
        />
      )}

      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={() =>
          setNotification((prev) => ({ ...prev, isVisible: false }))
        }
      />
    </div>
  );
};

export default CourseCategory;
