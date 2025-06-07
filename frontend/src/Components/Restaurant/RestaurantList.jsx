import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/api/restaurants') 
      .then(response => setRestaurants(response.data))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold text-secondary sansita">Our Restaurants</h4>
        <button className="btn btn-dark resbutton">Add</button>
      </div>
    <hr></hr>
    <div className="row">
      {restaurants.map((restaurant) => (
      <div className="col-md-3 mb-4" key={restaurant.id}>
         <Link to={`/restaurants/${restaurant.id}`} className="text-decoration-none text-dark">
        <div className="card h-100 rescard">
            <img
              src={restaurant.image_url || 'https://via.placeholder.com/400x200'}
              className="card-img-top"
              alt={restaurant.name}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{restaurant.name}</h5>
              <p className="card-text mb-1">
                <i className="bi bi-geo-alt-fill"></i>
                <div className='text-secondary pt-2 pb-2'>
                  {restaurant.address}
                </div>
              </p>
              <p className="card-text mb-1">
                <i class="bi bi-telephone-fill"></i> {restaurant.phonenumber}
              </p>
              <p className="card-text">
                <div>
                  <i class="bi bi-clock-fill"></i>
                  <span className='text-secondary ms-2'>{restaurant.opening_hours}</span>
                </div>
              </p>
            </div>
        </div>
        </Link>
      </div>
       ))}
    </div>
    </div>
  );
};

export default RestaurantList;
