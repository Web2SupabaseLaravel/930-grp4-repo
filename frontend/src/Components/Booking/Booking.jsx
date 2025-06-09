import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Booking() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        axios.get(`http://`)
            .then(res => {
                setBook(res.data);
            });
    }, [id]);




}

export default Booking;