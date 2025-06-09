import './App.css';
import RestaurantList from './Components/Restaurant/RestaurantList';
import RestaurantDetail from './Components/Restaurant/Restaurant';
import { Routes , Route } from 'react-router';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
// import Booking from './Components/Booking/Booking';
import Dashboard from './Components/DashBoard/DashBoard';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Home from './Components/Home/Home';
// import RestaurantsPage from "./Components/DashBoard/restaurantpage"
// import UsersPage from "./Components/DashBoard/userpage"

import RestaurantManagement from "./Components/DashBoard/reservation-management"
import UserManagement from "./Components/DashBoard/user-management"
import ReservationManagement from "./Components/DashBoard/restaurant-management"

function App() {
  return (
    <>
      <Header />
          <Routes>
            <Route path="/" element={<RestaurantList />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
         
           <Route path="/user-management" element={<UserManagement />} />
           <Route path="/restaurant-management" element={<RestaurantManagement />} />
           <Route path="/reservation-management" element={<ReservationManagement />} />

          </Routes>

          <Dashboard/>
      <Footer />
    </>
  );
}

export default App;
