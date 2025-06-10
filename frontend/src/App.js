import React from 'react';
import Booking from './components/Booking/Booking';
import ReservationForm from './components/Booking/ReservationForm';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Booking</Link> | <Link to="/reservation">Reservation Form</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/reservation" element={<ReservationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
