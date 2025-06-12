import React from 'react';
import './TableManagementHeader.css';

const TableManagementHeader = () => {
  return (
    <header className="header">
      <h1>Table Management</h1>
      <div className="user-profile">
        <span className="material-icons">person</span>
        <span>Staff</span>
      </div>
    </header>
  );
};

export default TableManagementHeader;