// Validation functions for mentor registration form (JavaScript version)

export const validateExpertise = (data) => {
  const errors = {};

  if (!data.expertiseAreas || data.expertiseAreas.length === 0) {
    errors.expertiseAreas = "Please select at least one area of expertise";
  }

  return errors;
};

export const validateProfile = (data) => {
  const errors = {};

  if (!data.bio || data.bio.trim().length < 50) {
    errors.bio = "Bio should be at least 50 characters";
  }

  if (data.linkedinProfile && !data.linkedinProfile.includes("linkedin.com/")) {
    errors.linkedinProfile = "Please enter a valid LinkedIn URL";
  }

  if (data.yearsOfExperience < 1) {
    errors.yearsOfExperience = "Experience should be at least 1 year";
  }

  return errors;
};

export const validateAvailability = (data) => {
  const errors = {};

  if (data.weeklyHours < 1) {
    errors.weeklyHours = "Weekly hours should be at least 1";
  }

  if (!data.preferredSlots || data.preferredSlots.length === 0) {
    errors.preferredSlots = "Please select at least one preferred time slot";
  }

  return errors;
};

export const validateCertifications = (data) => {
  // Certifications are optional
  return {};
};

export const validateForm = (step, data) => {
  switch (step) {
    case 0:
      return validateExpertise({ expertiseAreas: data.expertiseAreas });
    case 1:
      return validateProfile({
        bio: data.bio,
        linkedinProfile: data.linkedinProfile,
        yearsOfExperience: data.yearsOfExperience
      });
    case 2:
      return validateAvailability({
        weeklyHours: data.weeklyHours,
        preferredSlots: data.preferredSlots
      });
    case 3:
      return validateCertifications({ certifications: data.certifications });
    default:
      return {};
  }
};
