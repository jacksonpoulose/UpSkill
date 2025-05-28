import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import Button from '../../components/common/Button';
import Logo from '../../components/common/Logo';

const MentorRegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s]*$/.test(value)) return 'Name can only contain letters and spaces';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return 'Invalid email address';
        return '';
      case 'expertise':
        if (!value.trim()) return 'Expertise is required';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])/.test(value)) return 'Must contain at least one lowercase letter';
        if (!/(?=.*[A-Z])/.test(value)) return 'Must contain at least one uppercase letter';
        if (!/(?=.*\d)/.test(value)) return 'Must contain at least one number';
        if (!/(?=.*[!@#$%^&*])/.test(value)) return 'Must contain one special character';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');

    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (validateForm()) {
      try {
        const { name, email, expertise, password } = formData;
        const res = await axios.post('http://localhost:3000/api/v1/auth/mentor/register', {
          name, email, expertise, password
        });

        setSuccessMessage('Mentor registered successfully! Redirecting...');
        setTimeout(() => {
          window.location.href = '/mentor/login';
        }, 2000);
      } catch (err) {
        setServerError(err.response?.data?.message || 'Registration failed');
      }
    }
  };

  const getInputClassName = (field) => {
    const base = "block w-full rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-red-500";
    return `${base} ${errors[field] && touched[field] ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-red-500"}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo size="large" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Register as a Mentor
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {serverError && <p className="mb-4 text-center text-sm text-red-600">{serverError}</p>}
          {successMessage && <p className="mb-4 text-center text-sm text-green-600">{successMessage}</p>}
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {['name', 'email', 'expertise', 'password', 'confirmPassword'].map((field, idx) => (
              <div key={idx}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <div className="mt-1">
                  <input
                    id={field}
                    name={field}
                    type={field.includes('password') ? 'password' : 'text'}
                    autoComplete={field}
                    value={formData[field]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClassName(field)}
                  />
                  {errors[field] && touched[field] && (
                    <p className="mt-2 text-sm text-red-600">{errors[field]}</p>
                  )}
                </div>
              </div>
            ))}

            <Button
              type="submit"
              variant="red"
              size="lg"
              className="w-full bg-red-900 text-white hover:bg-red-900 py-2"
            >
              Register
            </Button>
          </form>
        </div>
      </div>

      <button
        onClick={() => window.location.href = "/"}
        className="mt-8 flex items-center justify-center text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </button>
    </div>
  );
};

export default MentorRegistrationPage;
