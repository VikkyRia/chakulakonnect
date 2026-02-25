import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';
import { isAuthenticated, getCurrentUser } from '../utils/auth';
import {
    User,
    Mail,
    Phone,
    MapPin,
    ArrowLeft,
    CheckCircle2,
    AlertCircle,
    Lock,
    Eye,
    EyeOff,
    Settings,
    Shield,
    Bell
} from 'lucide-react';
import logo from '../assets/image/SVG.png';

function ProfileSettings() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
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
                        city: localUser.location?.city || '',
                        state: localUser.location?.state || ''
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (message.text) setMessage({ type: '', text: '' });
    };

    const handleProfileSubmit = async (e) => {
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
                setMessage({ type: 'success', text: 'Changes saved successfully!' });
                const updatedUser = { ...user, ...payload };
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                setUser(updatedUser);
                setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            }
        } catch (err) {
            setMessage({
                type: 'error',
                text: err.response?.data?.message || 'Update failed'
            });
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword.length < 8) {
            setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        setSaving(true);
        try {
            const res = await api.put('/api/users/password', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });

            if (res.data.success) {
                setMessage({ type: 'success', text: 'Password updated!' });
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            }
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Password change failed' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    const isNested = location.pathname.startsWith('/seller-dashboard');

    return (
        <div className={`flex-1 flex flex-col ${!isNested ? 'min-h-screen bg-[#F8FAFC]' : 'h-full overflow-y-auto'}`}>
            {/* Header - Only show if not nested */}
            {!isNested && (
                <div className="bg-white border-b border-slate-100 sticky top-0 z-50 shrink-0">
                    <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group">
                            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                            <span className="text-sm font-bold">Back</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="Logo" className="w-5 h-5" />
                            <span className="text-sm font-black tracking-tight text-slate-900">Settings</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Simplified Sidebar Navigation */}
                    <div className="w-full md:w-64 shrink-0 space-y-1">
                        <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Account</h2>
                        {[
                            { id: 'profile', label: 'My Profile', icon: User },
                            { id: 'security', label: 'Security', icon: Shield },
                            { id: 'notifications', label: 'Notifications', icon: Bell },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setMessage({ type: '', text: '' }); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100'
                                    : 'text-slate-500 hover:bg-slate-100'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Main Content Card */}
                    <div className="flex-1">
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10">
                            {activeTab === 'profile' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center gap-6 mb-10">
                                        <div className="w-20 h-20 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 text-2xl font-black border-2 border-emerald-100">
                                            {user?.fullName?.[0]}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900">{user?.fullName}</h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                                                {user?.userType} Account
                                            </p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleFormChange}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold focus:bg-white focus:border-emerald-500 transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                                                <input
                                                    type="tel"
                                                    name="phoneNumber"
                                                    value={formData.phoneNumber}
                                                    onChange={handleFormChange}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold focus:bg-white focus:border-emerald-500 transition-all outline-none"
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                                                <div className="flex items-center gap-3 bg-slate-100/50 border border-slate-100 rounded-xl px-4 py-3.5 text-slate-400">
                                                    <Mail size={16} />
                                                    <span className="text-sm font-bold">{user?.email}</span>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 space-y-1.5 pt-4">
                                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-50 pb-2">Location Details</h4>
                                                <div className="space-y-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Street Address</label>
                                                        <input
                                                            type="text"
                                                            name="address"
                                                            value={formData.address}
                                                            onChange={handleFormChange}
                                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold focus:bg-white focus:border-emerald-500 transition-all outline-none"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">City</label>
                                                            <input
                                                                type="text"
                                                                name="city"
                                                                value={formData.city}
                                                                onChange={handleFormChange}
                                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold focus:bg-white focus:border-emerald-500 transition-all outline-none"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">State</label>
                                                            <input
                                                                type="text"
                                                                name="state"
                                                                value={formData.state}
                                                                onChange={handleFormChange}
                                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold focus:bg-white focus:border-emerald-500 transition-all outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {message.text && (
                                            <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                                {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                                <span className="text-xs font-black uppercase tracking-widest">{message.text}</span>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="w-full py-4 bg-slate-900 border border-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 hover:border-emerald-600 transition-all active:scale-[0.98] disabled:opacity-50 mt-4"
                                        >
                                            {saving ? 'Saving Changes...' : 'Save Settings'}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-xl font-black text-slate-900 mb-2">Update Password</h3>
                                    <p className="text-sm font-medium text-slate-400 mb-10">Keep your account secure with a strong password.</p>

                                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPasswords.current ? "text" : "password"}
                                                    value={passwordData.currentPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold focus:bg-white focus:border-emerald-500 transition-all outline-none"
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

                                        <div className="space-y-6 pt-4 border-t border-slate-50">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                                                <div className="relative">
                                                    <input
                                                        type={showPasswords.new ? "text" : "password"}
                                                        value={passwordData.newPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold focus:bg-white focus:border-emerald-500 transition-all outline-none"
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
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                                                <div className="relative">
                                                    <input
                                                        type={showPasswords.confirm ? "text" : "password"}
                                                        value={passwordData.confirmPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold focus:bg-white focus:border-emerald-500 transition-all outline-none"
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

                                        {message.text && (
                                            <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                                {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                                <span className="text-xs font-black uppercase tracking-widest">{message.text}</span>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="w-full py-4 bg-slate-900 border border-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 hover:border-emerald-600 transition-all active:scale-[0.98] disabled:opacity-50"
                                        >
                                            {saving ? 'Updating...' : 'Update Password'}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 py-10 text-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                        <Bell size={28} />
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900">Notification Channels</h3>
                                    <p className="text-sm font-medium text-slate-400 mt-2 max-w-xs mx-auto">
                                        Customize how you receive updates about orders and market prices. Coming soon!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileSettings;
