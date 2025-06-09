import 'bootstrap/dist/css/bootstrap.min.css';

function Customersh(props) {
  return (
    <>
      <h4 className="card-title mb-3 fw-semibold text-capitalize">Customer Management</h4>
      <input
        type="text"
        className="form-control mb-3"
        style={{ backgroundColor: '#f2f2f2', border: 'none', borderRadius: '0.5rem' }}
        placeholder="Search customers..."
        value={props.searchTerm}
        onChange={(e) => props.setSearchTerm(e.target.value)}
      />
      <table className="table table-hover">
        <thead>
          <tr>
            <th style={{ color: '#444', fontWeight: '600' }}>ID</th>
            <th style={{ color: '#444', fontWeight: '600' }}>Name</th>
            <th style={{ color: '#444', fontWeight: '600' }}>Contact Info</th>
          </tr>
        </thead>
        <tbody>
          {props.customers
            .filter((c) => {
              const term = props.searchTerm.toLowerCase();
              return (
                c.name?.toLowerCase().includes(term) ||
                c.email?.toLowerCase().includes(term) ||
                c.phone?.toLowerCase().includes(term)
              );
            })
            .map((c) => (
              <tr key={c.id} onClick={() => props.setSelectedCustomer(c)} style={{ cursor: 'pointer' }}>
                <td className="fw-bold">{c.id}</td>
                <td>{c.name || 'N/A'}</td>
                <td>{c.phone || c.email || 'N/A'}</td>
              </tr>
            ))}
          {props.customers.filter((c) => {
            const term = props.searchTerm.toLowerCase();
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
    </>
  );
}

export default Customersh;
