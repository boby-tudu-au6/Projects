import { useEffect } from 'react';
import Router from 'next/router';

import { useAuthState, useAuthDispatch } from '../context/auth';
const About = () => {
    const { logout } = useAuthDispatch();
    const { user } = useAuthState();
    useEffect(() => {
        if (!user) Router.push('/login')
    }, [user])
    return (
        <div>
            <h1>Welcome { user }</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
 
export default About;