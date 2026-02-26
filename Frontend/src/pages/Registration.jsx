import { useState } from 'react';
import registerImg from '../assets/image/register.png';
import logo from '../assets/image/SVG.png';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Mail, Lock, Eye, User, MapPin, Phone, ChevronDown, Users } from 'lucide-react';
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

  // State for loading and global errors
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);

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
    setMessage('');
    setApiError('');

    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

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
      const res = await api.post('/api/auth/register', payload);
      console.log(res)

      if (res.status === 201 || res.status === 200) {
        setMessage(`Registration successful! Welcome to the community, ${formData.fullName}!`);

        // Store user and token if returned
        if (res.data.data) {
          localStorage.setItem('currentUser', JSON.stringify(res.data.data.user));
          localStorage.setItem('token', res.data.data.token);
        }

        // Redirect based on userType after a short delay
        setTimeout(() => {
          if (formData.userType === 'seller') {
            navigate('/seller-dashboard');
          } else {
            navigate('/consumer-dashboard');
          }
        }, 1500);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-100 italic transition-all duration-500">
        {/* Left: Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-center">
          {/* Branding */}
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-green-200">
              <img src={logo} alt="ChakulaKonnect Logo" className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter">
              <span className="text-slate-900">Chakula</span>
              <span className="text-green-600">Konnect</span>
            </span>
          </div>
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 tracking-tight">Create your account</h1>
            <p className="text-slate-500 font-medium italic">Join the fresh revolution in Nigeria today.</p>
          </div>
          {/* Account Type Selection (Dropdown) */}
          <div className="relative mb-6">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
              <Users size={18} />
            </span>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full pl-12 pr-10 py-3.5 border border-slate-200 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-slate-50 text-slate-900 font-bold text-sm transition-all"
            >
              <option value="consumer">Consumer (Buy Fresh Produce)</option>
              <option value="seller">Seller (Sell Fresh Produce)</option>
            </select>
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
              <ChevronDown size={18} />
            </span>
          </div>
          {/* Error/Success Message */}
          {message && (
            <div className="mb-6 p-4 rounded-2xl text-sm font-bold text-center bg-emerald-50 text-emerald-700 border border-emerald-100">
              {message}
            </div>
          )}
          {apiError && (
            <div className="mb-6 p-4 rounded-2xl text-sm font-bold text-center bg-rose-50 text-rose-700 border border-rose-100">
              {apiError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors">
                <User size={18} />
              </span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 font-bold text-sm transition-all ${errors.fullName ? 'border-rose-300 bg-rose-50/10' : 'border-slate-200'}`}
              />
            </div>
            {errors.fullName && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.fullName}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative group">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 font-bold text-sm transition-all ${errors.email ? 'border-rose-300 bg-rose-50/10' : 'border-slate-200'}`}
                />
                {errors.email && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.email}</p>}
              </div>

              <div className="relative group">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors">
                  <Phone size={18} />
                </span>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 font-bold text-sm transition-all ${errors.phoneNumber ? 'border-rose-300 bg-rose-50/10' : 'border-slate-200'}`}
                />
                {errors.phoneNumber && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.phoneNumber}</p>}
              </div>
            </div>

            <div className="relative group">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors">
                <MapPin size={18} />
              </span>
              <input
                type="text"
                name="address"
                value={formData.location.address}
                onChange={handleChange}
                placeholder="Residential Address"
                className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 font-bold text-sm transition-all ${(errors.location && errors.location.address) ? 'border-rose-300 bg-rose-50/10' : 'border-slate-200'}`}
              />
              {errors.location && errors.location.address && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.location.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <input
                  type="text"
                  name="city"
                  value={formData.location.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={`w-full px-4 py-3.5 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 font-bold text-sm transition-all ${(errors.location && errors.location.city) ? 'border-rose-300 bg-rose-50/10' : 'border-slate-200'}`}
                />
                {errors.location && errors.location.city && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.location.city}</p>}
              </div>
              <div className="relative group">
                <input
                  type="text"
                  name="state"
                  value={formData.location.state}
                  onChange={handleChange}
                  placeholder="State"
                  className={`w-full px-4 py-3.5 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 font-bold text-sm transition-all ${(errors.location && errors.location.state) ? 'border-rose-300 bg-rose-50/10' : 'border-slate-200'}`}
                />
                {errors.location && errors.location.state && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.location.state}</p>}
              </div>
            </div>

            <div className="relative group">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Secure Password"
                className={`w-full pl-12 pr-12 py-3.5 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 font-bold text-sm transition-all ${errors.password ? 'border-rose-300 bg-rose-50/10' : 'border-slate-200'}`}
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 cursor-pointer hover:text-green-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={18} className="text-green-600" /> : <Eye size={18} />}
              </span>
              {errors.password && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.password}</p>}
            </div>

            <div className="flex items-start gap-3 py-2 cursor-pointer group" onClick={() => setShowTermsModal(true)}>
              <div className="mt-1">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-green-600 focus:ring-green-500 transition-all cursor-pointer" required />
              </div>
              <span className="text-xs text-slate-500 font-medium leading-relaxed">
                I agree to the <button type="button" className="text-green-600 font-black hover:underline uppercase tracking-tight">Terms and Privacy Policy</button> of ChakulaKonnect.
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-slate-200 active:scale-[0.98] disabled:opacity-50 text-sm uppercase tracking-widest ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Joining...</span>
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
              <span className="bg-white px-4">Instant Access</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-3 py-3 border border-slate-100 rounded-2xl bg-white hover:bg-slate-50 transition-all font-bold text-xs shadow-sm">
              <img src={darkgoogle} alt="Google" className="w-5 h-5" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3 border border-slate-100 rounded-2xl bg-white hover:bg-slate-50 transition-all font-bold text-xs shadow-sm">
              <img src={facebook} alt="Facebook" className="w-5 h-5" />
              <span>Facebook</span>
            </button>
          </div>

          <p className="text-center text-slate-500 font-medium text-sm">
            Already a member?{' '}
            <button onClick={() => navigate('/login')} className="text-green-600 font-black hover:underline uppercase tracking-tighter ml-1">Log in</button>
          </p>
        </div>

        {/* Right Section */}
        <div className="hidden md:block w-1/2 relative bg-emerald-50">
          <img src={registerImg} alt="Fresh Produce" className="absolute inset-0 w-full h-full object-cover grayscale-[20%] brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>

          <div className="absolute bottom-12 left-12 right-12">
            <div className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-400/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"></div>

              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-emerald-400 text-xl">★</span>
                ))}
              </div>

              <p className="text-white text-xl font-medium leading-relaxed mb-10 tracking-tight italic">
                "Since joining ChakulaKonnect, our seller business has connected with over 500 local customers. It's transformed how we operate and reached people we never could before."
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-4 border-white/20 p-0.5 overflow-hidden">
                  <img src={smilingImg} alt="Sarah Ojo" className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                  <span className="block text-white font-black text-lg tracking-tight">Sarah Ojo</span>
                  <span className="block text-emerald-400 text-[10px] font-black uppercase tracking-widest">Business Owner • Lagos, NG</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Privacy Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
          <div
            className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 sm:p-12 space-y-8">
              <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                To provide the best experiences, we use technologies like cookies to store and/or access device information. Consenting to these technologies will allow us to process data such as browsing behavior or unique IDs on this site. Not consenting or withdrawing consent, may adversely affect certain features and functions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black py-4 px-8 rounded-2xl transition-all shadow-xl shadow-purple-200 active:scale-95 text-base uppercase tracking-widest"
                >
                  Accept
                </button>
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="flex-1 bg-[#EF4444] hover:bg-[#DC2626] text-white font-black py-4 px-8 rounded-2xl transition-all shadow-xl shadow-red-200 active:scale-95 text-base uppercase tracking-widest"
                >
                  Deny
                </button>
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="flex-1 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-slate-700 font-black py-4 px-8 rounded-2xl transition-all shadow-sm active:scale-95 text-base"
                >
                  View preferences
                </button>
              </div>

              <div className="flex justify-center gap-8 pt-4">
                <button className="text-[#7C3AED] text-sm font-bold underline hover:text-[#6D28D9] transition-colors">Cookie Policy</button>
                <button className="text-[#7C3AED] text-sm font-bold underline hover:text-[#6D28D9] transition-colors">Contact</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Registration;
