import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const { id } = useParams();
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        axios.get(`http://`)
            .then(res => {
                setDashboard(res.data);
            });
    }, [id]);





}
export default Dashboard;