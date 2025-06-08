// src/components/Login.js
import React from 'react';


const Login = () => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center login-wrapper">
      <div className="row w-100 justify-content-center">
        <div className="col-md-10 col-lg-8 d-flex p-0 rounded overflow-hidden login-box">
          {/* Left - Login Form */}
          <div className="col-md-6 p-5 bg-white d-flex flex-column justify-content-center">
            <h2 className="fw-bold mb-2">Welcome Back 👋</h2>
            <p className="text-muted mb-4">"Hungry for something good? Let's dig in!"</p>

            <form>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="Example@email.com" />
              </div>
              <div className="mb-2">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="At least 8 characters" />
              </div>
              <div className="mb-3 text-end">
                <a href="#" className="text-decoration-none text-primary">Forgot Password?</a>
              </div>
              <button className="btn btn-dark w-100">Sign in</button>
            </form>

            <div className="text-center mt-4">
              <span>Don’t you have an account? </span>
              <a href="./Register" className="text-primary">Sign up</a>
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
              className="w-100 h-100 object-fit-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
