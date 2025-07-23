import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Target,
  BookOpen,
  Shield,
  Plus,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Github,
  FileText,
  ExternalLink
} from 'lucide-react';

const StudentRegistrationForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    learningGoals: '',
    skillLevel: 'Beginner',
    guardianName: '',
    guardianPhoneNumber: '',
    guardianRelationship: '',
    resumeLink: '',
    githubLink: '',
    portfolioLink: '',
    guardianEmail: '',
  });

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setUserData(user);
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        country: user.country || '',
        zipCode: user.zipCode || '',
        course: course?._id || id || ''  // 👈 IMPORTANT LINE
      }));
    } catch (err) {
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
  
    try {
      const payload = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipCode: formData.zipCode,
        learningGoals: formData.learningGoals,
        skillLevel: formData.skillLevel,
        resumeLink: formData.resumeLink,
        githubLink: formData.githubLink,
        portfolioLink: formData.portfolioLink,
        guardianName: formData.guardianName,
        guardianPhoneNumber: formData.guardianPhoneNumber,
        guardianEmail: formData.guardianEmail,
        guardianRelationship: formData.guardianRelationship,
        enrolledCourses: [formData.course],
      };
  
      const registrationResponse = await axiosInstance.post("/user/studentregistration", payload);
  
      if (registrationResponse.status === 201) {
        // ✅ Initiate Stripe payment after successful registration
        const paymentResponse = await axiosInstance.post('/user/create-payment-intent', {
          courseId: formData.course,
        });
  
        const checkoutUrl = paymentResponse.data.url;
  
        if (checkoutUrl) {
          window.location.href = checkoutUrl; // 🔁 Redirect to Stripe Checkout
        } else {
          setError("Checkout URL not received from server.");
        }
      } else {
        setError(registrationResponse.data.message || "Unexpected error during registration");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to submit registration");
    } finally {
      setSubmitting(false);
    }
  };
  
  
  

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full mx-4 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your student registration has been submitted successfully. Welcome to our learning platform!
          </p>
          <button 
            onClick={() => navigate('/student/dashboard')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Student Registration</h1>
            <p className="text-blue-100 mt-2">Join our learning community and start your educational journey</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      value={userData?.email || formData.email}
                      disabled
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Learning Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Learning Information
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Learning Goals *</label>
                <textarea
                  name="learningGoals"
                  value={formData.learningGoals}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  placeholder="Describe what you hope to achieve through this program..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Skill Level *</label>
                  <select
                    name="skillLevel"
                    value={formData.skillLevel}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    {skillLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resume Link</label>
                  <div className="relative">
                    <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="url"
                      name="resumeLink"
                      value={formData.resumeLink}
                      onChange={handleInputChange}
                      placeholder="https://your-resume-link.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
                  <div className="relative">
                    <Github className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="url"
                      name="githubLink"
                      value={formData.githubLink}
                      onChange={handleInputChange}
                      placeholder="https://github.com/yourusername"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Link</label>
                  <div className="relative">
                    <ExternalLink className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="url"
                      name="portfolioLink"
                      value={formData.portfolioLink}
                      onChange={handleInputChange}
                      placeholder="https://your-portfolio.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Guardian Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Name *</label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Phone *</label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      name="guardianPhoneNumber"
                      value={formData.guardianPhoneNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Email</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      name="guardianEmail"
                      value={formData.guardianEmail}
                      onChange={handleInputChange}
                      placeholder="guardian@example.com (optional)"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                  <input
                    type="text"
                    name="guardianRelationship"
                    value={formData.guardianRelationship}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Parent, Guardian, Spouse"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting Registration...
                  </>
                ) : (
                  'Submit Student Registration'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;
