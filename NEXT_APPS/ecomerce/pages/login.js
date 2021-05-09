import { useState, useEffect } from "react";
import { useAuthState, useAuthDispatch } from '../context/auth';
import Router from 'next/router';
import styles from '../styles/login.module.css';

const Login = () => {
    const  [state, setstate] = useState({
        email: '',
        password: ''
    });
    const {login} = useAuthDispatch();
    const user = useAuthState();
    // useEffect(() => {
    //     if (user.loggedIn) Router.push('/about')
    // },[user.loggedIn])
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setstate({ ...state, [name]: value });
    }
    return (
        <div className={styles.body}>
            <div className={styles.form}>
                <h1 className={styles.heading}>Login</h1>
                <input
                    type="email"
                    value={state.email}
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter email"
                    className={styles.input}
                />
                <input
                    type="password"
                    value={state.password}
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter password"
                    className={styles.input}
                />
                <button className={styles.button} onClick={() => login(state)}>Login</button>
            </div>
        </div>
    );
}
 
export default Login;