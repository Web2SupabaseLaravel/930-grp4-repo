import './App.css';
import RestaurantList from './Components/Restaurant/RestaurantList';
import RestaurantDetail from './Components/Restaurant/Restaurant';
import RestaurantEdit from './Components/Restaurant/RestaurantEdit';
import RestaurantAdd from './Components/Restaurant/RestaurantAdd';
// import { Routes , Route } from 'react-router';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import {Routes, Route, Navigate, useLocation } from 'react-router-dom';

import CustomerManagement from './Components/Customer/CustomerManagement';

import RestaurantManagement from "./Components/DashBoard/reservation-management"
import UserManagement from "./Components/DashBoard/user-management"
import ReservationManagement from "./Components/DashBoard/restaurant-management"
import Dashboard from './Components/DashBoard/DashBoard';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './component/Login';
import Register from './component/Register';
// import Booking from './Components/Booking/Booking';
// import Dashboard from './Components/DashBoard/DashBoard';

// import Home from './Components/Home/Home';

import TableManagement from './Components/Tables/TableManagement';
import ReservationScheduleStaff from './Components/ReservationScheduleStaff/ReservationScheduleStaff';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/restaurants/:id/edit" element={<RestaurantEdit />} />
        <Route path="/restaurants/add" element={<RestaurantAdd />} />
        <Route path='/customermangemant' element={<CustomerManagement />} />
        <Route path="/Dashboard/user-management" element={<UserManagement />} />
        <Route path="/Dashboard/reservation-management" element={<RestaurantManagement />} />
        <Route path="/Dashboard/restaurant-management" element={<ReservationManagement />} />
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path="/restaurants/:id/tables" element={<TableManagement />} />
        <Route path="/reservations-schedule" element={<ReservationScheduleStaff />} />

      </Routes>
      <Footer />
    </>
  );
}








export default App;
