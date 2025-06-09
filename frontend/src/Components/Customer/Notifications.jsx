import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

function Notifications() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
   axios.get(`http://127.0.0.1:8000/notifications/user/3`)
      .then(res => {
        setNotifications(res.data.notifications);
      })
  }, []);

  return (
    <div className="position-relative d-inline-block " style={{width: "50%"}}>
      <i
        className="fa-solid fa-bell fs-4"
        style={{ cursor: 'pointer'}}
        onClick={() => setShowDropdown(!showDropdown)}
      ></i>

      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {notifications.length}
      </span>

      {showDropdown && (
        <div className="dropdown-menu show position-absolute end-0 mt-2 shadow">
          {notifications.length > 0 ? (
            notifications.map((note, index) => (
              <>
              <button key={index} className="dropdown-item text-wrap">
                {note.message}
              </button>
              </>
            ))
          ) : (
            <span className="dropdown-item text-muted">No new notifications</span>
          )}
        </div>
      )}
    </div>
  );
}

export default Notifications;
