import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated, getCurrentUser } from '../utils/auth';
import { ChevronRight, Leaf, Users, Sprout, ArrowRight, Search, CheckCircle } from 'lucide-react';
import logo from '../assets/image/SVG.png';
import priceImg from '../assets/image/price.png';
import pricingImg from '../assets/image/pricing.png';
import havestImg from '../assets/image/havest.png';
import smilingImg from '../assets/image/smiling.png';
import imgImg from '../assets/image/Img.png';
import youngImg from '../assets/image/Young.png';
import farmerImg from '../assets/image/farmer.png';

function Landing() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const features = [
    { icon: <div className="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-emerald-50 border border-emerald-100 shadow-sm"><img src={priceImg} alt="Predictive Sourcing" className="w-6 h-6" /></div>, title: 'Predictive Sourcing', desc: 'Our AI predicts demand to ensure sellers only provide what is needed, reducing waste by 40%.' },
    { icon: <div className="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-emerald-50 border border-emerald-100 shadow-sm"><img src={pricingImg} alt="Transparent Pricing" className="w-6 h-6" /></div>, title: 'Transparent Pricing', desc: 'Smart contracts ensure sellers get paid instantly and fairly, without hidden commissions.' },
    { icon: <div className="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-emerald-50 border border-emerald-100 shadow-sm"><img src={havestImg} alt="Traceable Harvest" className="w-6 h-6" /></div>, title: 'Traceable Harvest', desc: 'Every item is tracked from seed to shelf. Know exactly which seller provided your dinner.' }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-[100] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
                <img src={logo} alt="Logo" className="w-6 h-6" />
              </div>
              <span className="text-xl font-black tracking-tighter">
                <span className="text-slate-900">Chakula</span>
                <span className="text-green-600">Konnect</span>
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              <button onClick={() => navigate('/categories')} className="text-slate-600 font-bold text-sm hover:text-green-600 transition-colors">Marketplace</button>
              <button onClick={() => navigate('/sellers')} className="text-slate-600 font-bold text-sm hover:text-green-600 transition-colors">Our Sellers</button>
              <button onClick={() => navigate('/about')} className="text-slate-600 font-bold text-sm hover:text-green-600 transition-colors">About Us</button>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-green-500/20 transition-all">
                <Search size={18} className="text-slate-400" />
                <input type="text" placeholder="Search fresh food..." className="bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400 w-full font-medium" />
              </div>
              <button onClick={() => navigate('/login')} className="text-slate-700 text-sm font-black hover:text-green-600 transition-colors px-4">Login</button>
              <button onClick={() => navigate('/register')} className="px-6 py-3 bg-slate-900 hover:bg-black text-white text-sm font-black rounded-xl transition-all shadow-xl hover:shadow-slate-200 active:scale-95">
                Join Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-slate-600 hover:text-green-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-5 flex flex-col justify-between overflow-hidden">
                <span className={`w-full h-0.5 bg-current rounded-full transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current rounded-full transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current rounded-full transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden bg-white border-b border-slate-100 transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen py-6 px-4 pb-10 border-t' : 'max-h-0 overflow-hidden'}`}>
          <div className="flex flex-col gap-6">
            <button onClick={() => { navigate('/categories'); setIsMenuOpen(false) }} className="text-left text-lg font-black text-slate-900 px-4">Marketplace</button>
            <button onClick={() => { navigate('/sellers'); setIsMenuOpen(false) }} className="text-left text-lg font-black text-slate-900 px-4">Our Sellers</button>
            <button onClick={() => { navigate('/about'); setIsMenuOpen(false) }} className="text-left text-lg font-black text-slate-900 px-4">About Us</button>
            <div className="h-px bg-slate-100 mx-4"></div>
            <div className="px-4 space-y-4">
              <button onClick={() => { navigate('/login'); setIsMenuOpen(false) }} className="w-full py-4 border border-slate-200 rounded-2xl font-black text-slate-900">Login</button>
              <button onClick={() => { navigate('/register'); setIsMenuOpen(false) }} className="w-full py-4 bg-green-600 text-white rounded-2xl font-black shadow-lg shadow-green-100">Create Account</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-32 lg:pt-20 lg:pb-40 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-emerald-50/50 rounded-l-[100px] hidden lg:block"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full text-[10px] font-black uppercase tracking-widest text-yellow-800 animate-in fade-in slide-in-from-left-4 duration-700">
                <CheckCircle size={14} /> AI-Powered Freshness Guaranteed
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Smart food access, linking <span className="text-green-600">sellers</span> to households.
              </h1>

              <p className="text-slate-500 text-lg sm:text-xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed italic">
                Connect with reliable sellers and access fresh, quality products directly. Smart logistics, fair pricing, and verified quality every time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={() => navigate('/categories')} className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-2xl shadow-green-200 active:scale-95 group">
                  Shop Marketplace <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black hover:bg-slate-900 hover:text-white transition-all active:scale-95 shadow-xl hover:shadow-slate-200"
                >
                  Join as Seller
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  <img src={smilingImg} alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-lg" />
                  <img src={imgImg} alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-lg" />
                  <img src={youngImg} alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-lg" />
                  <div className="w-10 h-10 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white font-black text-[10px] shadow-lg">+5k</div>
                </div>
                <p className="text-slate-600 font-medium">Joined by <span className="text-slate-900 font-black">5,000+ happy users</span> across Nigeria</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-green-600/5 rounded-[40px] blur-2xl group-hover:bg-green-600/10 transition-all"></div>
              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-[40px] shadow-2xl">
                <img src={farmerImg} alt="Farmer" className="w-full h-full object-cover grayscale-[20%] brightness-90 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="absolute -bottom-6 -left-6 sm:bottom-10 sm:left-10 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 w-[200px] sm:w-[300px] animate-in zoom-in-75 duration-1000">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                    <CheckCircle size={24} className="sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-black text-xs sm:text-base italic">AI Quality Verified</p>
                    <p className="text-slate-500 font-bold text-[8px] sm:text-xs uppercase tracking-widest italic">Freshness Checked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FeaturesSection */}
      <section className="py-20 bg-white border-y border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {features.map((feature, idx) => (
              <div key={idx} className="group text-center space-y-6">
                <div className="mx-auto transform group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight italic">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed italic">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Marketplace */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight italic">Explore Marketplace</h2>
              <p className="text-slate-500 font-medium mt-2 italic">Browse our collection of fresh products directly from local farms</p>
            </div>
            <button onClick={() => navigate('/categories')} className="group flex items-center gap-2 text-green-600 font-black text-sm uppercase tracking-widest italic whitespace-nowrap">
              Explore Categories <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { src: '/src/assets/image/fruits.png', label: 'Fruits' },
              { src: '/src/assets/image/Fresh green vegetables.png', label: 'Vegetables' },
              { src: '/src/assets/image/Organic eggs.png', label: 'Poultry' },
              { src: '/src/assets/image/Fresh baked bread.png', label: 'Bakery' },
              { src: '/src/assets/image/Raw meat.png', label: 'Meat' },
              { src: '/src/assets/image/Honey jar.png', label: 'Grains' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative aspect-square rounded-[32px] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
                onClick={() => navigate('/categories')}
              >
                <img src={item.src} alt={item.label} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-green-600/40 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <span className="text-white text-xl font-black tracking-tight italic drop-shadow-lg">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FeaturedHarvests */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight italic">Trending Harvests</h2>
              <p className="text-slate-500 font-medium mt-2 italic">Check out what's fresh and trending in your area today</p>
            </div>
            <div className="flex p-1.5 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden self-stretch sm:self-start">
              <button className="flex-1 sm:flex-none px-8 py-3 bg-white text-slate-900 font-black rounded-xl shadow-sm text-sm italic transition-all">All</button>
              <button className="flex-1 sm:flex-none px-8 py-3 text-slate-400 font-bold hover:text-slate-600 text-sm italic transition-all">Protein</button>
              <button className="flex-1 sm:flex-none px-8 py-3 text-slate-400 font-bold hover:text-slate-600 text-sm italic transition-all">Vitamins</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { img: '/src/assets/image/apples.png', tag: 'HOT DEAL', name: 'Crisp Honeycrisp', price: '$2.99', unit: '/kg', seller: 'Nyeri Organic Hub' },
              { img: '/src/assets/image/potatoes.png', tag: 'BEST VALUE', name: 'Yukon Gold Potatoes', price: '$1.20', unit: '/kg', seller: 'Rift Valley Sellers' },
              { img: '/src/assets/image/lettuce.png', tag: 'NEW', name: 'Butterhead Lettuce', price: '$1.50', unit: '/unit', seller: 'Green Garden' },
              { img: '/src/assets/image/tomatoes.png', tag: 'POPULAR', name: 'Ruby Red Tomatoes', price: '$3.50', unit: '/kg', seller: 'Sunrise Collective' }
            ].map((item, idx) => (
              <div key={idx} className="group bg-white rounded-[40px] border border-slate-100 hover:border-green-100 p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-green-100 flex flex-col">
                <div className="relative aspect-[16/11] rounded-[32px] overflow-hidden mb-6">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-400 text-slate-900 text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg italic">{item.tag}</span>
                  </div>
                </div>
                <div className="px-2 space-y-4 flex-1 flex flex-col">
                  <div>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight italic truncate mb-1">{item.name}</h4>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest italic">{item.seller}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-green-600 font-black text-lg italic">{item.price}</span>
                      <span className="text-slate-300 text-[10px] font-black uppercase italic">{item.unit}</span>
                    </div>
                    <button className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-green-600 transition-colors active:scale-95 shadow-lg group-hover:shadow-green-200">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20 text-center md:text-left">
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-900/40">
                  <img src={logo} alt="Logo" className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tighter"><span className="text-white">Chakula</span><span className="text-green-500">Konnect</span></span>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed italic">The ultimate AI-powered ecosystem connecting sellers and consumers for a more sustainable food future.</p>
            </div>

            <div>
              <h4 className="text-lg font-black italic mb-8">Ecosystem</h4>
              <ul className="space-y-4 text-slate-400 font-bold text-sm italic">
                <li><button onClick={() => navigate('/categories')} className="hover:text-green-400 transition-colors">Marketplace</button></li>
                <li><button className="hover:text-green-400 transition-colors">Seller Network</button></li>
                <li><button className="hover:text-green-400 transition-colors">AI Freshness Tracker</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-black italic mb-8">Support</h4>
              <ul className="space-y-4 text-slate-400 font-bold text-sm italic">
                <li><button className="hover:text-green-400 transition-colors">Help Center</button></li>
                <li><button className="hover:text-green-400 transition-colors">Logistics Hub</button></li>
                <li><button className="hover:text-green-400 transition-colors">Privacy & Terms</button></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-black italic mb-2">Join the revolution</h4>
              <p className="text-slate-400 text-sm font-medium italic">Sign up for weekly harvest alerts and fresh updates.</p>
              <div className="flex p-2 bg-white/5 border border-white/10 rounded-2xl focus-within:border-green-500/50 transition-colors">
                <input type="email" placeholder="Email" className="bg-transparent border-none outline-none px-4 text-sm w-full font-bold" />
                <button className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-green-900/20 active:scale-95 transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="h-px bg-white/5 mb-12"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 font-bold text-[10px] uppercase tracking-widest italic">
            <p>© 2026 ChakulaKonnect AI-Agri. Freshness guaranteed.</p>
            <div className="flex gap-8">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
