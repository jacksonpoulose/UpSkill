// File: MentorRegistrationForm.jsx
import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';   
import { toast } from 'react-toastify';      

import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Clock, 
  Briefcase, 
  Award, 
  Linkedin, 
  FileText,
  User
} from 'lucide-react';

const MentorRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    expertiseAreas: [],
    bio: '',
    linkedinProfile: '',
    yearsOfExperience: 0,
    availability: {
      weeklyHours: 5,
      preferredSlots: []
    },
    certifications: []
  });
  const [errors, setErrors] = useState({});

  const expertiseOptions = [
    'Web Development', 'Mobile Development', 'Machine Learning', 'Data Science', 
    'UI/UX Design', 'DevOps', 'Cloud Computing', 'Cybersecurity', 'Blockchain', 'Game Development'
  ];

  const timeSlots = [
    'Weekday Mornings', 'Weekday Afternoons', 'Weekday Evenings', 
    'Weekend Mornings', 'Weekend Afternoons', 'Weekend Evenings'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value, 10) || 0;
    setFormData(prev => ({ ...prev, [name]: numValue }));
  };

  const handleExpertiseToggle = (area) => {
    setFormData(prev => {
      const updated = prev.expertiseAreas.includes(area)
        ? prev.expertiseAreas.filter(a => a !== area)
        : [...prev.expertiseAreas, area];
      return { ...prev, expertiseAreas: updated };
    });
    if (errors.expertiseAreas) setErrors(prev => ({ ...prev, expertiseAreas: undefined }));
  };

  const handleTimeSlotToggle = (slot) => {
    setFormData(prev => {
      const updated = prev.availability.preferredSlots.includes(slot)
        ? prev.availability.preferredSlots.filter(s => s !== slot)
        : [...prev.availability.preferredSlots, slot];
      return { ...prev, availability: { ...prev.availability, preferredSlots: updated } };
    });
  };

  const handleAddCertification = (e) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newCert = e.currentTarget.value.trim();
      if (!formData.certifications.includes(newCert)) {
        setFormData(prev => ({ ...prev, certifications: [...prev.certifications, newCert] }));
      }
      e.currentTarget.value = '';
    }
  };

  const handleRemoveCertification = (cert) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c !== cert)
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1) {
      if (formData.expertiseAreas.length === 0) newErrors.expertiseAreas = 'Please select at least one area';
      if (!formData.bio || formData.bio.length < 50) newErrors.bio = 'Bio must be at least 50 characters';
    } else if (currentStep === 2) {
      if (!formData.linkedinProfile.includes('linkedin.com/')) newErrors.linkedinProfile = 'Invalid LinkedIn URL';
      if (formData.yearsOfExperience <= 0) newErrors.yearsOfExperience = 'Experience must be > 0';
    } else if (currentStep === 3) {
      if (formData.availability.preferredSlots.length === 0) newErrors.availability = 'Select at least one slot';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => validateStep() && setCurrentStep(prev => prev + 1);
  const handlePrevious = () => setCurrentStep(prev => prev - 1);


const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateStep()) return;

  try {
    // ✅ hit your protected endpoint
    const { data } = await axiosInstance.post(
      '/user/mentorregistration',      // << route defined below
      formData
    );
    toast.success(data.message || 'Application submitted!');
    // optional: redirect or reset
    setCurrentStep(1);
    setFormData(initialState);  // extract the object you used in useState
  } catch (err) {
    console.error(err);
    /* server may respond with { message: '…' } */
    const msg =
      err?.response?.data?.message || 'Something went wrong. Try again.';
    toast.error(msg);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg transition-all duration-500">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Become a Mentor
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Share your knowledge and help others grow in their career
          </p>
        </div>
        
        {/* Progress Indicator */}
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between">
            <div className={`text-xs ${currentStep >= 1 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>Profile</div>
            <div className={`text-xs ${currentStep >= 2 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>Experience</div>
            <div className={`text-xs ${currentStep >= 3 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>Availability</div>
            <div className={`text-xs ${currentStep >= 4 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>Review</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Step 1: Basic Profile */}
          {currentStep === 1 && (
            <div className="space-y-6 transition-opacity duration-500">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Areas of Expertise
                </label>
                {errors.expertiseAreas && (
                  <p className="text-red-500 text-xs mt-1">{errors.expertiseAreas}</p>
                )}
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {expertiseOptions.map(area => (
                    <div 
                      key={area}
                      onClick={() => handleExpertiseToggle(area)}
                      className={`
                        px-4 py-2 rounded-md text-sm cursor-pointer transition-all duration-300
                        ${formData.expertiseAreas.includes(area) 
                          ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                      `}
                    >
                      {area}
                      {formData.expertiseAreas.includes(area) && (
                        <Check className="w-4 h-4 ml-2 inline-block" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Professional Bio
                </label>
                {errors.bio && (
                  <p className="text-red-500 text-xs mt-1">{errors.bio}</p>
                )}
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
                  placeholder="Tell us about your professional background and teaching experience..."
                />
                <p className="mt-1 text-xs text-gray-500">
                  {formData.bio.length}/300 characters (minimum 50)
                </p>
              </div>
            </div>
          )}
          
          {/* Step 2: Experience */}
          {currentStep === 2 && (
            <div className="space-y-6 transition-opacity duration-500">
              <div>
                <label htmlFor="linkedinProfile" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn Profile
                </label>
                {errors.linkedinProfile && (
                  <p className="text-red-500 text-xs mt-1">{errors.linkedinProfile}</p>
                )}
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="linkedinProfile"
                    id="linkedinProfile"
                    value={formData.linkedinProfile}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
                    placeholder="https://www.linkedin.com/in/your-profile"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Years of Experience
                </label>
                {errors.yearsOfExperience && (
                  <p className="text-red-500 text-xs mt-1">{errors.yearsOfExperience}</p>
                )}
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="yearsOfExperience"
                    id="yearsOfExperience"
                    min="0"
                    value={formData.yearsOfExperience}
                    onChange={handleNumberChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Certifications & Qualifications
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
                    placeholder="Type a certification and press Enter"
                    onKeyDown={handleAddCertification}
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.certifications.map(cert => (
                    <div 
                      key={cert} 
                      className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full flex items-center"
                    >
                      {cert}
                      <button 
                        type="button"
                        onClick={() => handleRemoveCertification(cert)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Availability */}
          {currentStep === 3 && (
            <div className="space-y-6 transition-opacity duration-500">
              <div>
                <label htmlFor="weeklyHours" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Weekly Hours Available
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="range"
                    name="weeklyHours"
                    id="weeklyHours"
                    min="1"
                    max="20"
                    value={formData.availability.weeklyHours}
                    onChange={(e) => {
                      const hours = parseInt(e.target.value, 10);
                      setFormData(prev => ({
                        ...prev,
                        availability: {
                          ...prev.availability,
                          weeklyHours: hours
                        }
                      }));
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-center mt-2 text-sm font-medium text-gray-700">
                    {formData.availability.weeklyHours} hours per week
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Preferred Time Slots
                </label>
                {errors.availability && (
                  <p className="text-red-500 text-xs mt-1">{errors.availability}</p>
                )}
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {timeSlots.map(slot => (
                    <div 
                      key={slot}
                      onClick={() => handleTimeSlotToggle(slot)}
                      className={`
                        px-4 py-2 rounded-md text-sm cursor-pointer transition-all duration-300 text-center
                        ${formData.availability.preferredSlots.includes(slot) 
                          ? 'bg-blue-500 text-white shadow-md' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                      `}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6 transition-opacity duration-500">
              <h3 className="text-lg font-medium text-gray-900">Review Your Information</h3>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </h4>
                <div className="ml-6 text-sm">
                  <p className="font-medium text-gray-700">Areas of Expertise:</p>
                  <div className="flex flex-wrap gap-1 mt-1 mb-3">
                    {formData.expertiseAreas.map(area => (
                      <span key={area} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {area}
                      </span>
                    ))}
                  </div>
                  
                  <p className="font-medium text-gray-700">Bio:</p>
                  <p className="text-gray-600 mt-1 mb-3">{formData.bio}</p>
                </div>
                
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Experience
                </h4>
                <div className="ml-6 text-sm">
                  <p className="font-medium text-gray-700">LinkedIn:</p>
                  <p className="text-blue-600 underline mt-1 mb-3">
                    <a href={formData.linkedinProfile} target="_blank" rel="noopener noreferrer">
                      {formData.linkedinProfile}
                    </a>
                  </p>
                  
                  <p className="font-medium text-gray-700">Years of Experience:</p>
                  <p className="text-gray-600 mt-1 mb-3">{formData.yearsOfExperience} years</p>
                  
                  <p className="font-medium text-gray-700">Certifications:</p>
                  <div className="flex flex-wrap gap-1 mt-1 mb-3">
                    {formData.certifications.length > 0 ? (
                      formData.certifications.map(cert => (
                        <span key={cert} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {cert}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">None provided</span>
                    )}
                  </div>
                </div>
                
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Availability
                </h4>
                <div className="ml-6 text-sm">
                  <p className="font-medium text-gray-700">Weekly Hours:</p>
                  <p className="text-gray-600 mt-1 mb-3">{formData.availability.weeklyHours} hours</p>
                  
                  <p className="font-medium text-gray-700">Preferred Time Slots:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {formData.availability.preferredSlots.map(slot => (
                      <span key={slot} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                <p>By submitting this form, you agree to our mentor guidelines and code of conduct.</p>
              </div>
            </div>
          )}
          
          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-auto transition-all duration-300"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ml-auto transition-all duration-300"
              >
                Submit Application
                <Check className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorRegistrationForm;