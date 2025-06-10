import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReservationScheduleStaff.css';
import ReservationScheduleStaffHeader from './ReservationScheduleStaffHeader';

function ReservationScheduleStaff() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    setLoading(true);
    axios
      .get('http://localhost:8000/api/reservations')
      .then((response) => {
        if (response.data.status === 'success') {
          setReservations(response.data.data);
          console.log('Fetched reservations:', response.data.data); // للتحقق من البيانات
        } else {
          console.error('API returned success: false', response.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error.response ? error.response.data : error.message);
        setLoading(false);
      });
  };

  const handleSeatReservation = (id) => {
    setLoading(true);
    axios
      .put(`http://localhost:8000/api/reservations/${id}`, { status: 'confirmed' }, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
        if (response.data.status === 'success') {
          console.log('Seat response:', response.data);
          fetchReservations();
        } else {
          console.error('Failed to seat reservation:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error seating reservation:', error.response ? error.response.data : error.message);
        setLoading(false);
      });
  };

  const handleCancelReservation = (id) => {
    setLoading(true);
    axios
      .put(`http://localhost:8000/api/reservations/${id}`, { status: 'cancelled' }, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
        if (response.data.status === 'success') {
          console.log('Cancel response:', response.data);
          fetchReservations();
        } else {
          console.error('Failed to cancel reservation:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error cancelling reservation:', error.response ? error.response.data : error.message);
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="schedule-container">
      <ReservationScheduleStaffHeader />
      <div className="controls">
        <select>
          <option>Today</option>
        </select>
        <button className="refresh-btn" onClick={fetchReservations}>↻ Refresh</button>
      </div>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>TIME</th>
            <th>CUSTOMER NAME</th>
            <th>PARTY SIZE</th>
            <th>TABLE</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.time || 'N/A'}</td>
              <td>{reservation.customer_name || `user${reservation.reserved_by_user_id || ''}`}</td>
              <td>{reservation.table?.size || 'N/A'}</td> {}
              <td>{reservation.table?.id ? `Table ${reservation.table.id.slice(0, 2)}` : 'N/A'}</td>
              <td>
                <span
                  className={
                    reservation.status === '1' || reservation.status === 'confirmed'
                      ? 'status-confirmed'
                      : reservation.status === '0' || reservation.status === 'cancelled'
                      ? 'status-cancelled'
                      : 'status-pending'
                  }
                >
                  {reservation.status === '1' ? 'confirmed' : reservation.status === '0' ? 'cancelled' : reservation.status || 'pending'}
                </span>
              </td>
              <td>
                <button
                  className="action-btn seat"
                  onClick={() => handleSeatReservation(reservation.id)}
                  disabled={reservation.status === '1' || reservation.status === 'confirmed' || reservation.status === '0' || reservation.status === 'cancelled'}
                >
                  Seat
                </button>
                <button
                  className="action-btn cancel"
                  onClick={() => handleCancelReservation(reservation.id)}
                  disabled={reservation.status === '0' || reservation.status === 'cancelled'}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default ReservationScheduleStaff;