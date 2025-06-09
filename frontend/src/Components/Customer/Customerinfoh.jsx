import 'bootstrap/dist/css/bootstrap.min.css';

function Customerinfoh(props){
    const sortedReservations = [...props.reservations].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

return(
    <>
           <div className="col-md-6">
          {props.selectedCustomer && (
            <div className="card shadow-sm" style={{ backgroundColor: '#f8f8f8', border: 'none', borderRadius: '1rem' }}>
              <div className="card-body">
              
                <div className="d-flex align-items-center mb-3">
                  <div>
                    <h5 className="mb-0 text-capitalize">{props.selectedCustomer.name}</h5>
                    <small className="text-muted">{props.selectedCustomer.phone || props.selectedCustomer.email}</small>
                  </div>
                </div>

                <ul className="nav nav-tabs mb-3">
                  <li className="nav-item">
                    <a className="nav-link active" href="#!" style={{ border: 'none', borderBottom: '2px solid black', fontWeight: '600', color: 'black', backgroundColor: 'transparent' }}>Overview</a>
                  </li>
                
                </ul>

                <div>
                  <p><strong>Total Visits:</strong> {props.reservations.length}</p>
                  <p><strong>Last Visit:</strong>{sortedReservations[0]?.date || 'N/A'}</p>

                  <div className="mb-3">
                    <label htmlFor="note" className="form-label fw-bold">Notes</label>
                    <input
                      type="text"
                      className="form-control"
                      id="note"
                      placeholder="Add a Note..."
                      style={{ backgroundColor: '#f2f2f2', border: 'none', borderRadius: '0.5rem' }}
                    />
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
                      {props.reservations.length > 0 ? (
                        props.reservations.map(r => (
                          <tr key={r.id}>
                            <td>{r.date}</td>
                            <td>{r.party_size}</td>
                            <td>{r.special_requests || 'N/A'}</td>
                            <td>{r.status || 'Completed'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-muted">No reservations found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
    </>
);
}
export default Customerinfoh;