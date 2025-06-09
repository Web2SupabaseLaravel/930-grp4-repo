import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function CustomerManagement() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        axios.get(`http://`)
            .then(res => {
                setCustomer(res.data);
            });
    }, [id]);




}
export default CustomerManagement;