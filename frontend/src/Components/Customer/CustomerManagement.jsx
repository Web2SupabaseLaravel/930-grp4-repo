import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Customersh from './Customersh';
import Customerinfoh from './Customerinfoh';

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [SelectedReservations, setSelectedReservations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/users`)
  .then(res => {
    const users = res.data.data || []; 
    setCustomers(users);
    if (users.length > 0) {
      setSelectedCustomer(users[0]);
    }
    setLoading(false);
  })
  }, []);

  useEffect(() => {
    if (!selectedCustomer) return;

    axios.get(`http://127.0.0.1:8000/reservations/user/${selectedCustomer.id}`)
      .then(res => {
        setReservations(res.data.reservations);
        setSelectedReservations(res.data.reservations[0]);
      })
      .catch(err => {
        console.error('Error fetching reservations:', err);
        setReservations([]);
      });
  }, [selectedCustomer]);

  if (loading) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm" style={{ backgroundColor: '#f8f8f8', border: 'none', borderRadius: '1rem' }}>
            <div className="card-body">
              <Customersh
                customers={customers}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setSelectedCustomer={setSelectedCustomer}
              />
            </div>
          </div>
        </div>
          <Customerinfoh
            reservations={reservations}
            selectedCustomer={selectedCustomer}
          />
      </div>
    </div>
  );
}

export default CustomerManagement;
