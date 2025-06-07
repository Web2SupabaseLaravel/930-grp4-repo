import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [SelectedReservations, setSelectedReservations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/CustomerMangemant`)
      .then(res => {
        setCustomers(res.data.customers);
        setSelectedCustomer(res.data.customers[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

useEffect(() => {
  if (!selectedCustomer) return;

  axios.get(`http://127.0.0.1:8000/api/reservations/${selectedCustomer.id}`)
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

  const filteredCustomers = customers.filter(c => {
    const term = searchTerm.toLowerCase();
    return (
      (c.name && c.name.toLowerCase().includes(term)) ||
      (c.email && c.email.toLowerCase().includes(term)) 
    );
  });

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Customer List */}
        <div className="col-md-6">
          <div className="card shadow-sm rounded-4">
            <div className="card-body">
              <h4 className="card-title mb-3">Customer Management</h4>
              <input type="text" className="form-control mb-3" placeholder="Search customers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>contact info</th>
                  </tr>
                </thead>
                <tbody>
                    {customers
                        .filter(c => {
                        const term = searchTerm.toLowerCase();
                        return (
                            c.name?.toLowerCase().includes(term) ||
                            c.email?.toLowerCase().includes(term) 
                        );
                        })
                        .map(c => (
                        <tr key={c.id} onClick={() => setSelectedCustomer(c)} style={{ cursor: 'pointer' }}>
                            <td className="fw-bold">{c.id}</td>
                            <td>{c.name || 'N/A'}</td>
                            <td>{ c.email}</td>
                        </tr>
                        ))
                    }

                    {customers.filter(c => {
                        const term = searchTerm.toLowerCase();
                        return (
                        c.name?.toLowerCase().includes(term) ||
                        c.email?.toLowerCase().includes(term) ||
                        c.phone?.toLowerCase().includes(term)
                        );
                    }).length === 0 && (
                        <tr>
                        <td colSpan="3" className="text-center text-muted">No matching customers found.</td>
                        </tr>
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Customer Detail */}
        <div className="col-md-6">
          {selectedCustomer && (
            <div className="card shadow-sm rounded-4">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <img src="https://via.placeholder.com/60" className="rounded-circle me-3" alt="avatar" />
                  <div>
                    <h5 className="mb-0 text-capitalize">{selectedCustomer.name}</h5>
                    <small className="text-muted">{selectedCustomer.phone || selectedCustomer.email}</small>
                  </div>
                </div>

                <ul className="nav nav-tabs mb-3">
                  <li className="nav-item">
                    <a className="nav-link active" href="#!">Overview</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#!">Reservation History</a>
                  </li>
                </ul>

                <div>
                  <p><strong>Total Visits:</strong> 5</p>
                  <p><strong>Last Visit:</strong> 04/18/2024</p>
                  <p><strong>Favorite Table:</strong> 12</p>

                  <div className="mb-3">
                    <label htmlFor="note" className="form-label fw-bold">Notes</label>
                    <input type="text" className="form-control" id="note" placeholder="Add a Note..." />
                  </div>

                  <h6>Reservation History</h6>
                  <table className="table table-sm table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Date</th>
                        <th>Guests</th>
                        <th>Special Requests</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.length > 0 ? (
                        reservations.map(r => (
                          <tr key={r.id}>
                            <td>{r.date}</td>
                            <td>{r.party_size}</td>
                            <td>{r.special_requests || 'N/A'}</td>
                            <td>{r.status || 'Completed'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No reservations found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerManagement;
