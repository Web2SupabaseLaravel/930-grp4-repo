import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ReservationSchedule() {
    const { id } = useParams();
    const [schedule, setSchedule] = useState(null);

    useEffect(() => {
        axios.get(`http://`)
            .then(res => {
                setSchedule(res.data);
            });
    }, [id]);





}
export default ReservationSchedule;