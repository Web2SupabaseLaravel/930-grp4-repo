// src/App.js

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './component/Login';
import Register from './component/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
