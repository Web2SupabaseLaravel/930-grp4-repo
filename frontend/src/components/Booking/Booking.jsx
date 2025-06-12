import React, { useState } from 'react';
import './Booking.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Booking() {
  const [formData, setFormData] = useState({
    location: '',
    cuisine: '',
    date: '',
    time: '',
    partySize: '',
    duration: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value
  });
};


 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

 
  const payload = {
    location: formData.location,
    cuisine: formData.cuisine,
    date: formData.date,
    time: formData.time,
    party_size: parseInt(formData.partySize, 10),  
    duration: formData.duration.toString(),       
  };

 
  if (isNaN(payload.party_size) || payload.party_size < 1) {
    setMessage('الرجاء إدخال عدد صحيح للأشخاص (1 أو أكثر).');
    setLoading(false);
    return;
  }

  try {
    await axios.post('http://localhost:8000/api/reservations', payload);
    setMessage('تم الحجز بنجاح!');
  } catch (error) {
    console.error(error.response?.data || error.message);
    setMessage(error.response?.data?.message || 'حدث خطأ أثناء الحجز.');
  } finally {
    setLoading(false);
  }
};




  return (
    <div className="background-image">
      <h1 className="text-center mb-5 text-white fw-bold">BOOK A TABLE</h1>
      <div className="container booking-container">
        {message && (
          <div className={`alert ${message.includes('خطأ') ? 'alert-danger' : 'alert-success'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-4 align-items-end">
            <div className="col-md-2">
              <label className="form-label text-dark">Location:</label>
              <input
                type="text"
                name="location"
                className="form-control-glass"
                placeholder="اختر الموقع"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-2">
              <label className="form-label text-dark">Cuisine:</label>
              <input
                type="text"
                name="cuisine"
                className="form-control-glass"
                placeholder="نوع المطبخ"
                value={formData.cuisine}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-2">
              <label className="form-label text-dark">Date:</label>
              <input
                type="date"
                name="date"
                className="form-control-glass"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="col-md-2">
              <label className="form-label text-dark">Time:</label>
              <input
                type="time"
                name="time"
                className="form-control-glass"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-2">
              <label className="form-label text-dark">Size:</label>
              <input
                type="number"
                name="partySize"
                className="form-control-glass"
                min="1"
                placeholder="عدد"
                value={formData.partySize}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-2">
              <label className="form-label text-dark">Duration:</label>
              <input
                type="number"
                name="duration"
                className="form-control-glass"
                min="1"
                placeholder="المدة"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-2 d-flex justify-content-end align-items-end">
              <button
                type="submit"
                className="form-control-glass custom-submit-btn"
                disabled={loading}
                style={{ minWidth: '100px' }}
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
