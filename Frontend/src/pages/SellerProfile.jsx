import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { isAuthenticated, getCurrentUser } from '../utils/auth';
import {
    User,
    Mail,
    Phone,
    MapPin,
    ArrowLeft,
    Save,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Camera,
    ShieldCheck,
    Lock,
    Eye,
    EyeOff
} from 'lucide-react';
import logo from '../assets/image/SVG.png';

function SellerProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await api.get('/api/users/me');
                if (res.data.success) {
                    const userData = res.data.data.user;
                    setUser(userData);
                    setFormData({
                        fullName: userData.fullName || '',
                        phoneNumber: userData.phoneNumber || '',
                        address: userData.location?.address || '',
                        city: userData.location?.city || '',
                        state: userData.location?.state || ''
                    });
                }
            } catch (err) {
                console.error('Failed to fetch profile:', err);
                const localUser = getCurrentUser();
                if (localUser) {
                    setUser(localUser);
                    setFormData({
                        fullName: localUser.fullName || '',
                        phoneNumber: localUser.phoneNumber || '',
                        address: localUser.location?.address || '',
                        city: localUser.location?.city || localUser.city || '',
                        state: localUser.location?.state || localUser.state || ''
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (message.text) setMessage({ type: '', text: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const payload = {
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                location: {
                    address: formData.address,
                    city: formData.city,
                    state: formData.state
                }
            };

            const res = await api.put('/api/users/profile', payload);

            if (res.data.success) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                // Update local storage
                const updatedUser = { ...user, ...payload };
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
        } catch (err) {
            console.error('Update failed:', err);
            setMessage({
                type: 'error',
                text: err.response?.data?.message || 'Failed to update profile. Please try again.'
            });
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword.length < 8) {
            setPasswordMessage({ type: 'error', text: 'New password must be at least 8 characters.' });
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'Passwords do not match.' });
            return;
        }

        setSaving(true);
        setPasswordMessage({ type: '', text: '' });

        try {
            const res = await api.put('/api/users/password', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });

            if (res.data.success) {
                setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            }
        } catch (err) {
            console.error('Password update failed:', err);
            setPasswordMessage({
                type: 'error',
                text: err.response?.data?.message || 'Failed to change password.'
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20">
            {/* Elegant Header */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors text-slate-500"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight">Account Settings</h1>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <div className="bg-emerald-500 p-1.5 rounded-lg shadow-lg shadow-emerald-100">
                            <img src={logo} alt="Logo" className="w-4 h-4 invert brightness-0" />
                        </div>
                        <span className="text-sm font-black tracking-tight text-slate-900 hidden sm:block">
                            Chakula<span className="text-emerald-500">Konnect</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Sidebar - Profile Summary */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200/60 shadow-sm text-center">
                            <div className="relative inline-block mb-6">
                                <div className="w-32 h-32 rounded-[2rem] bg-emerald-100 flex items-center justify-center text-emerald-700 text-4xl font-black border-4 border-white shadow-2xl">
                                    {user?.fullName?.[0]}
                                </div>
                                <button className="absolute bottom-0 right-0 p-2.5 bg-slate-900 text-white rounded-xl shadow-xl hover:bg-emerald-500 transition-colors border-2 border-white">
                                    <Camera size={16} />
                                </button>
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-1">{user?.fullName}</h2>
                            <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-6">
                                {user?.userType === 'seller' ? 'Verified Enterprise Seller' : 'Premium Market Consumer'}
                            </p>

                            <div className="space-y-3 pt-6 border-t border-slate-50">
                                <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Status</span>
                                    <div className="flex items-center gap-1.5 text-emerald-600">
                                        <ShieldCheck size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trust Score</span>
                                    <span className="text-xs font-black text-slate-900">98/100</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-[80px] opacity-20 -mr-10 -mt-10"></div>
                            <h3 className="text-lg font-black mb-4 relative z-10">Security Tip</h3>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed relative z-10">
                                Regularly update your phone number and address to ensure seamless delivery and pickup coordination.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Edit Form */}
                    <div className="lg:col-span-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Personal Info Card */}
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200/60 shadow-sm">
                                <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3">
                                    <User size={20} className="text-emerald-500" />
                                    Personal Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                                            <input
                                                required
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                placeholder="e.g. Musa Ibrahim"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all shadow-inner"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                                            <input
                                                required
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                placeholder="e.g. +234 800 000 0000"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all shadow-inner"
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address (Read Only)</label>
                                        <div className="relative group opacity-60 cursor-not-allowed">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <input
                                                readOnly
                                                type="email"
                                                value={user?.email}
                                                className="w-full bg-slate-100 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Location Card */}
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200/60 shadow-sm">
                                <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3">
                                    <MapPin size={20} className="text-emerald-500" />
                                    Logistics & Location
                                </h3>

                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Street Address</label>
                                        <div className="relative group">
                                            <MapPin className="absolute left-4 top-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                                            <textarea
                                                required
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                rows="3"
                                                placeholder="Enter your detailed street address..."
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all shadow-inner resize-none"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">City</label>
                                            <input
                                                required
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                placeholder="e.g. Ikeja"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all shadow-inner"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">State</label>
                                            <input
                                                required
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                placeholder="e.g. Lagos"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all shadow-inner"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status Message */}
                            {message.text && (
                                <div className={`p-6 rounded-[2rem] flex items-center gap-4 animate-shake ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                                    }`}>
                                    {message.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                                    <span className="text-sm font-black uppercase tracking-widest">{message.text}</span>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-200 hover:bg-emerald-600 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:translate-y-0"
                                >
                                    {saving ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Syncing Changes...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Update Profile
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="px-10 py-5 bg-white border border-slate-200 rounded-2xl text-slate-500 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95"
                                >
                                    Discard Changes
                                </button>
                            </div>
                        </form>

                        {/* Change Password Section - Primary for Seller */}
                        <div className="mt-16 space-y-8">
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200/60 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>

                                <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3 relative z-10">
                                    <Lock size={20} className="text-emerald-500" />
                                    Security & Authentication
                                </h3>

                                <form onSubmit={handlePasswordSubmit} className="space-y-6 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                                            <div className="relative group">
                                                <input
                                                    required
                                                    type={showPasswords.current ? "text" : "password"}
                                                    value={passwordData.currentPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                    placeholder="••••••••"
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all shadow-inner"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500"
                                                >
                                                    {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        <div></div> {/* Spacer */}

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                                            <div className="relative group">
                                                <input
                                                    required
                                                    type={showPasswords.new ? "text" : "password"}
                                                    value={passwordData.newPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                    placeholder="Minimum 8 characters"
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all shadow-inner"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500"
                                                >
                                                    {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                                            <div className="relative group">
                                                <input
                                                    required
                                                    type={showPasswords.confirm ? "text" : "password"}
                                                    value={passwordData.confirmPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                    placeholder="••••••••"
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all shadow-inner"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500"
                                                >
                                                    {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {passwordMessage.text && (
                                        <div className={`p-4 rounded-xl flex items-center gap-3 animate-shake ${passwordMessage.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                                            }`}>
                                            {passwordMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                            <span className="text-[11px] font-black uppercase tracking-widest">{passwordMessage.text}</span>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all disabled:opacity-50"
                                    >
                                        Update Password
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                .animate-shake {
                    animation: shake 0.4s ease-in-out;
                }
            `}} />
        </div>
    );
}

export default SellerProfile;
