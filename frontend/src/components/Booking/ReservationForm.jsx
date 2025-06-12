import React, { useState } from 'react';
import './ReservationForm.css';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/users', formData);
      alert('User data submitted successfully!');
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('Error submitting user data:', error);

      if (error.response) {
        console.error('Validation errors:', error.response.data);
        alert('Validation error: ' + JSON.stringify(error.response.data));
      } else if (error.request) {
        alert('No response from server');
      } else {
        alert('Error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reservation-container">
      <div className="reservation-card">

        <div className="check-icon-container">
          <div className="check-icon" tabIndex={0} aria-label="Confirmation Icon">
            <FaCheck size={28} />
          </div>
        </div>

        <form className="reservation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button
            type="submit"
            className={`btn-confirm ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? '' : 'Confirm'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
