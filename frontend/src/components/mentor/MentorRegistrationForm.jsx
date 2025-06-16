import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Loader2,
  Clock,
  Briefcase,
  Award,
  Linkedin,
  FileText,
  User,
  CheckCircle,
  Sparkles,
  GraduationCap
} from "lucide-react";
import { toast } from "react-toastify";

const MentorRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const [formData, setFormData] = useState({
    expertiseAreas: [],
    bio: "",
    linkedinProfile: "",
    yearsOfExperience: "",
    availability: {
      weeklyHours: 5,
      preferredSlots: [],
    },
    certifications: [],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const expertiseOptions = [
    "Web Development",
    "Mobile Development",
    "Machine Learning",
    "Data Science",
    "UI/UX Design",
    "DevOps",
    "Cloud Computing",
    "Cybersecurity",
    "Blockchain",
    "Game Development",
  ];

  const timeSlots = [
    "Weekday Mornings",
    "Weekday Afternoons",
    "Weekday Evenings",
    "Weekend Mornings",
    "Weekend Afternoons",
    "Weekend Evenings",
  ];

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.bio || formData.bio.length < 50)
        newErrors.bio = "Bio must be at least 50 characters";
      if (formData.expertiseAreas.length === 0)
        newErrors.expertiseAreas = "Select at least one area";
    } else if (currentStep === 2) {
      if (!formData.linkedinProfile.includes("linkedin.com"))
        newErrors.linkedinProfile = "Invalid LinkedIn URL";
      if (Number(formData.yearsOfExperience) <= 0)
        newErrors.yearsOfExperience = "Experience must be more than 0";
    } else if (currentStep === 3) {
      if (formData.availability.preferredSlots.length === 0)
        newErrors.availability = "Select preferred slots";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "yearsOfExperience") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const toggleExpertise = (area) => {
    setFormData((prev) => {
      const list = prev.expertiseAreas.includes(area)
        ? prev.expertiseAreas.filter((a) => a !== area)
        : [...prev.expertiseAreas, area];
      return { ...prev, expertiseAreas: list };
    });
    if (errors.expertiseAreas) {
      setErrors(prev => ({ ...prev, expertiseAreas: undefined }));
    }
  };

  const toggleTimeSlot = (slot) => {
    setFormData((prev) => {
      const updated = prev.availability.preferredSlots.includes(slot)
        ? prev.availability.preferredSlots.filter((s) => s !== slot)
        : [...prev.availability.preferredSlots, slot];
      return {
        ...prev,
        availability: { ...prev.availability, preferredSlots: updated },
      };
    });
    if (errors.availability) {
      setErrors(prev => ({ ...prev, availability: undefined }));
    }
  };

  const addCertification = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const cert = e.target.value.trim();
      if (cert && !formData.certifications.includes(cert)) {
        setFormData((prev) => ({
          ...prev,
          certifications: [...prev.certifications, cert],
        }));
        e.target.value = "";
      }
    }
  };

  const removeCertification = (cert) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c !== cert),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!readyToSubmit) return;
    if (!validateStep()) return;
  
    setIsSubmitting(true);
  
    try {
      const response = await axiosInstance.post('/user/mentorregistration', formData);
      if (response.status === 201) {
        toast.success(response.data.message || 'Submitted successfully');
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
      setReadyToSubmit(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFormData({
      expertiseAreas: [],
      bio: "",
      linkedinProfile: "",
      yearsOfExperience: "",
      availability: {
        weeklyHours: 5,
        preferredSlots: [],
      },
      certifications: [],
    });
    setErrors({});
    setIsSubmitting(false);
    setReadyToSubmit(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl border border-red-100 text-center">
          <div className="relative">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 animate-pulse">
              <CheckCircle className="h-12 w-12 text-red-900" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-8 w-8 text-yellow-400 animate-bounce" />
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-3xl font-extrabold text-red-900 mb-2">
              Registration Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for applying to become a mentor. We've received your application and will review it within 2-3 business days.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
                <p className="text-sm text-red-800">
                  You'll receive a confirmation email shortly with next steps.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={resetForm}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-900 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
            >
              Submit Another Application
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full flex justify-center py-3 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl border border-red-100">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-900 mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-red-900 mb-2">
            Become a Mentor
          </h2>
          <p className="text-gray-600">
            Share your knowledge and help others grow in their career
          </p>
        </div>
        
        {/* Progress Indicator */}
        <div className="relative">
          <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-red-100">
            <div 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-red-900 to-red-800 transition-all duration-700 ease-in-out rounded-full"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <div className={`transition-colors duration-300 ${currentStep >= 1 ? 'text-red-900' : 'text-gray-400'}`}>Profile</div>
            <div className={`transition-colors duration-300 ${currentStep >= 2 ? 'text-red-900' : 'text-gray-400'}`}>Experience</div>
            <div className={`transition-colors duration-300 ${currentStep >= 3 ? 'text-red-900' : 'text-gray-400'}`}>Availability</div>
            <div className={`transition-colors duration-300 ${currentStep >= 4 ? 'text-red-900' : 'text-gray-400'}`}>Review</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* Step 1: Profile */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Information
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-red-900 mb-3 flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Professional Bio
                    </label>
                    {errors.bio && (
                      <p className="text-red-600 text-sm mb-2">{errors.bio}</p>
                    )}
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full border-2 border-red-200 focus:border-red-900 focus:ring-2 focus:ring-red-100 p-4 rounded-lg transition-all duration-300 resize-none"
                      rows={4}
                      placeholder="Tell us about your professional background and teaching experience..."
                    />
                    <div className="flex justify-between mt-2">
                      <p className="text-xs text-gray-500">
                        {formData.bio.length}/300 characters
                      </p>
                      <p className="text-xs text-gray-500">
                        (minimum 50 required)
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-red-900 mb-3 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Areas of Expertise
                    </label>
                    {errors.expertiseAreas && (
                      <p className="text-red-600 text-sm mb-2">{errors.expertiseAreas}</p>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {expertiseOptions.map((area) => (
                        <div
                          key={area}
                          onClick={() => toggleExpertise(area)}
                          className={`
                            px-4 py-3 rounded-lg text-sm cursor-pointer transition-all duration-300 text-center border-2 font-medium
                            ${formData.expertiseAreas.includes(area)
                              ? 'bg-red-900 text-white border-red-900 shadow-lg transform scale-105'
                              : 'bg-white text-red-900 border-red-200 hover:bg-red-50 hover:border-red-300'
                            }
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
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Experience */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Professional Experience
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-red-900 mb-2 flex items-center">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn Profile
                    </label>
                    {errors.linkedinProfile && (
                      <p className="text-red-600 text-sm mb-2">{errors.linkedinProfile}</p>
                    )}
                    <input
                      type="text"
                      name="linkedinProfile"
                      value={formData.linkedinProfile}
                      onChange={handleInputChange}
                      className="w-full border-2 border-red-200 focus:border-red-900 focus:ring-2 focus:ring-red-100 p-3 rounded-lg transition-all duration-300"
                      placeholder="https://www.linkedin.com/in/your-profile"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-red-900 mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      Years of Experience
                    </label>
                    {errors.yearsOfExperience && (
                      <p className="text-red-600 text-sm mb-2">{errors.yearsOfExperience}</p>
                    )}
                    <input
                      type="number"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                      className="w-full border-2 border-red-200 focus:border-red-900 focus:ring-2 focus:ring-red-100 p-3 rounded-lg transition-all duration-300"
                      min="0"
                      placeholder="Enter years of experience"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-red-900 mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      Certifications & Qualifications
                    </label>
                    <input
                      type="text"
                      onKeyDown={addCertification}
                      className="w-full border-2 border-red-200 focus:border-red-900 focus:ring-2 focus:ring-red-100 p-3 rounded-lg transition-all duration-300"
                      placeholder="Type a certification and press Enter to add"
                    />
                    <div className="flex flex-wrap mt-3 gap-2">
                      {formData.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="bg-red-100 text-red-900 px-3 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-red-200 transition-colors duration-200 border border-red-200"
                          onClick={() => removeCertification(cert)}
                        >
                          {cert} <span className="ml-1 text-red-600">×</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Availability */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Availability & Schedule
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-red-900 mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Weekly Hours Available
                    </label>
                    <div className="px-3">
                      <input
                        type="range"
                        name="weeklyHours"
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
                        className="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer slider-red"
                      />
                      <div className="text-center mt-3">
                        <span className="text-3xl font-bold text-red-900">
                          {formData.availability.weeklyHours}
                        </span>
                        <span className="text-sm text-gray-600 ml-1">hours per week</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-red-900 mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Preferred Time Slots
                    </label>
                    {errors.availability && (
                      <p className="text-red-600 text-sm mb-2">{errors.availability}</p>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((slot) => (
                        <div
                          key={slot}
                          onClick={() => toggleTimeSlot(slot)}
                          className={`
                            px-4 py-3 rounded-lg text-sm cursor-pointer transition-all duration-300 text-center border-2 font-medium
                            ${formData.availability.preferredSlots.includes(slot)
                              ? 'bg-red-900 text-white border-red-900 shadow-lg'
                              : 'bg-white text-red-900 border-red-200 hover:bg-red-50 hover:border-red-300'
                            }
                          `}
                        >
                          {slot}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                <h3 className="text-xl font-semibold text-red-900 mb-6 text-center flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Review Your Application
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h4 className="text-sm font-semibold text-red-900 mb-3 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Profile Information
                    </h4>
                    <div className="ml-6 space-y-3">
                      <div>
                        <p className="font-medium text-gray-700 text-sm">Bio:</p>
                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">{formData.bio}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 text-sm">Areas of Expertise:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.expertiseAreas.map(area => (
                            <span key={area} className="bg-red-100 text-red-900 text-xs px-2 py-1 rounded-full border border-red-200">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h4 className="text-sm font-semibold text-red-900 mb-3 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Experience & Credentials
                    </h4>
                    <div className="ml-6 space-y-3">
                      <div>
                        <p className="font-medium text-gray-700 text-sm">LinkedIn Profile:</p>
                        <a 
                          href={formData.linkedinProfile} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-800 text-sm underline transition-colors duration-200"
                        >
                          {formData.linkedinProfile}
                        </a>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 text-sm">Years of Experience:</p>
                        <p className="text-gray-600 text-sm">{formData.yearsOfExperience} years</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 text-sm">Certifications:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.certifications.length > 0 ? (
                            formData.certifications.map(cert => (
                              <span key={cert} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full border border-green-200">
                                {cert}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500 text-sm italic">None provided</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h4 className="text-sm font-semibold text-red-900 mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Availability
                    </h4>
                    <div className="ml-6 space-y-3">
                      <div>
                        <p className="font-medium text-gray-700 text-sm">Weekly Commitment:</p>
                        <p className="text-gray-600 text-sm">{formData.availability.weeklyHours} hours per week</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 text-sm">Preferred Time Slots:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.availability.preferredSlots.map(slot => (
                            <span key={slot} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full border border-purple-200">
                              {slot}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-100 border border-red-300 rounded-lg p-4 mt-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-red-900 font-medium">Agreement</p>
                      <p className="text-sm text-red-800 mt-1">
                        By submitting this form, you agree to our mentor guidelines, code of conduct, and commit to providing quality mentorship to students.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between pt-6 border-t border-red-200">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 border border-red-300 text-sm font-medium rounded-lg text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ml-auto transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                onClick={() => setReadyToSubmit(true)}
                disabled={isSubmitting}
                className="inline-flex items-center px-8 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ml-auto transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Check className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorRegistrationForm;