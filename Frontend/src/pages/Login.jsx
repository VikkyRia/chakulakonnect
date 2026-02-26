import { useState } from 'react';
import loginImg from '../assets/image/login.png';
import logo from '../assets/image/SVG.png';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
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

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setErrorMessage('');

    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // 1. Try API login first
      const res = await api.post('/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      if (res.data.success) {
        const { user, token } = res.data.data;
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', token);
        setSuccessMessage(`Welcome back, ${user.fullName}!`);

        handleRedirect(user);
      }
    } catch (err) {
      // 2. Fallback to local authentication for demo users
      const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const localUser = localUsers.find(u => u.email === formData.email && u.password === formData.password);

      if (localUser) {
        localStorage.setItem('currentUser', JSON.stringify(localUser));
        setSuccessMessage(`Welcome back, ${localUser.fullName}! (Internal)`);
        handleRedirect(localUser);
      } else {
        const errorMsg = err.response?.data?.message || err.message || 'Login failed. Please try again.';
        setErrorMessage(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = (user) => {
    // Redirect based on userType or role (caseless)
    const type = (user.userType || user.role || '').toLowerCase();

    setTimeout(() => {
      if (type === 'seller') {
        navigate('/seller-dashboard');
      } else {
        navigate('/consumer-dashboard');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-6 lg:p-10">
      <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-100 transition-all duration-500">
        {/* Left: Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-center">
          {/* Branding */}
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-green-200">
              <img src={logo} alt="ChakulaKonnect Logo" className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter">
              <span className="text-slate-900 italic">Chakula</span>
              <span className="text-green-600 italic">Konnect</span>
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 tracking-tight italic">Welcome back</h1>
            <p className="text-slate-500 font-medium italic">Please enter your details to access your account.</p>
          </div>

          {/* Success/Error UI */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl text-sm font-bold text-center bg-rose-50 text-rose-700 border border-rose-100 italic animate-in fade-in slide-in-from-top-4 duration-300">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl text-sm font-bold text-center bg-emerald-50 text-emerald-700 border border-emerald-100 italic animate-in fade-in slide-in-from-top-4 duration-300">
              {successMessage}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
            </div>
            {errors.email && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.email}</p>}

            <div className="relative group">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full pl-12 pr-12 py-3.5 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 font-bold text-sm transition-all ${errors.password ? 'border-rose-300 bg-rose-50/10' : 'border-slate-200'}`}
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 cursor-pointer hover:text-green-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={18} className="text-green-600" /> : <Eye size={18} />}
              </span>
            </div>
            {errors.password && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.password}</p>}

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-green-600 focus:ring-green-500 transition-all cursor-pointer" />
                <span className="text-xs text-slate-500 font-medium group-hover:text-slate-700 transition-colors">Keep me logged in</span>
              </label>
              <button type="button" className="text-green-600 text-xs font-black hover:underline uppercase tracking-tight italic">Forgot password?</button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-slate-200 active:scale-[0.98] disabled:opacity-50 text-sm uppercase tracking-widest ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign in'
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
              <img src={colorgoogle} alt="Google" className="w-5 h-5" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3 border border-slate-100 rounded-2xl bg-white hover:bg-slate-50 transition-all font-bold text-xs shadow-sm">
              <img src={facebook} alt="Facebook" className="w-5 h-5" />
              <span>Facebook</span>
            </button>
          </div>

          <p className="text-center text-slate-500 font-medium text-sm">
            Don't have an account?{' '}
            <button onClick={() => navigate('/register')} className="text-green-600 font-black hover:underline uppercase tracking-tighter ml-1 italic">Sign up</button>
          </p>
        </div>

        {/* Right Section */}
        <div className="hidden md:block w-1/2 relative bg-emerald-50">
          <img src={loginImg} alt="Fresh Produce" className="absolute inset-0 w-full h-full object-cover grayscale-[20%] brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>

          <div className="absolute bottom-12 left-12 right-12">
            <div className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-400/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"></div>

              <div className="flex items-center gap-4 mb-8 z-10 relative">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-white font-black text-[10px] shadow-lg">JD</div>
                  <div className="w-10 h-10 rounded-full bg-orange-300 border-2 border-white flex items-center justify-center text-white font-black text-[10px] shadow-lg">AS</div>
                  <div className="w-10 h-10 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center text-white font-black text-[10px] shadow-lg">MK</div>
                </div>
                <span className="text-white font-bold text-xs">Joined by 10,000+ local sellers</span>
              </div>

              <p className="text-white text-xl font-medium leading-relaxed mb-6 tracking-tight italic relative z-10">
                "Connecting the heart of our farms directly to your table. Experience fresh like never before."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
