import { useState, useEffect } from 'react';

export default function useFindUser() {
   const [user, setUser] = useState('null');
   const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function findUser() {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/authentication/checkUser`, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.text()).then(body => {
                setUser(body);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
            });
        }
        findUser();
    });

    return {
    user,
    setUser,
    isLoading
    }
}