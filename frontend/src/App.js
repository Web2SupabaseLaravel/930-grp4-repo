import './App.css';
import RestaurantList from './Components/Restaurant/RestaurantList';
import RestaurantDetail from './Components/Restaurant/Restaurant';
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
          </Routes>
      <Footer />
    </>
  );
}

export default App;
