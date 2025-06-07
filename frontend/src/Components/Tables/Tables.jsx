import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Tables() {
    const { id } = useParams();
    const [tables, setTables] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/restaurants/${id}/tables`)
            .then(res => {
                setTables(res.data.tables);
            });
    }, [id]);




}


export default Tables;