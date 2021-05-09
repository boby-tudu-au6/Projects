import Link from 'next/link';
import React from 'react';
import styles from '../../styles/Navbar.module.css';
import { useAuthState, useAuthDispatch } from '../../context/auth';


const Navbar = ({ children }) => {
    const { user, loggedIn } = useAuthState();
    const { logout } = useAuthDispatch();
    return (
        <React.Fragment>
            <div className={styles.navbar}>
                <div className={styles.header}>
                    <Link href='/'>
                        <a>
                            <h2>Ecomerce</h2>
                        </a>
                    </Link>
                </div>
                <div className={styles.links}>
                    {console.log(loggedIn)}
                    {
                        !loggedIn ? (
                            <React.Fragment>
                                <div className={styles.link}>
                                    <Link href='/register'>
                                        <a>
                                            <p>Register</p>
                                        </a>
                                    </Link>
                                </div>
                                <div className={styles.link}>
                                    <Link href='/login'>
                                        <a>
                                            <p>Login</p>
                                        </a>
                                    </Link>
                                </div>
                            </React.Fragment>
                            ) : (
                            <React.Fragment>
                                <div className={styles.link}>
                                    <Link href='/cart'>
                                        <a>
                                            <p>Cart</p>
                                        </a>
                                    </Link>
                                </div>
                                <div className={styles.link}>
                                    <Link href='/login' onClick={logout}>
                                        <a>
                                            <p>Logout</p>
                                        </a>
                                    </Link>
                                </div>
                        </React.Fragment>
                        )
                    }
                </div>
            </div>
            {children}
        </React.Fragment>
    );
}
 
export default Navbar;