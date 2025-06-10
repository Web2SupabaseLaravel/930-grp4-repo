import React from 'react';
import './ReservationScheduleStaffHeader.css';

const ReservationScheduleStaffHeader = () => {
  return (
    <header className="header">
      <div className="app-title"><h1>Reservations Schedule</h1></div>
      
      <div className="user-profile">
        <span className="material-icons">person</span>
        <span>Staff</span>
      </div>
    </header>
  );
};

export default ReservationScheduleStaffHeader;