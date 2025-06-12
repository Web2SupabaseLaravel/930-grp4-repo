import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TableManagement.css';
import TableManagementHeader from './TableManagementHeader';

const TableManagement = () => {
  const [tables, setTables] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tablesResponse, reservationsResponse] = await Promise.all([
        axios.get('http://localhost:8000/api/tabless'),
        axios.get('http://localhost:8000/api/reservationss'),
      ]);
      if (tablesResponse.data && tablesResponse.data.length > 0) {
        setTables(tablesResponse.data);
      }
      if (reservationsResponse.data.status === 'success') {
        setReservations(reservationsResponse.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please check the API or try again later.');
      setLoading(false);
    }
  };

  const assignCustomer = () => {
    console.log('Assign Customer clicked');
    
  };

  const toggleStatus = (tableId) => {
    const table = tables.find((t) => t.id === tableId);
    const newStatus = table.status === '1' ? '0' : '1'; 
    axios
      .put(`http://localhost:8000/api/tabless/${tableId}`, { status: newStatus })
      .then(() => {
        setTables(
          tables.map((t) =>
            t.id === tableId ? { ...t, status: newStatus } : t
          )
        );
      })
      .catch((error) => console.error('Error updating table status:', error));
  };

  const getTableStatusColor = (tableId) => {
    const reservation = reservations.find((r) => r.table_id === tableId);
    if (reservation) {
      switch (reservation.status) {
        case '1':
        case 'confirmed':
          return 'confirmed'; 
        case '0':
        case 'cancelled':
          return 'cancelled'; 
        default:
          return 'pending'; 
      }
    }
    
    const table = tables.find((t) => t.id === tableId);
    return table?.status === '1' ? 'confirmed' : 'pending';
  };

  const refresh = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h1>My Restaurant App</h1>
        <p>Loading...</p>
        <div className="">© 2023 My Restaurant App</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h1>My Restaurant App</h1>
        <p>{error}</p>
        <div className="">© 2023 My Restaurant App</div>
      </div>
    );
  }

  return (
    <div className="table-management">
      <TableManagementHeader />
      <div className="controls">
        <div className="filter">
          <select>
            <option>Reserved</option>
          </select>
        </div>
        <button className="assign-btn" onClick={assignCustomer}>
          <span className="material-icons">person_add</span> Assign Customer
        </button>
        <Link to="/reservations-schedule" className="nav-btn">
          Go to Reservations
        </Link>
      </div>
      <div className="table-map">
        {tables
          .sort((a, b) => a.table_number - b.table_number)
          .map((table) => (
            <div
              key={table.id}
              className={`table ${getTableStatusColor(table.id)}`}
              onClick={() => toggleStatus(table.id)}
            >
              <span className="material-icons status-icon">
                {getTableStatusColor(table.id) === 'confirmed'
                  ? 'check_circle'
                  : getTableStatusColor(table.id) === 'cancelled'
                  ? 'cancel'
                  : 'schedule'}
              </span>
              <span className="table-number">Table {table.table_number}</span>
              <span className="table-size">{table.size}</span>
            </div>
          ))}
      </div>
      
    </div>
  );
};

export default TableManagement;