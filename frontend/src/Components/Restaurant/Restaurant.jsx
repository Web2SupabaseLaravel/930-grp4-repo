import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function RestaurantDetail() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/restaurants/${id}`)
            .then(res => {
                setRestaurant(res.data);
            });
    }, [id]);


    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/api/restaurants/${restaurant.id}`)
            .then(() => {
                setShowDeletePopup(false);
                navigate("/"); 
            })
            .catch(err => {
                console.error("Failed to delete:", err);
                alert("Something went wrong.");
            });
    };

    if (!restaurant) return (
        <p className='d-flex justify-content-center align-items-center fs-2 fw-bold resbutton text-secondary'>Loading...</p>
       
    );

    return (
        <div className="container mt-4">
            <button className="btn resbutton" onClick={() => navigate('/')}>&larr; Go Back</button>
            <button className="btn btn-danger float-end resbutton"  onClick={() => setShowDeletePopup(true)} >Delete</button>
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
                        <Link to={`/restaurants/${restaurant.id}/edit`}>
                            <button className='btn btn-dark resbutton ps-5 pe-5'>Edit</button>
                        </Link>
                    </div>
                    <hr />
                    <div className='row resbutton'>
                        <div className='col-sm-4 '>
                            <p className='text-secondary'><i className="bi bi-geo-alt-fill text-dark me-3"></i> {restaurant.address}</p>
                            <p><i className="bi bi-clock-fill text-dark me-3"></i> {restaurant.opening_hours}</p>
                            <p className='text-dark poppins'><i class="bi bi-fork-knife text-dark me-3"></i> <span className='text-bg-secondary  p-1 pe-3 ps-3 rounded-4 '>{restaurant.cuisine}</span></p>
                            <p className='text-secondary'><i className="bi bi-telephone-fill text-dark me-3"></i> {restaurant.phonenumber}</p>
                            <p className='text-secondary'><i className="bi bi-people-fill text-dark me-3"></i> {restaurant.capacity} People</p>
                            {/* <p className='text-secondary'><i className="bi bi-person-fill text-dark me-3"></i> {restaurant.manager_id}</p> */}

                        </div>

                        <p className='col-sm-8 text-secondary poppins '>
                            <i class="bi bi-list text-dark fs-4 "></i>
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
          ))}
          </div> */}
            </div>


            {showDeletePopup && (
                <div className="delete-overlay">
                    <div className="delete-modal text-center p-4">
                        <h4 className="mb-3">Are you sure you want to delete this restaurant?</h4>
                        <p className="text-muted">This action cannot be undone.</p>
                        <div className="d-flex justify-content-center gap-3 mt-4">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowDeletePopup(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}





        </div>

    );
}











export default RestaurantDetail;
