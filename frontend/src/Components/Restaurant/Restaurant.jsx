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


    const [tables, setTables] = useState([]);
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/restaurants/${id}/tables`)
            .then(res => {
                setTables(res.data);
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
        <div className="container mt-4 resbutton">
            <button className="btn resbutton" onClick={() => navigate('/')}>&larr; Go Back</button>
            <button className="btn btn-danger float-end resbutton" onClick={() => setShowDeletePopup(true)} >Delete</button>
            <hr />
            <div className="row">
                <div className="container">

                    {restaurant.images && restaurant.images.length > 0 && (
                        <div id="restaurantCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
                            <div className="carousel-inner rounded">
                                {restaurant.images.map((img, index) => (
                                    <div
                                        className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                        key={index}
                                    >
                                        <img
                                            src={img}
                                            className="d-block w-100"
                                            alt={`Slide ${index + 1}`}
                                            style={{ height: '500px', objectFit: 'cover', borderRadius: '20px' }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {restaurant.images.length > 1 && (
                                <>
                                    <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#restaurantCarousel"
                                        data-bs-slide="prev"
                                    >
                                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#restaurantCarousel"
                                        data-bs-slide="next"
                                    >
                                        <span className="carousel-control-next-icon" aria-hidden="true" />
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </>
                            )}
                        </div>
                    )}
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
                    <div className="row d-flex justify-content-between align-items-center ">
                        {tables.map((table, idt) => (
                            <div key={idt} className={`col-md-4 card mb-5  tablecard ${table.status === '1' ? 'available' : 'occupied'}`} style={{ maxWidth: '19rem', minHeight: '300px', maxHeight: '300px' }}>
                                <div className={"card-body resbutton d-flex flex-column justify-content-between"}>
                                    <h5 className="card-title resbutton text-center"> <strong>Table # {idt + 1}</strong></h5>
                                    <h6 className="fs-5 sansita "><span className='resbutton fw-bolder fs-6'>Location: </span>{table.location}</h6>
                                    <p className='card-text mb-1'><strong>Size:</strong> {table.size} people</p>
                                    <p className={`badge ${table.status === '1' ? 'bg-success' : 'bg-danger'} pt-2 pb-2 m-3`}>{(table.status === '1') ? "Available" : "Occupied"}</p>
                                    <button className="btn btn-secondary resbutton" onClick={() => navigate(`/`)}>Reserve</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
