import { useNavigate } from 'react-router-dom';

function Landing() {
  // Hook to navigate to different pages
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">Chakula Konnect</h1>
          <p className="text-gray-600 text-sm">Connect Farmers, Vendors & Consumers</p>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          {/* Main Heading */}
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to Chakula Konnect
          </h2>

          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A platform connecting farmers, vendors, and consumers in one unified marketplace.
            Buy fresh produce, sell quality products, and grow your business today.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-600">
              <div className="text-4xl mb-3">👨‍🌾</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">For Farmers</h3>
              <p className="text-gray-600">
                Reach customers directly and sell your harvest at fair prices without intermediaries.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-600">
              <div className="text-4xl mb-3">🏪</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">For Vendors</h3>
              <p className="text-gray-600">
                Source quality products directly from farmers and manage your inventory efficiently.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-600">
              <div className="text-4xl mb-3">🛒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">For Consumers</h3>
              <p className="text-gray-600">
                Access fresh, quality products directly from farms and local vendors near you.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Create Account Button */}
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
            >
              Create Account
            </button>

            {/* Login Button */}
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-green-600 font-bold text-lg rounded-lg border-2 border-green-600 transition duration-200 shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Why Choose Chakula Konnect?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature */}
            <div className="text-center">
              <div className="text-3xl mb-3">✓</div>
              <h4 className="font-bold text-gray-800 mb-2">Direct Connection</h4>
              <p className="text-gray-600 text-sm">
                Connect directly with producers and consumers without intermediaries
              </p>
            </div>

            {/* Feature */}
            <div className="text-center">
              <div className="text-3xl mb-3">✓</div>
              <h4 className="font-bold text-gray-800 mb-2">Fair Pricing</h4>
              <p className="text-gray-600 text-sm">
                Transparent pricing that benefits everyone in the supply chain
              </p>
            </div>

            {/* Feature */}
            <div className="text-center">
              <div className="text-3xl mb-3">✓</div>
              <h4 className="font-bold text-gray-800 mb-2">Quality Assured</h4>
              <p className="text-gray-600 text-sm">
                Verified farmers and vendors ensure quality products every time
              </p>
            </div>

            {/* Feature */}
            <div className="text-center">
              <div className="text-3xl mb-3">✓</div>
              <h4 className="font-bold text-gray-800 mb-2">Easy to Use</h4>
              <p className="text-gray-600 text-sm">
                Simple and intuitive platform for all skill levels
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-12">
        <p className="text-sm">
          © 2026 Chakula Konnect. Connecting Communities, Growing Together.
        </p>
      </footer>
    </div>
  );
}

export default Landing;
