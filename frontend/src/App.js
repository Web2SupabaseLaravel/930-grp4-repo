import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import TableManagement from './Components/Tables/TableManagement';
import ReservationScheduleStaff from './Components/ReservationScheduleStaff/ReservationScheduleStaff';
import RestaurantList from './Components/Restaurant/RestaurantList';
import RestaurantDetail from './Components/Restaurant/Restaurant';
import RestaurantEdit from './Components/Restaurant/RestaurantEdit';
import RestaurantAdd from './Components/Restaurant/RestaurantAdd';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TableManagement />} />
        <Route path="/reservations-schedule" element={<ReservationScheduleStaff />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/restaurants/:id/edit" element={<RestaurantEdit />} />
        <Route path="/restaurants/add" element={<RestaurantAdd />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;