import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setModalMessage('');

    try {
      const res = await axios.post('http://localhost:8000/login', { email, password });
      const token = res.data.token;

      if (token) {
        localStorage.setItem('token', token);

        const profileRes = await axios.get('http://localhost:8000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = profileRes.data.user;
        const role = user.role;

        setModalType('success');
        setModalMessage('✅ Login successful! Redirecting...');

        setTimeout(() => {
          navigate(role === 'admin' ? '/Dashboard' : '/restaurants');
        }, 3000);
      }
    } catch (err) {
      setModalType('error');
      const msg = err.response?.data?.message || '❌ Login failed. Please check your credentials.';
      setModalMessage(msg);
    }

    setLoading(false);
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light position-relative">
      <div className="row w-100 justify-content-center" style={{ maxWidth: '1200px', height: '85vh' }}>
        <div className="col-12 d-flex flex-column flex-md-row bg-white rounded-4 shadow-lg overflow-hidden" style={{ height: '100%', width: '100%' }}>

          {/* Form Section */}
          <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
            <h2 className="fw-bold mb-2 display-5">Welcome Back 👋</h2>
            <p className="text-muted mb-4 fs-5">"Hungry for something good? Let's dig in!"</p>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                className="form-control form-control-lg mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control form-control-lg mb-4"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-dark btn-lg w-100" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging in...
                  </>
                ) : 'Sign In'}
              </button>
            </form>

            <div className="text-center mt-4">
              <span>Don't have an account? </span>
              <a href="/register" className="text-primary fw-semibold">Sign up</a>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-md-6 d-none d-md-block p-0">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
              alt="Food"
              className="w-130 h-100"
              style={{ objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalMessage && (
        <div className="position-fixed top-0 start-50 translate-middle-x mt-3 z-3" style={{ animation: 'fadeInDown 0.5s ease' }}>
          <div className={`alert alert-${modalType === 'success' ? 'success' : 'danger'} shadow-lg rounded px-4 py-3`}>
            {modalMessage}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Login;
