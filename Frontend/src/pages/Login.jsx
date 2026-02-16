import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/auth';

function Login() {
  // State for form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State for form errors
  const [errors, setErrors] = useState({});

  // State for login error message
  const [errorMessage, setErrorMessage] = useState('');

  // Hook to navigate to different pages
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    // Clear login error message
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Try to login user
    const result = loginUser(formData.email, formData.password);

    if (result.success) {
      // Redirect to dashboard on successful login
      navigate('/dashboard');
    } else {
      // Show error message if login fails
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-center">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition duration-200 mt-6"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-green-600 hover:underline font-medium"
          >
            Sign up here
          </button>
        </p>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
          <p className="text-xs text-gray-600 mb-2">
            <strong>Demo Credentials:</strong>
          </p>
          <p className="text-xs text-gray-600">Email: demo@example.com</p>
          <p className="text-xs text-gray-600">Password: demo123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
