import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    axios.get('http://localhost:8000/api/restaurants')
      .then(response => {
        setRestaurants(response.data)
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching restaurants:', error)
        setIsLoading(false);
      });
  }, []);




  return (
    <div className="container my-4 resbutton">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold text-secondary sansita">Our Restaurants</h4>
        <Link to="/restaurants/add" className="text-decoration-none">
          <button className="btn btn-dark resbutton">Add</button>
        </Link>
      </div>
      <hr></hr>
      {isLoading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-secondary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {restaurants.map((restaurant) => (
            <div className="col-md-3 mb-4" key={restaurant.id}>
              <Link to={`/restaurants/${restaurant.id}`} className="text-decoration-none text-dark">
                <div className="card h-100 rescard">
                  <img
                    src={(restaurant.images && restaurant.images.length > 0) ? restaurant.images[0] : 'https://via.placeholder.com/400x200'}
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
                      <i className="bi bi-telephone-fill"></i> {restaurant.phonenumber}
                    </p>
                    <p className="card-text">
                      <div>
                        <i className="bi bi-clock-fill"></i>
                        <span className='text-secondary ms-2'>{restaurant.opening_hours}</span>
                      </div>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default RestaurantList;
