import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function VerifyIdentity() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [email, setEmail] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get email from location state or fallback
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      setEmail('user@example.com');
    }
  }, [location.state]);

  useEffect(() => {
    // Timer countdown
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (idx, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[idx] = value;
    setCode(newCode);
    if (value && idx < 5) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  const handleResend = () => {
    setTimer(60);
    // TODO: Trigger resend code API
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Verify code API
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const type = (user.userType || user.role || '').toLowerCase();

    if (type === 'seller') {
      navigate('/seller-dashboard');
    } else {
      navigate('/consumer-dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-2">
            <span className="text-white text-2xl font-bold">G</span>
          </div>
          <span className="text-2xl font-bold">
            <span className="text-black">Chakula</span>
            <span className="text-green-600">Konnect</span>
          </span>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Verify Your Identity</h2>
        <p className="text-gray-600 text-center mb-6">
          For your security, we've sent a 6-digit code to<br />
          <span className="font-semibold">{email}</span>
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <div className="flex gap-2 mb-4">
            {code.map((digit, idx) => (
              <input
                key={idx}
                ref={el => inputRefs.current[idx] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(idx, e.target.value)}
                onKeyDown={e => handleKeyDown(idx, e)}
                className={`w-12 h-12 text-2xl text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${digit ? 'border-green-600' : 'border-gray-300'}`}
              />
            ))}
          </div>
          <div className="text-gray-500 text-sm mb-2">
            timer Resend code in <span className="font-semibold">00:{timer.toString().padStart(2, '0')}</span>
          </div>
          <button type="button" className="text-green-600 font-semibold mb-4" disabled={timer > 0} onClick={handleResend}>
            Resend Code
          </button>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition mb-2">
            Verify & Proceed
          </button>
        </form>
        <div className="text-center text-gray-500 text-sm mt-2">
          Wrong email address?{' '}
          <button className="text-green-600 hover:underline font-medium">Change email</button>
        </div>
      </div>
    </div>
  );
}

export default VerifyIdentity;
