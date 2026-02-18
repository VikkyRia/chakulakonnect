import { useState } from 'react';
import loginImg from '../assets/image/login.png';
import testImg from '../assets/image/tomatoes.png';
import logo from '../assets/image/SVG.png';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/auth';
import { Mail, Lock, Eye } from 'lucide-react';
import colorgoogle from '../assets/image/colorgoogle.png';
import facebook from '../assets/image/facebook.png';

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      const data = await res.json();
      if (res.status === 200 && data.success) {
        // Store user and token in localStorage
        localStorage.setItem('currentUser', JSON.stringify(data.data.user));
        localStorage.setItem('token', data.data.token);
        navigate('/dashboard');
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (err) {
      setErrorMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl flex overflow-hidden">
        {/* Left: Form Section */}
        <div className="w-full md:w-1/2 p-18 flex flex-col justify-center">
          {/* Branding */}
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-2">
              <img src={logo} alt="ChakulaKonnect Logo" className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-black">Chakula</span>
              <span className="text-green-600">Konnect</span>
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Login to ChakulaKonnect</h1>
          <p className="text-gray-600 mb-6">Welcome back! Please enter your details to access your account.</p>
          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-center">{errorMessage}</div>
          )}
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                <Eye size={18} />
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Keep me logged in</span>
              </div>
              <button type="button" className="text-green-600 text-sm font-medium hover:underline">Forgot password?</button>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition">Sign in</button>
          </form>
          <div className="my-6 text-center text-gray-500">or continue with</div>
          <div className="flex gap-4 mb-6">
            <button className="flex-1 border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50">
              <img src={colorgoogle} alt="Google" className="w-5 h-5" />
              <span>Google</span>
            </button>
            <button className="flex-1 border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50">
              <img src={facebook} alt="Facebook" className="w-5 h-5" />
              <span>Facebook</span>
            </button>
          </div>
          <div className="text-center text-gray-600 text-sm mt-2">
            Don't have an account?{' '}
            <button onClick={() => navigate('/register')} className="text-green-600 hover:underline font-medium">Sign up for free</button>
          </div>
        </div>
        {/* Right: Image/Quote Section */}
        <div className="hidden md:block w-1/2 relative">
          <img src={loginImg} alt="Login Visual" className="absolute inset-0 w-full h-full object-cover rounded-r-2xl" style={{objectFit: 'cover', width: '100%', height: '100%'}} />
          {/* Community Initials - styled as in screenshot */}
          <div className="absolute bottom-10 left-10 flex items-center z-10">
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-white font-bold text-xs shadow">JD</div>
              <div className="w-8 h-8 rounded-full bg-orange-300 border-2 border-white flex items-center justify-center text-white font-bold text-xs shadow">AS</div>
              <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-white font-bold text-xs shadow">MK</div>
            </div>
            <span className="ml-4 text-white font-medium text-sm">Joined by 10,000+ local sellers</span>
          </div>
          <div className="absolute bottom-10 left-10 right-10 text-white mb-7">
            <p className="text-2xl font-semibold mb-4">"Connecting the heart of our farms directly to your table."</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
