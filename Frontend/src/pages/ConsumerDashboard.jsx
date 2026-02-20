import { useNavigate } from 'react-router-dom';
import logo from '../assets/image/SVG.png';

function ConsumerDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-2">
                            <img src={logo} alt="Logo" className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">Consumer Panel</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-red-600 font-medium hover:bg-red-50 px-4 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>
                </header>

                <main className="bg-white rounded-2xl p-8 shadow-md">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome, {user.fullName}!</h1>
                    <p className="text-gray-600 mb-8">You are logged in as a <span className="text-green-600 font-bold uppercase">{user.userType}</span>.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 border border-gray-100 rounded-xl bg-green-50">
                            <h2 className="text-lg font-semibold text-green-800 mb-2">Buy Fresh Produce</h2>
                            <p className="text-green-700">Explore farm-fresh products directly from local sellers.</p>
                        </div>
                        <div className="p-6 border border-gray-100 rounded-xl bg-blue-50">
                            <h2 className="text-lg font-semibold text-blue-800 mb-2">Order History</h2>
                            <p className="text-blue-700">Track and manage your recent purchases and deliveries.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ConsumerDashboard;
