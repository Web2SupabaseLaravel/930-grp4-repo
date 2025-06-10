import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function RestaurantEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState({
        name: '',
        address: '',
        cuisine: '',
        phonenumber: '',
        opening_hours: '',
        capacity: '',
        description: '',
        manager_id: ''
    });

    const [tableForm, setTableForm] = useState({
        size: '',
        status: true,
        location: ''
    });




    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ message: '', type: 'success' });

    const showMessage = (msg, type = 'success') => {
        setAlertConfig({ message: msg, type });
        setShowAlert(true);
    };



    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/restaurants/${id}`)
            .then(res => {
                setRestaurant(res.data);
            })
            .catch(err => {
                console.error('Failed to fetch restaurant:', err);
            });
    }, [id]);

    const handleChange = (e) => {
        setRestaurant({
            ...restaurant,
            [e.target.name]: e.target.value
        });
    };

    const handleTableChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTableForm({
            ...tableForm,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleTableSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://127.0.0.1:8000/api/restaurants/${id}/tables`, {
            size: parseInt(tableForm.size),
            status: tableForm.status ? 1 : 0,
            location: tableForm.location
        })
            .then(() => {
                showMessage('Table added successfully!');
                setTableForm({ size: '', status: true, location: '' });
            })
            .catch(err => {
                console.error('Error adding table:', err);
                showMessage('Failed to add table', 'danger');
            });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/restaurants/${id}`, restaurant)
            .then(res => {
                showMessage('Restaurant updated successfully!', 'success');
                setTimeout(() => {
                    navigate(`/restaurants/${id}`);
                }, 1000);
            })
            .catch(err => {
                console.error('Update failed:', err);
                showMessage('Something went wrong while updating.', 'danger');
            });
    };

    return (
        <div className="container mt-4 d-flex">
            <div className='col-sm-8'>
                <div className='d-flex justify-content-between mb-4'>
                    <h2 className='sansita text-secondary fw-bold'>Restaurant Details</h2>
                    <i class="bi bi-pencil-square fs-3 me-3 "></i>
                </div>
                <hr />
                <form onSubmit={handleSubmit} className="mt-4 resbutton text-secondary">
                    <div className="mb-3">
                        <label>Name</label>
                        <input name="name" className="form-control" value={restaurant.name} onChange={handleChange} required />
                    </div>

                    <div className="mb-3 d-flex align-items-center justify-content-between">
                    <div className="mb-3 col-sm-6 me-2">
                        <label>Address</label>
                        <input name="address" className="form-control" value={restaurant.address} onChange={handleChange} required />
                    </div>
                    <div className="mb-3 col-sm-6">
                        <label style={{ whiteSpace: 'nowrap' }}>Phone Number</label>
                        <input name="phonenumber" className="form-control " style={{ width: '98%' }} value={restaurant.phonenumber} onChange={handleChange} required />
                    </div>
                    </div>





                    <div className="mb-3">
                        <label>Cuisine</label>
                        <input name="cuisine" className="form-control" value={restaurant.cuisine} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label>Description</label>
                        <textarea name="description" className="form-control" style={{ height: '150px' }} value={restaurant.description || ''} onChange={handleChange}></textarea>
                    </div>

                    <div className="mb-3 d-flex align-items-center">
                        <label className='col-sm-2' style={{ whiteSpace: 'nowrap' }}>Opening Hours</label>
                        <input name="opening_hours" className="form-control" value={restaurant.opening_hours} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label>Capacity</label>
                        <input name="capacity" type="number" className="form-control" value={restaurant.capacity || ''} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label>Manager ID</label>
                        <input name="manager_id" type="text" className="form-control" value={restaurant.manager_id || ''} onChange={handleChange} />
                    </div>

                    <button className="btn btn-secondary resbutton w-75 fs-4">Save</button>
                </form>
            </div>


            <div className='col-sm-4 ms-5 mt-1'>
                <div className='d-flex justify-content-between mb-4'>
                    <h4 className='fw-bold text-secondary sansita'>Add Table</h4>
                    <i class="bi bi-align-top fs-3 me-3"></i>
                </div>
                <hr />
                <form onSubmit={handleTableSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Table Size</label>
                        <input
                            type="number"
                            className="form-control"
                            name="size"
                            value={tableForm.size}
                            onChange={handleTableChange}
                            required
                        />
                    </div>

                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="status"
                            checked={tableForm.status}
                            onChange={handleTableChange}
                        />
                        <label className="form-check-label">Available?</label>
                    </div>


                    <div className='d-flex align-items-center '>
                        <div className="mb-3 col-sm-6 me-3">
                            <label className="form-label">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                name="location"
                                value={tableForm.location}
                                onChange={handleTableChange}
                            />
                        </div>



                        <button type="submit" className="btn btn-secondary resbutton col-sm-6 mt-3">Add Table</button>
                    </div>
                </form>
            </div>


            {showAlert && (
                <AlertPopup
                    message={alertConfig.message}
                    type={alertConfig.type}
                    onClose={() => setShowAlert(false)}
                />
            )}

        </div>
    );
}


const AlertPopup = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`alert-popup bg-${type}`}>
            <span>{message}</span>
            <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
    );
};




export default RestaurantEdit;
