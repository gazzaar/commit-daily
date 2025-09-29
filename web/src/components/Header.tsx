import { useAuth } from '../../auth/AuthContext';
import { Link } from '@tanstack/react-router';
const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      <header className='header'>
        <h1> Commit Daily</h1>

        {isAuthenticated ? (
          <h1>welcome {user?.fullName}!</h1>
        ) : (
          <h1> welocme guest!</h1>
        )}

        {isAuthenticated ? (
          <>
            <div className='tabs'>
              <Link to='/app/manage-habits' className='link'>
                manage Habits
              </Link>
              <Link to='/app/dashboard' className='link'>
                dashboard
              </Link>
            </div>
            <button className='btn' onClick={() => logout()}>
              logout
            </button>
          </>
        ) : (
          <>
            <div className='btnsContainer'>
              <Link className='link' to='/auth/register'>
                Register
              </Link>
              <Link className='link' to='/auth/login'>
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
