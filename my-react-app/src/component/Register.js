// src/components/Register.js
import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-white">
      <div className="row w-100 justify-content-center">
        <div className="col-md-10 col-lg-8 d-flex p-0 bg-white">
          
          {/* Left - Sign Up Form */}
          <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
            <h2 className="fw-bold mb-2">Welcome 👋</h2>
            <p className="text-muted mb-4">"Hungry for something good? Let's dig in!"</p>

            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  style={{ backgroundColor: '#eef4ff' }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Example@email.com"
                  style={{ backgroundColor: '#eef4ff' }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="At least 8 characters"
                  style={{ backgroundColor: '#eef4ff' }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="At least 8 characters"
                  style={{ backgroundColor: '#eef4ff' }}
                />
              </div>
              <button className="btn btn-dark w-100">Sign Up</button>
            </form>

            <div className="text-center mt-4">
              <span>Already have an account? </span>
              <Link to="/login" className="text-primary">Sign In</Link>
            </div>

            <div className="text-center mt-4 text-muted">
              <small>Marah AbuKharmah</small>
            </div>
          </div>

          {/* Right - Image */}
          <div className="col-md-6 d-none d-md-block p-0">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
              alt="Food"
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
