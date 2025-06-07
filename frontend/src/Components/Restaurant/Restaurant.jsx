import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function RestaurantDetail() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/restaurants/${id}`)
            .then(res => {
                setRestaurant(res.data);
            });
    }, [id]);

    if (!restaurant) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <button className="btn " onClick={() => window.history.back()}>&larr; Go Back</button>
            <button className="btn btn-danger float-end resbutton">Delete</button>
            <hr />
            <div className="row">
                <div className="container">
                    {/* <img src={selectedImage} className="img-fluid rounded mb-3" alt="Main" /> */}

                    {/* <div className="d-flex overflow-auto mb-3">
            {restaurant.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`thumb-${i}`}
                className="me-2"
                width="100"
                onClick={() => setSelectedImage(img.url)}
                style={{ cursor: 'pointer', border: selectedImage === img.url ? '2px solid #333' : 'none' }}
              />
            ))}
          </div> */}
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                    <h3><span className='fw-bold sansita'>{restaurant.name}</span> <span className='text-secondary sansita'>Restaurant</span></h3>
                    <button className='btn btn-dark resbutton ps-5 pe-5'>Edit</button>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between resbutton'>
                        <div>
                            <p className='text-secondary'><i className="bi bi-geo-alt-fill text-dark me-3"></i> {restaurant.address}</p>
                            <p><i className="bi bi-clock-fill text-dark me-3"></i> {restaurant.opening_hours}</p>
                            <p className='text-dark poppins'><i class="bi bi-fork-knife text-dark me-3"></i> <span className='text-bg-secondary  p-1 pe-3 ps-3 rounded-4 '>{restaurant.cuisine}</span></p>
                            <p className='text-secondary'><i className="bi bi-telephone-fill text-dark me-3"></i> {restaurant.phonenumber}</p>
                        </div>

                        <p className='text-secondary poppins'>
                            <i class="bi bi-list text-dark fs-4 me-2"></i>
                            {restaurant.description}
                        </p>

                    </div>
                </div>
                <div className="container">
                    <h5 className='fw-bold sansita'>Tables</h5>
                    <hr />
                </div>




                {/* <div className="col-md-4">
          <h5>Tables</h5>
          {restaurant.tables.map((table, idx) => (
            <div key={idx} className="card mb-2 p-2">
              <p>Table #{table.table_number}</p>
              <p>Size: {table.size} people</p>
              <p>Status: {table.availability ? 'Available' : 'Occupied'}</p>
            </div>
          ))} */}
            </div>
        </div>

    );
}

export default RestaurantDetail;
