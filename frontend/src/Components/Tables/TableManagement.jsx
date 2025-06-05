import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function TableManagement() {
    const { id } = useParams();
    const [table, setTable] = useState(null);

    useEffect(() => {
        axios.get(`http://`)
            .then(res => {
                setTable(res.data);
            });
    }, [id]);





}
export default TableManagement;