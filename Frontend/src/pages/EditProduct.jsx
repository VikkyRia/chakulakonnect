import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import {
    ChevronLeft,
    Save,
    Image as ImageIcon,
    X,
    ChevronDown,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Info,
    Trash2,
    Plus
} from 'lucide-react';

function EditProduct() {
    const { foodId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // We'll try to find it in the "my-listings" first or fetch directly
                // Based on user request, let's assume we can fetch by ID directly
                const res = await api.get(`/api/foods/seller/my-listings`);
                if (res.data.success) {
                    const product = res.data.data.listings.find(item => (item.id || item._id) === foodId);
                    if (product) {
                        setFormData({
                            name: product.name || '',
                            description: product.description || '',
                            category: product.category || 'Vegetables',
                            price: product.price || '',
                            quantity: product.quantity || '',
                            unit: product.unit || 'kg',
                            images: product.images?.length ? product.images : [''],
                            location: {
                                address: product.location?.address || '',
                                city: product.location?.city || '',
                                state: product.location?.state || ''
                            },
                            status: product.status || 'available',
                            nutritionInfo: {
                                calories: product.nutritionInfo?.calories || '',
                                protein: product.nutritionInfo?.protein || '',
                                carbs: product.nutritionInfo?.carbs || ''
                            }
                        });
                    } else {
                        setError('Product not found in your listings.');
                    }
                }
            } catch (err) {
                console.error('Failed to fetch product:', err);
                setError('Could not load product details.');
            } finally {
                setIsFetching(false);
            }
        };

        fetchProduct();
    }, [foodId]);

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

        try {
            const res = await api.put(`/api/foods/${foodId}`, payload);
            if (res.data.success) {
                setSuccess(true);
                setTimeout(() => navigate('/seller-dashboard/list'), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update product. Please check your inputs.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
            </div>
        );
    }

    if (success) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl text-center border border-slate-100 max-w-md w-full animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                        <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-25"></div>
                        <CheckCircle2 className="w-12 h-12 text-emerald-500 relative z-10" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Changes Saved!</h2>
                    <p className="text-slate-500 font-medium leading-relaxed">Your listing has been successfully updated.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
            {/* Top Navigation Bar */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 h-20 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-50 shrink-0">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/seller-dashboard/list')}
                        className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900"
                    >
                        <ChevronLeft size={22} />
                    </button>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Editing Listing</span>
                        <h1 className="text-lg font-black text-slate-900 leading-none">{formData.name || 'Product Details'}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/seller-dashboard/list')}
                        className="px-6 py-2.5 rounded-xl text-slate-500 font-bold hover:bg-slate-100 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-8 py-2.5 rounded-xl bg-emerald-500 text-white font-black hover:bg-emerald-600 shadow-xl shadow-emerald-200/50 transition-all flex items-center gap-2 group active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Save Changes
                    </button>
                </div>
            </header>

            <main className="flex-1 p-8 lg:p-12 max-w-7xl w-full mx-auto">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-8">
                        {error && (
                            <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 font-bold flex items-center gap-4 animate-in slide-in-from-top-4 duration-300">
                                <AlertCircle size={20} />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

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
                                        className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-6 py-4 focus:bg-white focus:border-emerald-500 transition-all outline-none font-bold text-slate-900 text-lg"
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Product Description</label>
                                    <textarea
                                        required
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="6"
                                        className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-6 py-4 focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium text-slate-600 resize-none leading-relaxed"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Product Visuals</h3>
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {formData.images.map((url, index) => (
                                        <div key={index} className="space-y-3 relative group">
                                            <div className="h-48 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden relative transition-all group-hover:border-emerald-200 group-hover:bg-emerald-50/30">
                                                {url ? (
                                                    <img src={url} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-2 text-slate-300">
                                                        <ImageIcon size={32} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Preview</span>
                                                    </div>
                                                )}
                                                {formData.images.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImageField(index)}
                                                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-xl text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                )}
                                            </div>
                                            <input
                                                type="url"
                                                value={url}
                                                onChange={(e) => handleImageChange(index, e.target.value)}
                                                placeholder="Image URL..."
                                                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white transition-all outline-none font-medium text-xs text-slate-600"
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                                                className="w-full bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white transition-all outline-none font-bold text-sm"
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
                                                className="w-full bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white transition-all outline-none font-bold text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                                <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                                    <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Nutritional Info</h3>
                                </div>
                                <div className="p-8 grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Calories</label>
                                        <input
                                            type="number"
                                            name="nutrition.calories"
                                            value={formData.nutritionInfo.calories}
                                            onChange={handleChange}
                                            className="w-full bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white transition-all outline-none font-bold text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Protein</label>
                                        <input
                                            type="number"
                                            name="nutrition.protein"
                                            value={formData.nutritionInfo.protein}
                                            onChange={handleChange}
                                            className="w-full bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white transition-all outline-none font-bold text-sm"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Carbs</label>
                                        <input
                                            type="number"
                                            name="nutrition.carbs"
                                            value={formData.nutritionInfo.carbs}
                                            onChange={handleChange}
                                            className="w-full bg-slate-100/50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white transition-all outline-none font-bold text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
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
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:bg-white transition-all outline-none font-black text-slate-700 appearance-none cursor-pointer"
                                        >
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Publication Status</label>
                                    {[
                                        { id: 'available', label: 'In Stock / Available', color: 'bg-emerald-500' },
                                        { id: 'surplus', label: 'Surplus (Quick Sale)', color: 'bg-amber-500' },
                                        { id: 'out_of_stock', label: 'Out of Stock', color: 'bg-slate-300' }
                                    ].map((status) => (
                                        <label
                                            key={status.id}
                                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.status === status.id ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-50 hover:bg-slate-50'}`}
                                            onClick={() => setFormData(prev => ({ ...prev, status: status.id }))}
                                        >
                                            <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                                            <span className="text-[13px] font-black">{status.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

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
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:bg-white font-black"
                                        />
                                        <select
                                            name="unit"
                                            value={formData.unit}
                                            onChange={handleChange}
                                            className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 font-black"
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
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-5 focus:bg-white text-2xl font-black"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                            <Info className="text-emerald-400 mb-4" size={24} />
                            <h4 className="font-extrabold text-sm mb-2">Editor Mode</h4>
                            <p className="text-[11px] text-slate-400 italic">You are currently updating an existing product. These changes will reflect immediately in the marketplace.</p>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default EditProduct;
