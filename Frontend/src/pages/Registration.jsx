import { useState } from 'react';
import registerImg from '../assets/image/register.png';
import logo from '../assets/image/SVG.png';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/auth';
import { Mail, Lock, Eye, User, MapPin } from 'lucide-react';
import smilingImg from '../assets/image/smiling.png';
import darkgoogle from '../assets/image/darkgoogle.png';
import facebook from '../assets/image/facebook.png';

function Registration() {
  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    userType: 'consumer',
    location: {
      address: '',
      city: '',
      state: ''
    }
  });

  // State for form errors
  const [errors, setErrors] = useState({});
  
  // State for displaying registration message
  const [message, setMessage] = useState('');

  // Hook to navigate to different pages
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'address' || name === 'city' || name === 'state') {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [name]: value
        }
      });
      if (errors.location && errors.location[name]) {
        setErrors({
          ...errors,
          location: {
            ...errors.location,
            [name]: ''
          }
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: ''
        });
      }
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    const locErr = {};
    if (!formData.location.address.trim()) locErr.address = 'Address is required';
    if (!formData.location.city.trim()) locErr.city = 'City is required';
    if (!formData.location.state.trim()) locErr.state = 'State is required';
    if (Object.keys(locErr).length > 0) newErrors.location = locErr;

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

    // Prepare payload
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      userType: formData.userType,
      location: {
        address: formData.location.address,
        city: formData.location.city,
        state: formData.location.state
      }
    };

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.status === 201 && data.success) {
        setMessage('Registration successful! Redirecting to verification...');
        setTimeout(() => {
          navigate('/verify', { state: { email: formData.email } });
        }, 1000);
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl flex overflow-hidden">
        {/* Left: Form Section (centered, max-w-md) */}
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-600 mb-6">Join the fresh revolution in Nigeria today.</p>
          {/* Tabs */}
          <div className="flex mb-6 bg-gray-100 rounded-lg overflow-hidden">
            <button className={`flex-1 px-4 py-2 font-semibold text-sm ${formData.userType === 'consumer' ? 'bg-white text-gray-900' : 'text-gray-500'}`} onClick={() => setFormData({ ...formData, userType: 'consumer' })}>Consumer</button>
            <button className={`flex-1 px-4 py-2 font-semibold text-sm ${formData.userType === 'seller' ? 'bg-white text-gray-900' : 'text-gray-500'}`} onClick={() => setFormData({ ...formData, userType: 'seller' })}>Seller</button>
          </div>
          {/* Error/Success Message */}
          {message && (
            <div className={`mb-4 p-3 rounded text-center ${
              message.includes('successful') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}
          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <User size={18} />
              </span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
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
                <MapPin size={18} />
              </span>
              <input
                type="text"
                name="address"
                value={formData.location.address}
                onChange={handleChange}
                placeholder="Enter your address in Nigeria (e.g., Ikeja, Lagos)"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${(errors.location && errors.location.address) ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors.location && errors.location.address && <p className="text-red-500 text-sm mt-1">{errors.location.address}</p>}
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                <Eye size={18} />
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            <div className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" required />
              <span className="text-sm text-gray-700">I agree to the <a href="#" className="text-green-600 underline">Terms and Privacy Policy</a>.</span>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition">Create Account</button>
          </form>
          <div className="my-6 text-center text-gray-500">or continue with</div>
          <div className="flex gap-4 mb-6">
            <button className="flex-1 border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 bg-white">
              <img src={darkgoogle} alt="Google" className="w-5 h-5" />
              <span>Google</span>
            </button>
            <button className="flex-1 border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 bg-white">
              <img src={facebook} alt="Facebook" className="w-5 h-5" />
              <span>Facebook</span>
            </button>
          </div>
          <div className="text-center text-gray-600 text-sm mt-2">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-green-600 hover:underline font-medium">Log in</button>
          </div>
        </div>
        {/* Right: Image/Quote Section */}
        <div className="hidden md:block w-1/2 relative">
          <img src={registerImg} alt="Registration Visual" className="absolute inset-0 w-full h-full object-cover rounded-r-2xl" style={{objectFit: 'cover', width: '100%', height: '100%'}} />
          <div className="absolute bottom-10 left-10 right-10">
            <div className="bg-white/80 rounded-xl p-6 shadow-lg flex flex-col gap-3">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-yellow-400 text-lg">★★★★★</span>
              </div>
              <p className="text-gray-800 text-base font-medium mb-2">"Since joining chakulaKonnect, our seller business has connected with over 500 local customers. It's transformed how we operate and reached people we never could before."</p>
              <div className="flex items-center gap-3 mt-2">
                <img src={smilingImg} alt="Sarah Ojo" className="w-8 h-8 rounded-full border-2 border-white" />
                <div>
                  <span className="block text-gray-900 font-semibold text-sm">Sarah Ojo</span>
                  <span className="block text-green-700 text-xs font-medium">BUSINESS OWNER, LAGOS, NIGERIA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
