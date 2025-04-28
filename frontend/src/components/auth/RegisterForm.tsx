import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import { User, Mail, Lock, AlertCircle, Check } from 'lucide-react';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'mentor',
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'radio' ? e.target.id : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    clearError();
    
    const { name, email, password, confirmPassword, role } = formData;
    
    if (!name || !email || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      await register({ name, email, role }, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden animate-fade-in">
      <div className="bg-primary-600 px-6 py-8 text-white">
        <h2 className="text-2xl font-bold text-center">Create Your Account</h2>
        <p className="text-center text-primary-100 mt-2">Join LearnHub and start learning today</p>
      </div>
      
      <form onSubmit={handleSubmit} className="px-6 py-8">
        {(error || formError) && (
          <div className="mb-6 p-4 bg-error-50 text-error-700 rounded-md flex items-start">
            <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>{formError || error}</p>
          </div>
        )}
        
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="mb-5">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <span className="block text-sm font-medium text-gray-700 mb-2">
            I am registering as:
          </span>
          <div className="flex space-x-4">
            <div 
              className={`
                flex-1 border rounded-md p-4 cursor-pointer transition-all
                ${formData.role === 'student' 
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' 
                  : 'border-gray-200 hover:border-gray-300'}
              `}
              onClick={() => setFormData({...formData, role: 'student'})}
            >
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="student"
                  name="role"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  checked={formData.role === 'student'}
                  onChange={handleChange}
                />
                <label htmlFor="student" className="ml-2 block text-sm font-medium text-gray-700">
                  Student
                </label>
              </div>
              <p className="text-xs text-gray-500">Looking to learn new skills and take courses</p>
            </div>
            
            <div 
              className={`
                flex-1 border rounded-md p-4 cursor-pointer transition-all
                ${formData.role === 'mentor' 
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' 
                  : 'border-gray-200 hover:border-gray-300'}
              `}
              onClick={() => setFormData({...formData, role: 'mentor'})}
            >
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="mentor"
                  name="role"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  checked={formData.role === 'mentor'}
                  onChange={handleChange}
                />
                <label htmlFor="mentor" className="ml-2 block text-sm font-medium text-gray-700">
                  Mentor
                </label>
              </div>
              <p className="text-xs text-gray-500">Looking to teach and guide students</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            fullWidth
            rightIcon={<Check size={18} />}
          >
            Create Account
          </Button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;