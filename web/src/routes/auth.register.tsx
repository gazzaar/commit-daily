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
      <form onSubmit={hndleSubmit}>
        <div>
          <label> Full Name:</label>
          <input
            type='text'
            name='fullName'
            placeholder='Fathy Elgazzaar'
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

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

        <button type='submit'>Sign up</button>
        <Link to='/auth/login'>Already have an account! Login now</Link>
      </form>
    </>
  );
}
