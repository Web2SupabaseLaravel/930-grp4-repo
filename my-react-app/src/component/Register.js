import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            navigate('/login');
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('http://localhost:8000/register', form);
      setSuccess(true);
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      const details = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join('\n')
        : '';
      setError(`${message}\n${details}`);
    }

    setLoading(false);
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light position-relative">
      <div className="row w-100 justify-content-center" style={{ maxWidth: '1200px', height: '85vh' }}>
        <div className="col-12 d-flex flex-column flex-md-row bg-white rounded-4 shadow-lg overflow-hidden" style={{ height: '100%', width: '100%' }}>

          {/* Left - Form or Success */}
          <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
            {success ? (
              <div className="text-center animate__animated animate__fadeIn">
                <h3 className="text-success fw-bold mb-3 display-6">🎉 Registration Successful!</h3>
                <p className="text-muted fs-5">Redirecting to login in <strong>{countdown}</strong> seconds...</p>
              </div>
            ) : (
              <>
                <h2 className="fw-bold mb-2 display-5">Welcome 👋</h2>
                <p className="text-muted mb-4 fs-5">"Hungry for something good? Let's dig in!"</p>

                {error && <div className="alert alert-danger white-space-pre-line">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <input name="name" type="text" className="form-control form-control-lg mb-3" placeholder="Your Name" value={form.name} onChange={handleChange} required />
                  <input name="email" type="email" className="form-control form-control-lg mb-3" placeholder="Email" value={form.email} onChange={handleChange} required />
                  <input name="password" type="password" className="form-control form-control-lg mb-3" placeholder="Password" value={form.password} onChange={handleChange} required />
                  <input name="password_confirmation" type="password" className="form-control form-control-lg mb-4" placeholder="Confirm Password" value={form.password_confirmation} onChange={handleChange} required />
                  <button type="submit" className="btn btn-dark btn-lg w-100" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing Up...
                      </>
                    ) : 'Sign Up'}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <span>Already have an account? </span>
                  <Link to="/login" className="text-primary fw-semibold">Sign In</Link>
                </div>
              </>
            )}
          </div>

          {/* Right - Image */}
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

      {/* Optional animation styles */}
      <style>{`
        .white-space-pre-line {
          white-space: pre-line;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Register;
