import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import {
    ChevronLeft,
    Plus,
    Image as ImageIcon,
    MapPin,
    Package,
    DollarSign,
    Tag,
    Type,
    Info,
    Loader2,
    CheckCircle2,
    X,
    ChevronDown,
    LayoutGrid,
    History,
    AlertCircle
} from 'lucide-react';
import logo from '../assets/image/SVG.png';

function AddProduct() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Vegetables',
        price: '',
        quantity: '',
        unit: 'kg',
        images: [''],
        location: {
            address: '',
            city: '',
            state: ''
        },
        status: 'available',
        nutritionInfo: {
            calories: '',
            protein: '',
            carbs: ''
        }
    });

    const categories = ['Vegetables', 'Fruits', 'Grains', 'Tubers', 'Protein', 'Dairy', 'Organic'];
    const units = ['kg', 'g', 'bunch', 'piece', 'liter', 'crate', 'bag'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('location.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                location: { ...prev.location, [field]: value }
            }));
        } else if (name.includes('nutrition.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                nutritionInfo: { ...prev.nutritionInfo, [field]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    const addImageField = () => {
        setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
    };

    const removeImageField = (index) => {
        if (formData.images.length > 1) {
            const newImages = formData.images.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, images: newImages }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const payload = {
            ...formData,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
            images: formData.images.filter(img => img.trim() !== ''),
            nutritionInfo: {
                calories: formData.nutritionInfo.calories ? Number(formData.nutritionInfo.calories) : undefined,
                protein: formData.nutritionInfo.protein ? Number(formData.nutritionInfo.protein) : undefined,
                carbs: formData.nutritionInfo.carbs ? Number(formData.nutritionInfo.carbs) : undefined,
            }
        };

        if (payload.images.length === 0) {
            setError('At least one image URL is required.');
            setIsLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        try {
            const res = await api.post('/api/foods', payload);
            if (res.data.success) {
                setSuccess(true);
                setTimeout(() => navigate('/seller-dashboard'), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add product. Please check your inputs.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl text-center border border-slate-100 max-w-md w-full animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                        <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-25"></div>
                        <CheckCircle2 className="w-12 h-12 text-emerald-500 relative z-10" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Product Published!</h2>
                    <p className="text-slate-500 font-medium leading-relaxed">Your listing is now live. We're taking you back to your shop dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24">
            {/* Top Navigation Bar */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate('/seller-dashboard')}
                            className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900"
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Marketplace</span>
                            <h1 className="text-lg font-black text-slate-900 leading-none">Add New Product</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/seller-dashboard')}
                            className="px-6 py-2.5 rounded-xl text-slate-500 font-bold hover:bg-slate-100 transition-all"
                        >
                            Discard
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="px-8 py-2.5 rounded-xl bg-emerald-500 text-white font-black hover:bg-emerald-600 shadow-xl shadow-emerald-200/50 transition-all flex items-center gap-2 group active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                            Publish Item
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pt-10">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Main Content Column */}
                    <div className="lg:col-span-8 space-y-8">
                        {error && (
                            <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 font-bold flex items-center gap-4 animate-in slide-in-from-top-4 duration-300">
                                <AlertCircle size={20} />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        {/* General Info Card */}
                        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/30">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Product Description</h3>
                            </div>
                            <div className="p-8 space-y-8">
                                <div>
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Product Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Premium Organic Red Tomatoes"
                                        className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-6 py-4 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all outline-none font-bold text-slate-900 text-lg placeholder:text-slate-300"
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Product Description</label>
                                    <textarea
                                        required
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe the freshness, farm location, or any unique selling points..."
                                        rows="6"
                                        className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-6 py-4 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all outline-none font-medium text-slate-600 resize-none leading-relaxed placeholder:text-slate-300"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Media Card */}
                        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Product Visuals</h3>
                                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-bold uppercase tracking-widest">Minimal 1 Image</span>
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {formData.images.map((url, index) => (
                                        <div key={index} className="space-y-3 relative group">
                                            <div className="h-48 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden relative transition-all group-hover:border-emerald-200 group-hover:bg-emerald-50/30">
                                                {url ? (
                                                    <img src={url} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-2 text-slate-300">
                                                        <ImageIcon size={32} strokeWidth={1.5} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Preview</span>
                                                    </div>
                                                )}
                                                {formData.images.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImageField(index)}
                                                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-xl shadow-lg shadow-slate-200/50 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                )}
                                            </div>
                                            <input
                                                required={index === 0}
                                                type="url"
                                                value={url}
                                                onChange={(e) => handleImageChange(index, e.target.value)}
                                                placeholder="Image URL..."
                                                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium text-xs text-slate-600 placeholder:text-slate-300"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addImageField}
                                        className="h-48 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-500 transition-all"
                                    >
                                        <Plus size={24} />
                                        <span className="text-[11px] font-black uppercase tracking-widest">Add Image</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Location & Nutrition Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Pickup location */}
                            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                                <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/30">
                                    <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Inventory Location</h3>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Address</label>
                                        <input
                                            required
                                            type="text"
                                            name="location.address"
                                            value={formData.location.address}
                                            onChange={handleChange}
                                            placeholder="Street No, Area"
                                            className="w-full bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:border-emerald-500 transition-all outline-none font-bold text-sm"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">City</label>
                                            <input
                                                required
                                                type="text"
                                                name="location.city"
                                                value={formData.location.city}
                                                onChange={handleChange}
                                                className="w-full bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:border-emerald-500 transition-all outline-none font-bold text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">State</label>
                                            <input
                                                required
                                                type="text"
                                                name="location.state"
                                                value={formData.location.state}
                                                onChange={handleChange}
                                                className="w-full bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:border-emerald-500 transition-all outline-none font-bold text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Nutrition */}
                            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                                <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                                    <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Nutritional Info</h3>
                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Optional</span>
                                </div>
                                <div className="p-8 grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Calories</label>
                                        <input
                                            type="number"
                                            name="nutrition.calories"
                                            value={formData.nutritionInfo.calories}
                                            onChange={handleChange}
                                            placeholder="kcal"
                                            className="w-full bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:border-emerald-500 transition-all outline-none font-bold text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Protein</label>
                                        <input
                                            type="number"
                                            name="nutrition.protein"
                                            value={formData.nutritionInfo.protein}
                                            onChange={handleChange}
                                            placeholder="grams"
                                            className="w-full bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:border-emerald-500 transition-all outline-none font-bold text-sm"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Carbohydrates</label>
                                        <input
                                            type="number"
                                            name="nutrition.carbs"
                                            value={formData.nutritionInfo.carbs}
                                            onChange={handleChange}
                                            placeholder="grams"
                                            className="w-full bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:border-emerald-500 transition-all outline-none font-bold text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Status & Category Card */}
                        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/30">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Classification</h3>
                            </div>
                            <div className="p-8 space-y-8">
                                <div>
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Category</label>
                                    <div className="relative">
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:bg-white focus:border-emerald-500 transition-all outline-none font-black text-slate-700 appearance-none cursor-pointer"
                                        >
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Publication Status</label>
                                    <div className="space-y-3">
                                        {[
                                            { id: 'available', label: 'In Stock / Available', color: 'bg-emerald-500' },
                                            { id: 'surplus', label: 'Surplus (Quick Sale)', color: 'bg-amber-500' },
                                            { id: 'out_of_stock', label: 'Coming Soon / Out of Stock', color: 'bg-slate-300' }
                                        ].map((status) => (
                                            <label
                                                key={status.id}
                                                className={`flex items-center gap-4 px-5 py-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.status === status.id ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-50 hover:bg-slate-50'}`}
                                                onClick={() => setFormData(prev => ({ ...prev, status: status.id }))}
                                            >
                                                <div className={`w-3 h-3 rounded-full ${status.color} shadow-sm shadow-black/5`}></div>
                                                <span className={`text-[13px] font-black ${formData.status === status.id ? 'text-emerald-700' : 'text-slate-600'}`}>{status.label}</span>
                                                <input type="radio" name="status" value={status.id} checked={formData.status === status.id} onChange={handleChange} className="hidden" />
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing Card */}
                        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden ring-4 ring-emerald-500/5">
                            <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/30">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Pricing & Stock</h3>
                            </div>
                            <div className="p-8 space-y-8">
                                <div>
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Total Supply</label>
                                    <div className="flex gap-4">
                                        <input
                                            required
                                            type="number"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            placeholder="0"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:bg-white focus:border-emerald-500 transition-all outline-none font-black text-slate-900"
                                        />
                                        <select
                                            name="unit"
                                            value={formData.unit}
                                            onChange={handleChange}
                                            className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus:bg-white focus:border-emerald-500 transition-all outline-none font-black text-slate-600 cursor-pointer"
                                        >
                                            {units.map(u => <option key={u} value={u}>{u}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Base Price (₦)</label>
                                    <div className="relative">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-lg font-black text-slate-300">₦</div>
                                        <input
                                            required
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-5 focus:bg-white focus:border-emerald-500 transition-all outline-none font-black text-2xl text-slate-900 tracking-tight placeholder:text-slate-200"
                                        />
                                    </div>
                                    <p className="mt-4 text-[10px] text-slate-400 font-medium leading-relaxed italic">
                                        Final price shown to customers will include service fees.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Help/Support */}
                        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <Info className="text-emerald-400 mb-4" size={24} />
                            <h4 className="font-extrabold text-sm mb-2">Need Help?</h4>
                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-6">
                                Freshness is our priority. Ensure your images clearly show the quality of your produce to attract more buyers.
                            </p>
                            <button type="button" className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black transition-all">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}


export default AddProduct;
