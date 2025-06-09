import './App.css';
import RestaurantList from './Components/Restaurant/RestaurantList';
import RestaurantDetail from './Components/Restaurant/Restaurant';
import CustomerManagement from './Components/Customer/CustomerManagement';
import Notifications from './Components/Customer/Notifications';
import { Routes , Route } from 'react-router';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

// import Booking from './Components/Booking/Booking';
// import Dashboard from './Components/DashBoard/DashBoard';

// import Home from './Components/Home/Home';

function App() {
  return (
    <>
      <Header />
          <Routes>
            <Route path="/" element={<RestaurantList />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
            <Route path='/customermangemant' element={<CustomerManagement/>}/>
            <Route path='/Notifications' element={<Notifications/>}/>
          </Routes>
      <Footer />
    </>
  );
}

export default App;
