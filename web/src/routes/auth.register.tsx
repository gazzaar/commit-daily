import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { validateRegister } from '../util/validateForm';

export const Route = createFileRoute('/auth/register')({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const [fullName, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const hndleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    (document.activeElement as HTMLElement)?.blur();
    setError(null);

    const validationError = validateRegister(fullName, email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await register.mutateAsync({ fullName, email, password });
      setEmail('');
      setFullname('');
      setPassword('');
      setError('');
      navigate({ to: '/auth/login' });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <form className="form" id="register" onSubmit={hndleSubmit}>
        <div className="input-container">
          <label htmlFor="full-name"> Full Name:</label>
          <input
            type="text"
            name="fullName"
            id="full-name"
            required
            value={fullName}
            placeholder="Fathy Elgazzaar"
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={email}
            placeholder="example@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="p@ssw0rd"
          />
        </div>

        <button className="btn" type="submit" disabled={isLoading}>
          Sign up
        </button>
        <p>
          Already have an account!
          <Link to="/auth/login" className="link">
            {' '}
            Login now
          </Link>
        </p>
        <p className="text-sm text-red-500 min-h-[20px]">{error ?? ' '}</p>
      </form>
    </>
  );
}
