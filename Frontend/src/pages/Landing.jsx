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
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const features = [
    { icon: <div className="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-green-100/70 border border-green-200 shadow-sm"><img src={priceImg} alt="Predictive Sourcing" className="w-6 h-6 opacity-80" /></div>, title: 'Predictive Sourcing', desc: ' Our AI predicts demand to ensure sellers only provide what is needed, reducing waste by 40%.' },
    { icon: <div className="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-green-100/70 border border-green-200 shadow-sm"><img src={pricingImg} alt="Transparent Pricing" className="w-6 h-6 opacity-80" /></div>, title: 'Transparent Pricing', desc: ' Smart contracts ensure sellers get paid instantly and fairly, without hidden commissions.' },
    { icon: <div className="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-green-100/70 border border-green-200 shadow-sm"><img src={havestImg} alt="Traceable Harvest" className="w-6 h-6 opacity-80" /></div>, title: 'Traceable Harvest', desc: ' Every item is tracked from seed to shelf.Know exactly which seller provided your dinner.' }
  ];

  const categories = [
    { emoji: '🥬', name: 'Vegetables' },
    { emoji: '🍎', name: 'Fruits' },
    { emoji: '🌿', name: 'Herbs' },
    { emoji: '🌾', name: 'Grains' },
    { emoji: '🥕', name: 'Organic' },
    { emoji: '📦', name: 'Packages' }
  ];

  const products = [
    { image: '🍅', name: 'Crispy Harvested', price: '$8.50' },
    { image: '🥒', name: 'Indian Herbs', price: '$7.20' },
    { image: '🥬', name: 'Microgreens', price: '$6.00' },
    { image: '🌶️', name: 'Spicy Padi', price: '$9.30' }
  ];

  return (
    <div className="bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <img src={logo} alt="ChakulaKonnect Logo" className="w-6 h-6" />
            </div>
            <span className="text-lg font-bold">
              <span className="text-black">Chakula</span>
              <span className="text-green-600">Konnect</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate('/categories')} className="text-gray-800 font-medium text-sm hover:text-green-600">Buy Marketplace</button>
            <button onClick={() => navigate('/sellers')} className="text-gray-800 font-medium text-sm hover:text-green-600">Our sellers</button>
            <button onClick={() => navigate('/about')} className="text-gray-800 font-medium text-sm hover:text-green-600">About Chakulakonnect</button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2" style={{ width: '256px', height: '38px' }}>
              <Search size={18} className="text-gray-500" />
              <input type="text" placeholder="Search products..." className="bg-gray-100 outline-none text-sm text-gray-700 placeholder-gray-500 flex-1" />
            </div>
            <button onClick={() => navigate('/login')} className="text-gray-700 text-sm font-medium hover:text-gray-900">
              Login
            </button>
            <button onClick={() => navigate('/register')} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-yellow-100 rounded-full text-xs font-semibold text-yellow-800">
                ✓ AI-POWERED FRESHNESS GUARANTEED
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
                Smart food access, linking <span className="text-green-600">sellers</span>
                <span className=''> to households.</span>
              </h1>

              <p className="text-gray-600 text-lg max-w-md">
                Connect with reliable sellers and access fresh, quality products directly. Smart logistics, fair pricing, and verified quality every time.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => navigate('/categories')} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  Shop Marketplace <ChevronRight size={20} />
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-6 py-3 border-2 border-gray-800 text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Join as Seller
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                <div className="flex -space-x-3">
                  <img src={smilingImg} alt="User 1" className="w-8 h-8 rounded-full border-2 border-white shadow" />
                  <img src={imgImg} alt="User 2" className="w-8 h-8 rounded-full border-2 border-white shadow" />
                  <img src={youngImg} alt="User 3" className="w-8 h-8 rounded-full border-2 border-white shadow" />
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-gray-700 font-semibold text-xs shadow">+5k</div>
                </div>
                <span className="ml-3 text-gray-500 font-medium">Growing community of <span className="font-bold text-gray-900">5,000+ users</span></span>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center items-stretch">
              <div className="relative w-full">
                <img src={farmerImg} alt="Farmer" className="w-full h-full rounded-2xl object-cover" />

                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg" style={{ width: '544px', height: '82px' }}>
                  <div className="flex items-center gap-4 p-4 h-full">
                    <CheckCircle size={32} className="text-green-600 shrink-0" />
                    <div className="flex flex-col justify-center">
                      <p className="font-semibold text-gray-900 text-sm">AI Quality Verified</p>
                      <p className="text-gray-600 text-xs">Freshness checked by ChakulaAI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explore Marketplace */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-baseline mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Explore Marketplace</h2>
              <p className="text-gray-600 text-sm mt-1">Browse our collection of fresh products</p>
            </div>
            <a href="/categories" className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1">
              Explore Categories <ChevronRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Product images with overlayed centered white text */}
            {[
              { src: '/src/assets/image/fruits.png', label: 'Fruits' },
              { src: '/src/assets/image/Fresh green vegetables.png', label: 'Vegetables' },
              { src: '/src/assets/image/Organic eggs.png', label: 'Poultry' },
              { src: '/src/assets/image/Fresh baked bread.png', label: 'Bakery' },
              { src: '/src/assets/image/Raw meat.png', label: 'Meat' },
              { src: '/src/assets/image/Honey jar.png', label: 'Grains' }
            ].map((item, idx) => (
              <div key={idx} className="relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition aspect-square flex items-center justify-center">
                <img src={item.src} alt={item.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Harvests */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-baseline mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Listings</h2>
              <p className="text-gray-600 text-sm mt-1">Trending products this week</p>
            </div>
            <div className="flex bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <button className="px-6 py-2 bg-green-500 text-white font-semibold focus:outline-none">All</button>
              <button className="px-6 py-2 text-gray-500 font-semibold focus:outline-none">Protein</button>
              <button className="px-6 py-2 text-gray-500 font-semibold focus:outline-none">Vitamins</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Sample featured products with correct images and price styling */}
            {[
              {
                img: '/src/assets/image/apples.png', // Apple image
                tag: 'HOT DEAL',
                name: 'Crisp Honeycrisp',
                price: '$2.99',
                unit: '/kg',
                seller: 'Nyeri Organic Hub'
              },
              {
                img: '/src/assets/image/potatoes.png', // Potato image
                tag: '',
                name: 'Yukon Gold Potatoes',
                price: '$1.20',
                unit: '/kg',
                seller: 'Rift Valley Sellers'
              },
              {
                img: '/src/assets/image/lettuce.png', // Lettuce image
                tag: 'BUNDLE',
                name: 'Butterhead Lettuce',
                price: '$1.50',
                unit: '/unit',
                seller: 'Green Garden Sellers'
              },
              {
                img: '/src/assets/image/tomatoes.png', // Tomato image
                tag: '',
                name: 'Ruby Red Tomatoes',
                price: '$3.50',
                unit: '/kg',
                seller: 'Sunrise Collective'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="relative">
                  <img src={item.img} alt={item.name} className="w-full h-48 object-cover" />
                  {item.tag && (
                    <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-3 py-1 rounded">{item.tag}</span>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 text-base truncate">{item.name}</span>
                    <span className="text-green-600 font-bold text-sm">
                      {item.price} <span className="text-gray-400 font-normal">{item.unit}</span>
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-4">{item.seller}</div>
                  <button className="mt-auto w-full bg-gray-100 hover:bg-green-600 hover:text-white text-gray-900 font-semibold py-2 rounded transition">Quick Add</button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/categories')}
              className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center justify-center gap-1 underline decoration-green-600 underline-offset-4"
            >
              Browse Full Marketplace <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Consumer Portal */}
            <div>
              <div className="text-3xl mb-4">🛒</div>
              <h3 className="text-2xl font-bold text-white mb-3">Consumer Portal</h3>
              <p className="text-gray-400 mb-6">
                Shop fresh produce directly from local farmers. Transparent pricing, quality guaranteed, and farm-to-table freshness.
              </p>
              <button onClick={() => navigate('/register')} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition">
                Start Shopping
              </button>
            </div>

            {/* Partner Hub */}
            <div>
              <div className="text-3xl mb-4">🌾</div>
              <h3 className="text-2xl font-bold text-white mb-3">Partner Hub</h3>
              <p className="text-gray-400 mb-6">
                Are you a farmer or vendor? Join our network and reach customers directly. Fair pricing, zero middlemen.
              </p>
              <button className="px-6 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-lg font-semibold transition">
                Join as Partner
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 items-start">
            {/* Logo and Description */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <img src={logo} alt="ChakulaKonnect Logo" className="w-6 h-6" />
                </div>
                <span className="font-bold text-2xl"><span className="text-black">Chakula</span><span className="text-green-500">Konnect</span></span>
              </div>
              <p className="text-gray-500 text-sm mb-4">The ultimate AI-powered ecosystem connecting sellers and consumers for a more sustainable food future.</p>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 text-xl"><i className="fa fa-facebook"></i></a>
                <a href="https://chakulakonnect.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 text-xl"><i className="fa fa-globe"></i></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 text-xl"><i className="fa fa-camera"></i></a>
              </div>
            </div>
            {/* Ecosystem */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Ecosystem</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><button onClick={() => navigate('/categories')} className="hover:text-green-600">Marketplace</button></li>
                <li><a href="/seller-network" className="hover:text-green-600">Seller Network</a></li>
                <li><a href="/ai-freshness-tracker" className="hover:text-green-600">AI Freshness Tracker</a></li>
              </ul>
            </div>
            {/* Support */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><a href="/help-center" className="hover:text-green-600">Help Center</a></li>
                <li><a href="/logistics-partner" className="hover:text-green-600">Logistics Partner</a></li>
                <li><a href="/privacy" className="hover:text-green-600">Privacy</a></li>
              </ul>
            </div>
            {/* Stay Connected */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Stay Connected</h4>
              <p className="text-gray-500 text-sm mb-4">Join our newsletter for weekly harvest alerts from our sellers.</p>
              <form className="flex gap-2">
                <input type="email" placeholder="Email address" className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200 text-sm flex-1" />
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-lg">&gt;</button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2026 ChakulaKonnect AI-Agri. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="/privacy-policy" className="text-gray-400 hover:text-gray-600 text-sm">Privacy Policy</a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-gray-600 text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
