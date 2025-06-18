// import React, { useState } from "react";
// import axiosInstance from "../../api/axiosInstance";
// import { 
//   ChevronRight, 
//   ChevronLeft, 
//   Check, 
//   Loader2,
//   Clock,
//   Briefcase,
//   Award,
//   Linkedin,
//   FileText,
//   User,
//   CheckCircle,
//   Sparkles,
//   GraduationCap
// } from "lucide-react";
// import { toast } from "react-toastify";

// const MentorRegistrationForm = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [readyToSubmit, setReadyToSubmit] = useState(false);

//   const [formData, setFormData] = useState({
//     expertiseAreas: [],
//     bio: "",
//     linkedinProfile: "",
//     yearsOfExperience: "",
//     availability: {
//       weeklyHours: 5,
//       preferredSlots: [],
//     },
//     certifications: [],
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const expertiseOptions = [
//     "Web Development",
//     "Mobile Development",
//     "Machine Learning",
//     "Data Science",
//     "UI/UX Design",
//     "DevOps",
//     "Cloud Computing",
//     "Cybersecurity",
//     "Blockchain",
//     "Game Development",
//   ];

//   const timeSlots = [
//     "Weekday Mornings",
//     "Weekday Afternoons",
//     "Weekday Evenings",
//     "Weekend Mornings",
//     "Weekend Afternoons",
//     "Weekend Evenings",
//   ];

//   const validateStep = () => {
//     const newErrors = {};
//     if (currentStep === 1) {
//       if (!formData.bio || formData.bio.length < 50)
//         newErrors.bio = "Bio must be at least 50 characters";
//       if (formData.expertiseAreas.length === 0)
//         newErrors.expertiseAreas = "Select at least one area";
//     } else if (currentStep === 2) {
//       if (!formData.linkedinProfile.includes("linkedin.com"))
//         newErrors.linkedinProfile = "Invalid LinkedIn URL";
//       if (Number(formData.yearsOfExperience) <= 0)
//         newErrors.yearsOfExperience = "Experience must be more than 0";
//     } else if (currentStep === 3) {
//       if (formData.availability.preferredSlots.length === 0)
//         newErrors.availability = "Select preferred slots";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (validateStep()) setCurrentStep((prev) => prev + 1);
//   };

//   const handlePrevious = () => setCurrentStep((prev) => prev - 1);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "yearsOfExperience") {
//       setFormData((prev) => ({ ...prev, [name]: Number(value) }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//     // Clear errors when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: undefined }));
//     }
//   };

//   const toggleExpertise = (area) => {
//     setFormData((prev) => {
//       const list = prev.expertiseAreas.includes(area)
//         ? prev.expertiseAreas.filter((a) => a !== area)
//         : [...prev.expertiseAreas, area];
//       return { ...prev, expertiseAreas: list };
//     });
//     if (errors.expertiseAreas) {
//       setErrors(prev => ({ ...prev, expertiseAreas: undefined }));
//     }
//   };

//   const toggleTimeSlot = (slot) => {
//     setFormData((prev) => {
//       const updated = prev.availability.preferredSlots.includes(slot)
//         ? prev.availability.preferredSlots.filter((s) => s !== slot)
//         : [...prev.availability.preferredSlots, slot];
//       return {
//         ...prev,
//         availability: { ...prev.availability, preferredSlots: updated },
//       };
//     });
//     if (errors.availability) {
//       setErrors(prev => ({ ...prev, availability: undefined }));
//     }
//   };

//   const addCertification = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const cert = e.target.value.trim();
//       if (cert && !formData.certifications.includes(cert)) {
//         setFormData((prev) => ({
//           ...prev,
//           certifications: [...prev.certifications, cert],
//         }));
//         e.target.value = "";
//       }
//     }
//   };

//   const removeCertification = (cert) => {
//     setFormData((prev) => ({
//       ...prev,
//       certifications: prev.certifications.filter((c) => c !== cert),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!readyToSubmit) return;
//     if (!validateStep()) return;
  
//     setIsSubmitting(true);
  
//     try {
//       const response = await axiosInstance.post('/user/mentorregistration', formData);
//       if (response.status === 201) {
//         toast.success(response.data.message || 'Submitted successfully');
//         setIsSubmitted(true);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || 'Submission failed');
//     } finally {
//       setIsSubmitting(false);
//       setReadyToSubmit(false);
//     }
//   };

//   const resetForm = () => {
//     setIsSubmitted(false);
//     setCurrentStep(1);
//     setFormData({
//       expertiseAreas: [],
//       bio: "",
//       linkedinProfile: "",
//       yearsOfExperience: "",
//       availability: {
//         weeklyHours: 5,
//         preferredSlots: [],
//       },
//       certifications: [],
//     });
//     setErrors({});
//     setIsSubmitting(false);
//     setReadyToSubmit(false);
//   };

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl border border-red-100 text-center">
//           <div className="relative">
//             <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 animate-pulse">
//               <CheckCircle className="h-12 w-12 text-red-900" />
//             </div>
//             <div className="absolute -top-2 -right-2">
//               <Sparkles className="h-8 w-8 text-yellow-400 animate-bounce" />
//             </div>
//           </div>
          
//           <div className="mt-6">
//             <h2 className="text-3xl font-extrabold text-red-900 mb-2">
//               Registration Successful!
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Thank you for applying to become a mentor. We've received your application and will review it within 2-3 business days.
//             </p>
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//               <div className="flex items-center">
//                 <CheckCircle className="h-5 w-5 text-red-600 mr-2" />
//                 <p className="text-sm text-red-800">
//                   You'll receive a confirmation email shortly with next steps.
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="space-y-3">
//             <button
//               onClick={resetForm}
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-900 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
//             >
//               Submit Another Application
//             </button>
//             <button
//               onClick={() => window.location.href = '/'}
//               className="w-full flex justify-center py-3 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
//             >
//               Return to Home
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl border border-red-100">
//         <div className="text-center">
//           <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-900 mb-4">
//             <GraduationCap className="h-8 w-8 text-white" />
//           </div>
//           <h2 className="text-3xl font-extrabold text-red-900 mb-2">
//             Become a Mentor
//           </h2>
//           <p className="text-gray-600">
//             Share your knowledge and help others grow in their career
//           </p>
//         </div>
        
//         {/* Progress Indicator */}
//         <div className="relative">
//           <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-red-100">
//             <div 
//               className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-red-900 to-red-800 transition-all duration-700 ease-in-out rounded-full"
//               style={{ width: `${(currentStep / 4) * 100}%` }}
//             ></div>
//           </div>
//           <div className="flex justify-between text-sm font-medium">
//             <div className={`transition-colors duration-300 ${currentStep >= 1 ? 'text-red-900' : 'text-gray-400'}`}>Profile</div>
//             <div className={`transition-colors duration-300 ${currentStep >= 2 ? 'text-red-900' : 'text-gray-400'}`}>Experience</div>
//             <div className={`transition-colors duration-300 ${currentStep >= 3 ? 'text-red-900' : 'text-gray-400'}`}>Availability</div>
//             <div className={`transition-colors duration-300 ${currentStep >= 4 ? 'text-red-900' : 'text-gray-400'}`}>Review</div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-8">
//           {/* Step 1: Profile */}
//           {currentStep === 1 && (
//             <div className="space-y-6 animate-fadeIn">
//               <div className="bg-red-50 p-6 rounded-lg border border-red-100">
//                 <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center">
//                   <User className="w-5 h-5 mr-2" />
//                   Profile Information
//                 </h3>
                
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-red-900 mb-3 flex items-center">
//                       <FileText className="w-4 h-4 mr-2" />
//                       Professional Bio
//                     </label>
//                     {errors.bio && (
//                       <p className="text-red-600 text-sm mb-2">{errors.bio}</p>
//                     )}
//                     <textarea
//                       name="bio"
//                       value={formData.bio}
//                       onChange={handleInputChange}
//                       className="w-full border-2 border-red-200 focus:border-red-900 focus:ring-2 focus:ring-red-100 p-4 rounded-lg transition-all duration-300 resize-none"
//                       rows={4}
//                       placeholder="Tell us about your professional background and teaching experience..."
//                     />
//                     <div className="flex justify-between mt-2">
//                       <p className="text-xs text-gray-500">
//                         {formData.bio.length}/300 characters
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         (minimum 50 required)
//                       </p>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-red-900 mb-3 flex items-center">
//                       <Briefcase className="w-4 h-4 mr-2" />
//                       Areas of Expertise
//                     </label>
//                     {errors.expertiseAreas && (
//                       <p className="text-red-600 text-sm mb-2">{errors.expertiseAreas}</p>
//                     )}
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                       {expertiseOptions.map((area) => (
//                         <div
//                           key={area}
//                           onClick={() => toggleExpertise(area)}
//                           className={`
//                             px-4 py-3 rounded-lg text-sm cursor-pointer transition-all duration-300 text-center border-2 font-medium
//                             ${formData.expertiseAreas.includes(area)
//                               ? 'bg-red-900 text-white border-red-900 shadow-lg transform scale-105'
//                               : 'bg-white text-red-900 border-red-200 hover:bg-red-50 hover:border-red-300'
//                             }
//                           `}
//                         >
//                           {area}
//                           {formData.expertiseAreas.includes(area) && (
//                             <Check className="w-4 h-4 ml-2 inline-block" />
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Experience */}
//           {currentStep === 2 && (
//             <div className="space-y-6 animate-fadeIn">
//               <div className="bg-red-50 p-6 rounded-lg border border-red-100">
//                 <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center">
//                   <Briefcase className="w-5 h-5 mr-2" />
//                   Professional Experience
//                 </h3>
                
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-red-900 mb-2 flex items-center">
//                       <Linkedin className="w-4 h-4 mr-2" />
//                       LinkedIn Profile
//                     </label>
//                     {errors.linkedinProfile && (
//                       <p className="text-red-600 text-sm mb-2">{errors.linkedinProfile}</p>
//                     )}
//                     <input
//                       type="text"
//                       name="linkedinProfile"
//                       value={formData.linkedinProfile}
//                       onChange={handleInputChange}
//                       className="w-full border-2 border-red-200 focus:border-red-900 focus:ring-2 focus:ring-red-100 p-3 rounded-lg transition-all duration-300"
//                       placeholder="https://www.linkedin.com/in/your-profile"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-red-900 mb-2 flex items-center">
//                       <Award className="w-4 h-4 mr-2" />
//                       Years of Experience
//                     </label>
//                     {errors.yearsOfExperience && (
//                       <p className="text-red-600 text-sm mb-2">{errors.yearsOfExperience}</p>
//                     )}
//                     <input
//                       type="number"
//                       name="yearsOfExperience"
//                       value={formData.yearsOfExperience}
//                       onChange={handleInputChange}
//                       className="w-full border-2 border-red-200 focus:border-red-900 focus:ring-2 focus:ring-red-100 p-3 rounded-lg transition-all duration-300"
//                       min="0"
//                       placeholder="Enter years of experience"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-red-900 mb-2 flex items-center">
//                       <Award className="w-4 h-4 mr-2" />
//                       Certifications & Qualifications
//                     </label>
//                     <input
//                       type="text"
//                       onKeyDown={addCertification}
//                       className="w-full border-2 border-red-200 focus:border-red-900 focus:ring-2 focus:ring-red-100 p-3 rounded-lg transition-all duration-300"
//                       placeholder="Type a certification and press Enter to add"
//                     />
//                     <div className="flex flex-wrap mt-3 gap-2">
//                       {formData.certifications.map((cert) => (
//                         <span
//                           key={cert}
//                           className="bg-red-100 text-red-900 px-3 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-red-200 transition-colors duration-200 border border-red-200"
//                           onClick={() => removeCertification(cert)}
//                         >
//                           {cert} <span className="ml-1 text-red-600">×</span>
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 3: Availability */}
//           {currentStep === 3 && (
//             <div className="space-y-6 animate-fadeIn">
//               <div className="bg-red-50 p-6 rounded-lg border border-red-100">
//                 <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center">
//                   <Clock className="w-5 h-5 mr-2" />
//                   Availability & Schedule
//                 </h3>
                
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-red-900 mb-3 flex items-center">
//                       <Clock className="w-4 h-4 mr-2" />
//                       Weekly Hours Available
//                     </label>
//                     <div className="px-3">
//                       <input
//                         type="range"
//                         name="weeklyHours"
//                         min="1"
//                         max="20"
//                         value={formData.availability.weeklyHours}
//                         onChange={(e) => {
//                           const hours = parseInt(e.target.value, 10);
//                           setFormData(prev => ({
//                             ...prev,
//                             availability: {
//                               ...prev.availability,
//                               weeklyHours: hours
//                             }
//                           }));
//                         }}
//                         className="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer slider-red"
//                       />
//                       <div className="text-center mt-3">
//                         <span className="text-3xl font-bold text-red-900">
//                           {formData.availability.weeklyHours}
//                         </span>
//                         <span className="text-sm text-gray-600 ml-1">hours per week</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-red-900 mb-3 flex items-center">
//                       <Clock className="w-4 h-4 mr-2" />
//                       Preferred Time Slots
//                     </label>
//                     {errors.availability && (
//                       <p className="text-red-600 text-sm mb-2">{errors.availability}</p>
//                     )}
//                     <div className="grid grid-cols-2 gap-3">
//                       {timeSlots.map((slot) => (
//                         <div
//                           key={slot}
//                           onClick={() => toggleTimeSlot(slot)}
//                           className={`
//                             px-4 py-3 rounded-lg text-sm cursor-pointer transition-all duration-300 text-center border-2 font-medium
//                             ${formData.availability.preferredSlots.includes(slot)
//                               ? 'bg-red-900 text-white border-red-900 shadow-lg'
//                               : 'bg-white text-red-900 border-red-200 hover:bg-red-50 hover:border-red-300'
//                             }
//                           `}
//                         >
//                           {slot}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 4: Review */}
//           {currentStep === 4 && (
//             <div className="space-y-6 animate-fadeIn">
//               <div className="bg-red-50 p-6 rounded-lg border border-red-100">
//                 <h3 className="text-xl font-semibold text-red-900 mb-6 text-center flex items-center justify-center">
//                   <CheckCircle className="w-5 h-5 mr-2" />
//                   Review Your Application
//                 </h3>
                
//                 <div className="space-y-6">
//                   <div className="bg-white p-4 rounded-lg border border-red-200">
//                     <h4 className="text-sm font-semibold text-red-900 mb-3 flex items-center">
//                       <User className="w-4 h-4 mr-2" />
//                       Profile Information
//                     </h4>
//                     <div className="ml-6 space-y-3">
//                       <div>
//                         <p className="font-medium text-gray-700 text-sm">Bio:</p>
//                         <p className="text-gray-600 text-sm mt-1 leading-relaxed">{formData.bio}</p>
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-700 text-sm">Areas of Expertise:</p>
//                         <div className="flex flex-wrap gap-2 mt-1">
//                           {formData.expertiseAreas.map(area => (
//                             <span key={area} className="bg-red-100 text-red-900 text-xs px-2 py-1 rounded-full border border-red-200">
//                               {area}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-white p-4 rounded-lg border border-red-200">
//                     <h4 className="text-sm font-semibold text-red-900 mb-3 flex items-center">
//                       <Briefcase className="w-4 h-4 mr-2" />
//                       Experience & Credentials
//                     </h4>
//                     <div className="ml-6 space-y-3">
//                       <div>
//                         <p className="font-medium text-gray-700 text-sm">LinkedIn Profile:</p>
//                         <a 
//                           href={formData.linkedinProfile} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="text-red-600 hover:text-red-800 text-sm underline transition-colors duration-200"
//                         >
//                           {formData.linkedinProfile}
//                         </a>
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-700 text-sm">Years of Experience:</p>
//                         <p className="text-gray-600 text-sm">{formData.yearsOfExperience} years</p>
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-700 text-sm">Certifications:</p>
//                         <div className="flex flex-wrap gap-2 mt-1">
//                           {formData.certifications.length > 0 ? (
//                             formData.certifications.map(cert => (
//                               <span key={cert} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full border border-green-200">
//                                 {cert}
//                               </span>
//                             ))
//                           ) : (
//                             <span className="text-gray-500 text-sm italic">None provided</span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-white p-4 rounded-lg border border-red-200">
//                     <h4 className="text-sm font-semibold text-red-900 mb-3 flex items-center">
//                       <Clock className="w-4 h-4 mr-2" />
//                       Availability
//                     </h4>
//                     <div className="ml-6 space-y-3">
//                       <div>
//                         <p className="font-medium text-gray-700 text-sm">Weekly Commitment:</p>
//                         <p className="text-gray-600 text-sm">{formData.availability.weeklyHours} hours per week</p>
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-700 text-sm">Preferred Time Slots:</p>
//                         <div className="flex flex-wrap gap-2 mt-1">
//                           {formData.availability.preferredSlots.map(slot => (
//                             <span key={slot} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full border border-purple-200">
//                               {slot}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-red-100 border border-red-300 rounded-lg p-4 mt-6">
//                   <div className="flex items-start">
//                     <CheckCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
//                     <div>
//                       <p className="text-sm text-red-900 font-medium">Agreement</p>
//                       <p className="text-sm text-red-800 mt-1">
//                         By submitting this form, you agree to our mentor guidelines, code of conduct, and commit to providing quality mentorship to students.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation buttons */}
//           <div className="flex justify-between pt-6 border-t border-red-200">
//             {currentStep > 1 && (
//               <button
//                 type="button"
//                 onClick={handlePrevious}
//                 disabled={isSubmitting}
//                 className="inline-flex items-center px-6 py-3 border border-red-300 text-sm font-medium rounded-lg text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="w-4 h-4 mr-2" />
//                 Previous
//               </button>
//             )}
            
//             {currentStep < 4 ? (
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 disabled={isSubmitting}
//                 className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ml-auto transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Next Step
//                 <ChevronRight className="w-4 h-4 ml-2" />
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 onClick={() => setReadyToSubmit(true)}
//                 disabled={isSubmitting}
//                 className="inline-flex items-center px-8 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ml-auto transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     Submitting Application...
//                   </>
//                 ) : (
//                   <>
//                     Submit Application
//                     <Check className="w-4 h-4 ml-2" />
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MentorRegistrationForm;

// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../api/axiosInstance';
// import Button from '../../components/common/Button';

// const MentorRegistrationForm = () => {
//   const [user, setUser] = useState({});
//   const [form, setForm] = useState({
//     phone: '',
//     gender: '',
//     dateOfBirth: '',
//     expertiseAreas: '',
//     bio: '',
//     linkedinProfile: '',
//     yearsOfExperience: '',
//     weeklyHours: '',
//     preferredSlots: '',
//     certifications: '',
//   });

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem('user'));
//     if (userData) {
//       setUser(userData);
//       setForm((prev) => ({
//         ...prev,
//         phone: userData.phone || '',
//         gender: userData.gender || '',
//         dateOfBirth: userData.dateOfBirth ? userData.dateOfBirth.substring(0, 10) : '',
//       }));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Optional: Update user info first if any of phone, dob, gender missing
//       if (!user.phone || !user.gender || !user.dateOfBirth) {
//         await axiosInstance.put('/user/update-profile', {
//           phone: form.phone,
//           gender: form.gender,
//           dateOfBirth: form.dateOfBirth,
//         });
//       }

//       // Submit mentor profile
//       const res = await axiosInstance.post('/user/mentorregistration', {
//         expertiseAreas: form.expertiseAreas.split(',').map((item) => item.trim()),
//         bio: form.bio,
//         linkedinProfile: form.linkedinProfile,
//         yearsOfExperience: form.yearsOfExperience,
//         availability: {
//           weeklyHours: form.weeklyHours,
//           preferredSlots: form.preferredSlots.split(','),
//         },
//         certifications: form.certifications.split(','),
//       });

//       alert(res.data.message);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-3xl bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-6">Mentor Registration</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input type="text" name="name" value={user.name || ''} disabled className="input" />
//           <input type="email" name="email" value={user.email || ''} disabled className="input" />
//           <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
//           <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required />
//           <select name="gender" value={form.gender} onChange={handleChange} required>
//             <option value="">Select Gender</option>
//             <option>Male</option>
//             <option>Female</option>
//             <option>Other</option>
//           </select>
//         </div>

//         <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Short Bio" required />
//         <input type="text" name="linkedinProfile" value={form.linkedinProfile} onChange={handleChange} placeholder="LinkedIn URL" />
//         <input type="text" name="expertiseAreas" value={form.expertiseAreas} onChange={handleChange} placeholder="Expertise Areas (comma separated)" />
//         <input type="number" name="yearsOfExperience" value={form.yearsOfExperience} onChange={handleChange} placeholder="Years of Experience" />
//         <input type="number" name="weeklyHours" value={form.weeklyHours} onChange={handleChange} placeholder="Weekly Availability (in hours)" />
//         <input type="text" name="preferredSlots" value={form.preferredSlots} onChange={handleChange} placeholder="Preferred Time Slots (comma separated)" />
//         <input type="text" name="certifications" value={form.certifications} onChange={handleChange} placeholder="Certifications (comma separated)" />

//         <Button type="submit" className="mt-4">Submit Mentor Application</Button>
//       </form>
//     </div>
//   );
// };

// export default MentorRegistrationForm;

import React, { useState } from 'react';
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
  GraduationCap,
  Star,
  Globe,
  Calendar,
  Heart
} from "lucide-react";

const MentorRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    
    // Professional Info
    expertiseAreas: [],
    bio: "",
    linkedinProfile: "",
    yearsOfExperience: "",
    currentRole: "",
    company: "",
    
    // Availability
    availability: {
      weeklyHours: 5,
      preferredSlots: [],
    },
    
    // Additional
    certifications: [],
    languages: [],
    motivation: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const expertiseOptions = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Mobile Development",
    "Machine Learning",
    "Data Science",
    "UI/UX Design",
    "DevOps",
    "Cloud Computing",
    "Cybersecurity",
    "Blockchain",
    "Game Development",
    "Product Management",
    "Digital Marketing",
    "Project Management",
    "Business Strategy"
  ];

  const timeSlots = [
    "Weekday Mornings (9AM-12PM)",
    "Weekday Afternoons (12PM-5PM)",
    "Weekday Evenings (5PM-9PM)",
    "Weekend Mornings (9AM-12PM)",
    "Weekend Afternoons (12PM-5PM)",
    "Weekend Evenings (5PM-9PM)",
  ];

  const languageOptions = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese", 
    "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Russian"
  ];

  const validateStep = () => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.country.trim()) newErrors.country = "Country is required";
    } else if (currentStep === 2) {
      if (!formData.bio || formData.bio.length < 100) 
        newErrors.bio = "Bio must be at least 100 characters";
      if (formData.expertiseAreas.length === 0)
        newErrors.expertiseAreas = "Select at least one area of expertise";
      if (!formData.currentRole.trim()) newErrors.currentRole = "Current role is required";
      if (!formData.company.trim()) newErrors.company = "Company is required";
    } else if (currentStep === 3) {
      if (!formData.linkedinProfile.includes("linkedin.com"))
        newErrors.linkedinProfile = "Please provide a valid LinkedIn URL";
      if (Number(formData.yearsOfExperience) < 2)
        newErrors.yearsOfExperience = "Minimum 2 years of experience required";
      if (formData.languages.length === 0)
        newErrors.languages = "Select at least one language";
    } else if (currentStep === 4) {
      if (formData.availability.preferredSlots.length === 0)
        newErrors.availability = "Select at least one preferred time slot";
      if (!formData.motivation || formData.motivation.length < 50)
        newErrors.motivation = "Please explain your motivation (minimum 50 characters)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const toggleLanguage = (language) => {
    setFormData((prev) => {
      const list = prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language];
      return { ...prev, languages: list };
    });
    if (errors.languages) {
      setErrors(prev => ({ ...prev, languages: undefined }));
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

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      setReadyToSubmit(false);
    }, 2000);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      country: "",
      expertiseAreas: [],
      bio: "",
      linkedinProfile: "",
      yearsOfExperience: "",
      currentRole: "",
      company: "",
      availability: {
        weeklyHours: 5,
        preferredSlots: [],
      },
      certifications: [],
      languages: [],
      motivation: "",
    });
    setErrors({});
    setIsSubmitting(false);
    setReadyToSubmit(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-2xl border border-indigo-100 text-center">
          <div className="relative">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-r from-green-400 to-blue-500 animate-pulse">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-8 w-8 text-yellow-400 animate-bounce" />
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for applying to become a mentor. We've received your application and will review it within 2-3 business days.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                <p className="text-sm text-blue-800">
                  You'll receive a confirmation email shortly with next steps.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={resetForm}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              Submit Another Application
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 shadow-lg">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Become a Mentor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your knowledge and help others grow in their career. Join our community of expert mentors.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-indigo-100 overflow-hidden">
          {/* Progress Indicator */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="relative">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-blue-200">
                <div 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white transition-all duration-700 ease-in-out rounded-full"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm font-medium text-blue-100">
                <div className={`transition-colors duration-300 ${currentStep >= 1 ? 'text-white' : 'text-blue-300'}`}>Personal</div>
                <div className={`transition-colors duration-300 ${currentStep >= 2 ? 'text-white' : 'text-blue-300'}`}>Professional</div>
                <div className={`transition-colors duration-300 ${currentStep >= 3 ? 'text-white' : 'text-blue-300'}`}>Experience</div>
                <div className={`transition-colors duration-300 ${currentStep >= 4 ? 'text-white' : 'text-blue-300'}`}>Availability</div>
                <div className={`transition-colors duration-300 ${currentStep >= 5 ? 'text-white' : 'text-blue-300'}`}>Review</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
                  <p className="text-gray-600">Tell us about yourself</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full border-2 ${errors.firstName ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition-all duration-300`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full border-2 ${errors.lastName ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition-all duration-300`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full border-2 ${errors.email ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition-all duration-300`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full border-2 ${errors.phone ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition-all duration-300`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className={`w-full border-2 ${errors.dateOfBirth ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition-all duration-300`}
                    />
                    {errors.dateOfBirth && <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`w-full border-2 ${errors.gender ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition-all duration-300`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full border-2 ${errors.country ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition-all duration-300`}
                    placeholder="Enter your country"
                  />
                  {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Information</h2>
                  <p className="text-gray-600">Share your professional background</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Professional Bio *
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className={`w-full border-2 ${errors.bio ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-4 rounded-lg transition-all duration-300 resize-none`}
                    rows={6}
                    placeholder="Tell us about your professional background, achievements, and what makes you a great mentor..."
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      {formData.bio.length}/500 characters
                    </p>
                    <p className="text-xs text-gray-500">
                      (minimum 100 required)
                    </p>
                  </div>
                  {errors.bio && <p className="text-red-600 text-sm mt-1">{errors.bio}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Role *
                    </label>
                    <input
                      type="text"
                      name="currentRole"
                      value={formData.currentRole}
                      onChange={handleInputChange}
                      className={`w-full border-2 ${errors.currentRole ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition-all duration-300`}
                      placeholder="e.g., Senior Software Engineer"
                    />
                    {errors.currentRole && <p className="text-red-600 text-sm mt-1">{errors.currentRole}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full border-2 ${errors.company ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition-all duration-300`}
                      placeholder="Enter your company name"
                    />
                    {errors.company && <p className="text-red-600 text-sm mt-1">{errors.company}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Areas of Expertise *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {expertiseOptions.map((area) => (
                      <div
                        key={area}
                        onClick={() => toggleExpertise(area)}
                        className={`
                          px-4 py-3 rounded-lg text-sm cursor-pointer transition-all duration-300 text-center border-2 font-medium
                          ${formData.expertiseAreas.includes(area)
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-lg transform scale-105'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-300'
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
                  {errors.expertiseAreas && <p className="text-red-600 text-sm mt-2">{errors.expertiseAreas}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Experience & Credentials */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Experience & Credentials</h2>
                  <p className="text-gray-600">Tell us about your professional experience</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile *
                    </label>
                    <input
                      type="url"
                      name="linkedinProfile"
                      value={formData.linkedinProfile}
                      onChange={handleInputChange}
                      className={`w-full border-2 ${errors.linkedinProfile ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition-all duration-300`}
                      placeholder="https://www.linkedin.com/in/your-profile"
                    />
                    {errors.linkedinProfile && <p className="text-red-600 text-sm mt-1">{errors.linkedinProfile}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience *
                    </label>
                    <input
                      type="number"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                      className={`w-full border-2 ${errors.yearsOfExperience ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition-all duration-300`}
                      min="0"
                      placeholder="Years of professional experience"
                    />
                    {errors.yearsOfExperience && <p className="text-red-600 text-sm mt-1">{errors.yearsOfExperience}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Languages You Speak *
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {languageOptions.map((language) => (
                      <div
                        key={language}
                        onClick={() => toggleLanguage(language)}
                        className={`
                          px-3 py-2 rounded-lg text-sm cursor-pointer transition-all duration-300 text-center border-2 font-medium
                          ${formData.languages.includes(language)
                            ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white border-green-500 shadow-lg'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-green-50 hover:border-green-300'
                          }
                        `}
                      >
                        {language}
                      </div>
                    ))}
                  </div>
                  {errors.languages && <p className="text-red-600 text-sm mt-2">{errors.languages}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certifications & Awards
                  </label>
                  <input
                    type="text"
                    onKeyDown={addCertification}
                    className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg transition-all duration-300"
                    placeholder="Type a certification/award and press Enter to add"
                  />
                  <div className="flex flex-wrap mt-3 gap-2">
                    {formData.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-purple-200 transition-colors duration-200 border border-purple-200"
                        onClick={() => removeCertification(cert)}
                      >
                        {cert} <span className="ml-1 text-purple-600">×</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Availability & Motivation */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Availability & Motivation</h2>
                  <p className="text-gray-600">When can you mentor and why do you want to help?</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
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
                      className="w-full h-3 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-center mt-3">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {formData.availability.weeklyHours}
                      </span>
                      <span className="text-sm text-gray-600 ml-1">hours per week</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Time Slots *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <div
                        key={slot}
                        onClick={() => toggleTimeSlot(slot)}
                        className={`
                          px-4 py-3 rounded-lg text-sm cursor-pointer transition-all duration-300 text-center border-2 font-medium
                          ${formData.availability.preferredSlots.includes(slot)
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-500 shadow-lg'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-orange-50 hover:border-orange-300'
                          }
                        `}
                      >
                        <Clock className="w-4 h-4 inline-block mr-2" />
                        {slot}
                      </div>
                    ))}
                  </div>
                  {errors.availability && <p className="text-red-600 text-sm mt-2">{errors.availability}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Why do you want to become a mentor? *
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    className={`w-full border-2 ${errors.motivation ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-4 rounded-lg transition-all duration-300 resize-none`}
                    rows={4}
                    placeholder="Share your motivation for mentoring others and what you hope to achieve..."
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      {formData.motivation.length}/300 characters
                    </p>
                    <p className="text-xs text-gray-500">
                      (minimum 50 required)
                    </p>
                  </div>
                  {errors.motivation && <p className="text-red-600 text-sm mt-1">{errors.motivation}</p>}
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Application</h2>
                  <p className="text-gray-600">Please review all information before submitting</p>
                </div>

                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Name:</span>
                        <span className="ml-2 text-gray-600">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="ml-2 text-gray-600">{formData.email}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Phone:</span>
                        <span className="ml-2 text-gray-600">{formData.phone}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Country:</span>
                        <span className="ml-2 text-gray-600">{formData.country}</span>
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2" />
                      Professional Background
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Current Role:</span>
                        <span className="ml-2 text-gray-600">{formData.currentRole} at {formData.company}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Bio:</span>
                        <p className="text-gray-600 mt-1 leading-relaxed">{formData.bio}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Areas of Expertise:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.expertiseAreas.map(area => (
                            <span key={area} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Experience & Credentials
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Experience:</span>
                        <span className="ml-2 text-gray-600">{formData.yearsOfExperience} years</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Languages:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.languages.map(lang => (
                            <span key={lang} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      {formData.certifications.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700">Certifications:</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.certifications.map(cert => (
                              <span key={cert} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                    <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Availability & Motivation
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Weekly Hours:</span>
                        <span className="ml-2 text-gray-600">{formData.availability.weeklyHours} hours per week</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Preferred Slots:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.availability.preferredSlots.map(slot => (
                            <span key={slot} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                              {slot}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Motivation:</span>
                        <p className="text-gray-600 mt-1 leading-relaxed">{formData.motivation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-300 rounded-xl p-6 mt-8">
                  <div className="flex items-start">
                    <Heart className="h-6 w-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-900 font-medium">Mentor Agreement</p>
                      <p className="text-sm text-blue-800 mt-2 leading-relaxed">
                        By submitting this application, you agree to our mentor guidelines, code of conduct, and commit to providing quality mentorship to students. You understand that this is a volunteer position focused on helping others grow in their careers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>
              )}
              
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-auto transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={() => setReadyToSubmit(true)}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-8 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ml-auto transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Star className="w-4 h-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorRegistrationForm;