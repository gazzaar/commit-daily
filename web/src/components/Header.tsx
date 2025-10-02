import { useAuth } from '../auth/AuthContext';
import { Link } from '@tanstack/react-router';
import { HiOutlineLogout } from 'react-icons/hi';
const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className='header'>
      <div>
        <h1 className='text-primary'>Commit Daily</h1>
        <nav className='nav'>
          <Link to='/app/dashboard' className='tab'>
            Dashboard
          </Link>

          <Link to='/app/manage-habits' className='tab'>
            Manage Habits
          </Link>
        </nav>
      </div>

      <div>
        <h1 className='username'>Welcome, {user?.fullName}</h1>
        <button className='btn btn-logout' onClick={() => logout()}>
          <HiOutlineLogout />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
