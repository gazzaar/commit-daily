import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { Link } from '@tanstack/react-router';
import styles from './header.module.css';
const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      <header className={styles.header}>
        <h1> Commit Daily</h1>

        {isAuthenticated ? (
          <h1>welcome {user?.fullName}!</h1>
        ) : (
          <h1> welocme guest!</h1>
        )}

        {isAuthenticated ? (
          <>
            <div className={styles.tabs}>
              <Link to='/app/manage-habits' className={styles.link}>
                manage Habits
              </Link>
              <Link to='/app/dashboard' className={styles.link}>
                dashboard
              </Link>
            </div>
            <button className={styles.btn} onClick={() => logout()}>
              logout
            </button>
          </>
        ) : (
          <>
            <div className={styles.btnsContainer}>
              <Link className={styles.link} to='/auth/register'>
                Register
              </Link>
              <Link className={styles.link} to='/auth/login'>
                Login
              </Link>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
