import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser, isAuthenticated } from '../utils/auth';

function Dashboard() {
  // State to store current user data
  const [user, setUser] = useState(null);

  // State to track loading
  const [loading, setLoading] = useState(true);

  // Hook to navigate to different pages
  const navigate = useNavigate();

  // useEffect hook to check authentication and get user data
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }

    // Get current user data
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    // Remove user session from localStorage
    logoutUser();

    // Redirect to login page
    navigate('/login');
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Chakula Konnect</h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome, {user?.fullName}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            You're successfully logged in to Chakula Konnect
          </p>
        </div>

        {/* User Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Card */}
          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg shadow p-6 border-l-4 border-green-600">
            <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
              Email Address
            </h3>
            <p className="text-2xl font-bold text-green-600">{user?.email}</p>
          </div>

          {/* Role Card */}
          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-lg shadow p-6 border-l-4 border-purple-600">
            <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
              User Role
            </h3>
            <p className="text-2xl font-bold text-purple-600">{user?.role}</p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Account Details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <p className="text-gray-600 font-medium">Full Name:</p>
              <p className="text-gray-800">{user?.fullName}</p>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <p className="text-gray-600 font-medium">Email:</p>
              <p className="text-gray-800">{user?.email}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600 font-medium">Role:</p>
              <p className="text-gray-800">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {user?.role}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Logout Button Section */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={handleLogout}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition duration-200"
          >
            Logout
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition duration-200"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
