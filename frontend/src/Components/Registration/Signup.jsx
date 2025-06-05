import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Signup() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`http://`)
            .then(res => {
                setUser(res.data);
            });
    }, [id]);





}
export default Signup;