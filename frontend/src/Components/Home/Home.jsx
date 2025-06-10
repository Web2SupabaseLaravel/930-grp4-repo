// import RestaurantList from '../Restaurant/RestaurantList';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Home = () => {
//     const [restaurants, setRestaurants] = useState([]);

//     useEffect(() => {
//         axios.get('http://127.0.0.1:8000/api/restaurants')
//             .then(res => setRestaurants(res.data));
//     }, []);

//     return (
//         <div className="container my-4">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h4 className="fw-bold text-secondary">Our Restaurants</h4>
//                 <button className="btn btn-dark resbutton">Add</button>
//             </div>
//             <hr></hr>
//             <div className="row">
//                 {restaurants.map(restaurant => (
//                     <RestaurantList key={restaurant.id} restaurant={restaurant} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Home;