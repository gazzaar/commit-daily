import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { AuthRoute } from '../components/AuthRoute';

export const Route = createFileRoute('/auth/register')({
  component: Register,
});

function Register() {
  const [fullName, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();

  const hndleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register.mutateAsync({ fullName, email, password });
    } catch (err) {}
  };
  return (
    <>
      <form className='form' onSubmit={hndleSubmit}>
        <div className='input-container'>
          <label htmlFor='full-name'> Full Name:</label>
          <input
            type='text'
            name='fullName'
            id='full-name'
            required
            placeholder='Fathy Elgazzaar'
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <div className='input-container'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            name='email'
            id='email'
            required
            placeholder='example@mail.com'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='input-container'>
          <label htmlFor='password'>Password:</label>
          <input
            type='text'
            name='password'
            id='password'
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder='p@ssw0rd'
          />
        </div>

        <button className='btn' type='submit'>
          Sign up
        </button>
        <p>
          Already have an account!
          <Link to='/auth/login' className='link'>
            {' '}
            Login now
          </Link>
        </p>
      </form>
    </>
  );
}
