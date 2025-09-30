import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { AuthRoute } from '../components/AuthRoute';

export const Route = createFileRoute('/auth/login')({
  component: Login,
});

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const hndleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login.mutateAsync({ email, password });
    } catch (err) {}
  };
  return (
    <>
      <form className='form' onSubmit={hndleSubmit}>
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
            required
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='p@ssw0rd'
          />
        </div>

        <button className='btn' type='submit'>
          Log in
        </button>
        <p>
          Don't have an account!{' '}
          <Link className='link' to='/auth/register'>
            {' '}
            Register now
          </Link>
        </p>
      </form>
    </>
  );
}
