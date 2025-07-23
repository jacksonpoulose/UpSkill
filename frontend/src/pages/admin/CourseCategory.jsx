import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Button from "../../components/common/Button";
import AddCategoryModal from "../../components/modal/AddCategoryModal";
import EditCategoryModal from "../../components/modal/EditCategoryModal";
import Notification from "../../components/common/Notification";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { 
  Plus, 
  Search, 
  Edit2, 
  Tag, 
  TrendingUp, 
  Eye, 
  MoreVertical,
  CheckCircle,
  XCircle,
  Activity,
  BarChart3,
  Filter,
  Grid3X3,
  List,
  Folder,
  Hash
} from "lucide-react";
import axiosInstance from "../../services/axiosInstance";

const CourseCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'inactive'
  
  // Confirmation modal state
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [categoryToToggle, setCategoryToToggle] = useState(null);
  
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

  // Open confirmation modal for status toggle
  const openToggleConfirmation = (category) => {
    setCategoryToToggle(category);
    setIsConfirmModalOpen(true);
  };

  // Confirm status toggle
  const confirmToggleCategoryStatus = async () => {
    if (!categoryToToggle) return;

    try {
      const res = await axiosInstance.patch(`/admin/category/${categoryToToggle._id}/toggle`);
      const updated = res.data.category;

      setCategories((prev) =>
        prev.map((cat) => (cat._id === updated._id ? updated : cat))
      );

      showNotification("success", `Category "${updated.name}" ${updated.isActive ? "listed" : "unlisted"} successfully`);
    } catch (error) {
      console.error("Failed to toggle category status:", error);
      showNotification("error", "Failed to update category status");
    } finally {
      setIsConfirmModalOpen(false);
      setCategoryToToggle(null);
    }
  };

  // Cancel status toggle
  const cancelToggleCategoryStatus = () => {
    setIsConfirmModalOpen(false);
    setCategoryToToggle(null);
  };

  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && cat.isActive) ||
      (statusFilter === 'inactive' && !cat.isActive);
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (isActive) => {
    return isActive ? (
      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
        <CheckCircle className="mr-2 h-4 w-4" />
        Listed
      </span>
    ) : (
      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
        <XCircle className="mr-2 h-4 w-4" />
        Unlisted
      </span>
    );
  };

  const getCategoryIcon = (categoryName) => {
    // You can customize icons based on category names
    const iconMap = {
      'web': '🌐',
      'mobile': '📱',
      'design': '🎨',
      'data': '📊',
      'ai': '🤖',
      'cloud': '☁️',
      'security': '🔒',
      'devops': '⚙️'
    };
    
    const key = categoryName.toLowerCase();
    return iconMap[key] || '📁';
  };

  const stats = {
    total: categories.length,
    active: categories.filter(cat => cat.isActive).length,
    inactive: categories.filter(cat => !cat.isActive).length,
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 overflow-auto flex justify-center items-center">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-600 mb-6"></div>
              <div className="absolute inset-0 rounded-full h-12 w-12 border-4 border-transparent border-t-blue-400 animate-ping"></div>
            </div>
            <p className="text-slate-600 font-medium">Loading categories...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Sidebar />

      <main className="flex-1 ml-64 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Course Categories</h1>
                <p className="text-slate-600">Organize and manage your course categories</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === 'table' 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <List size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Grid3X3 size={18} />
                  </button>
                </div>
                <Button
                  variant="blue"
                  className="inline-flex items-center"
                  onClick={handleAddCategory}
                >
                  <Plus size={18} className="mr-2" />
                  Add Category
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Categories</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <Folder className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Categories</p>
                  <p className="text-2xl font-bold text-emerald-600">{stats.active}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Inactive Categories</p>
                  <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 mb-8">
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="pl-10 pr-8 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-700 min-w-[140px]"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active Only</option>
                      <option value="inactive">Inactive Only</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            {filteredCategories.length > 0 ? (
              viewMode === 'table' ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {filteredCategories.map((cat) => (
                        <tr key={cat._id} className="hover:bg-slate-50 transition-colors duration-200">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center text-lg mr-4">
                                {getCategoryIcon(cat.name)}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-slate-900">{cat.name}</div>
                                <div className="text-xs text-slate-500">Category</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-slate-600 max-w-xs">
                              {cat.description || (
                                <span className="italic text-slate-400">No description provided</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(cat.isActive)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleEditCategory(cat)}
                                className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                                aria-label={`Edit ${cat.name}`}
                              >
                                <Edit2 size={16} />
                              </button>
                              <Button
                                variant={cat.isActive ? "red" : "green"}
                                size="sm"
                                onClick={() => openToggleConfirmation(cat)}
                                className="text-xs"
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
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCategories.map((cat) => (
                      <div key={cat._id} className="bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-200 group">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center text-xl mr-4">
                              {getCategoryIcon(cat.name)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                                {cat.name}
                              </h3>
                              <p className="text-xs text-slate-500">Category</p>
                            </div>
                          </div>
                          <button className="p-1 rounded-lg text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all duration-200">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                        
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                          {cat.description || "No description provided"}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          {getStatusBadge(cat.isActive)}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditCategory(cat)}
                              className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                            >
                              <Edit2 size={14} />
                            </button>
                            <Button
                              variant={cat.isActive ? "red" : "green"}
                              size="sm"
                              onClick={() => openToggleConfirmation(cat)}
                              className="text-xs px-3 py-1"
                            >
                              {cat.isActive ? "Unlist" : "List"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {searchQuery || statusFilter !== 'all' ? (
                    <Search size={32} className="text-slate-400" />
                  ) : (
                    <Tag size={32} className="text-slate-400" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {searchQuery || statusFilter !== 'all' ? 'No categories found' : 'No categories yet'}
                </h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  {searchQuery || statusFilter !== 'all'
                    ? `No categories match your current search and filter criteria.`
                    : "Get started by creating your first course category to organize your content effectively."}
                </p>
                {(!searchQuery && statusFilter === 'all') && (
                  <Button
                    variant="blue"
                    className="inline-flex items-center"
                    onClick={handleAddCategory}
                  >
                    <Plus size={18} className="mr-2" />
                    Create Your First Category
                  </Button>
                )}
              </div>
            )}
          </div>
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

      {/* Confirmation Modal for Status Toggle */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        title={`${categoryToToggle?.isActive ? 'Unlist' : 'List'} Category`}
        message={`Are you sure you want to ${categoryToToggle?.isActive ? 'unlist' : 'list'} this category?`}
        itemName={categoryToToggle?.name}
        confirmLabel={categoryToToggle?.isActive ? 'Unlist Category' : 'List Category'}
        cancelLabel="Cancel"
        onConfirm={confirmToggleCategoryStatus}
        onCancel={cancelToggleCategoryStatus}
        variant={categoryToToggle?.isActive ? 'warning' : 'success'}
      />

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