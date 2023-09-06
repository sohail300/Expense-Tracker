import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useFetchReq = () => {
    const [signedUp, setSignedUp] = useState(null);

    async function getData() {
        const result = await axios.get('http://localhost:5000/auth/me', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        setSignedUp(result.data.id)
    }

    useEffect(() => {
        getData();
    }, [])

    return signedUp;
}

export default useFetchReq