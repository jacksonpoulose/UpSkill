// import React, { useState } from "react";
// import axios from "axios";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const { name, email, password, confirmPassword } = formData;

//     if (password !== confirmPassword) {
//       return setError("Passwords do not match");
//     }

//     try {
//       const response = await axios.post("http://localhost:3000/api/v1/auth/register", {
//         name,
//         email,
//         password
//       });

//       setSuccess("Signup successful! Redirecting to login...");
//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-red-50">
//       <div className="w-96 p-8 bg-white shadow-lg rounded-lg border-t-4 border-red-600">
//         <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Sign Up</h2>
//         {error && <p className="text-red-600 text-center">{error}</p>}
//         {success && <p className="text-green-600 text-center">{success}</p>}
//         <form onSubmit={handleSignup}>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-semibold mb-2">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-semibold mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-semibold mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-950 text-white py-2 rounded-lg hover:bg-blue-900 transition"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="mt-4 text-center text-gray-600">
//           Already have an account?{" "}
//           <a href="/login" className="text-red-600 font-semibold hover:underline">
//             Log in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import Button from '../../components/common/Button';
import Logo from '../../components/common/Logo';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          return 'Invalid email address';
        }
        return '';

      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
        if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
        if (!/(?=.*[!@#$%^&*])/.test(value)) return 'Password must contain at least one special character';
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
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

    const allTouched = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);

    if (validateForm()) {
      try {
        const { name, email, password } = formData;
        const response = await axios.post('http://localhost:3000/api/v1/auth/register', {
          name,
          email,
          password
        });

        setSuccessMessage('Signup successful! Redirecting to login...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } catch (error) {
        setServerError(error.response?.data?.message || 'Signup failed');
      }
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClasses = "block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-red-500";
    return `${baseClasses} ${
      errors[fieldName] && touched[fieldName]
        ? "border-red-300 focus:border-red-500"
        : "border-gray-300 focus:border-red-500"
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo size="large" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => window.location.href = "/login"}
            className="font-medium text-red-600 hover:text-red-500"
          >
            Sign in
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {serverError && (
            <div className="mb-4 text-center text-sm text-red-600">{serverError}</div>
          )}
          {successMessage && (
            <div className="mb-4 text-center text-sm text-green-600">{successMessage}</div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('name')}
                />
                {errors.name && touched.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('email')}
                />
                {errors.email && touched.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('password')}
                />
                {errors.password && touched.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('confirmPassword')}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="red"
                size="lg"
                className="w-full text-left bg-red-900 text-white hover:bg-red-900 py-2 cursor-pointer"
              >
                Create Account
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => console.log('Google signup')}
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => console.log('GitHub signup')}
              >
                GitHub
              </Button>
            </div>
          </div>
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

export default SignupPage;
