import './App.css';
import RestaurantList from './Components/Restaurant/RestaurantList';
import RestaurantDetail from './Components/Restaurant/Restaurant';
import RestaurantEdit from './Components/Restaurant/RestaurantEdit';
import RestaurantAdd from './Components/Restaurant/RestaurantAdd';
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
            <Route path="/restaurants/:id/edit" element={<RestaurantEdit />} />
            <Route path="/restaurants/add" element={<RestaurantAdd />} />
          </Routes>
      <Footer />
    </>
  );
}

export default App;
