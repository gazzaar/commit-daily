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
      <form onSubmit={hndleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            placeholder='example@mail.com'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type='text'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
          />
        </div>

        <button type='submit'>Log in</button>
        <Link to='/auth/register'> Don't have an account! Register now</Link>
      </form>
    </>
  );
}
