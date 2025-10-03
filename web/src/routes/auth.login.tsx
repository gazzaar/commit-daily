import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { validateFileds } from '../util/validateForm';

export const Route = createFileRoute('/auth/login')({
  component: Login,
});

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const hndleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    (document.activeElement as HTMLElement)?.blur();
    setError(null);

    const validationError = validateFileds(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await login.mutateAsync({ email, password });
    } catch (error: any) {
      setError(error.message);
      setEmail('');
      setPassword('');
    }
  };
  return (
    <>
      <form className="form" onSubmit={hndleSubmit}>
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            required
            placeholder="example@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            name="password"
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="p@ssw0rd"
          />
        </div>

        <button className="btn" type="submit">
          Log in
        </button>
        <p>
          Don't have an account!{' '}
          <Link className="link" to="/auth/register">
            {' '}
            Register now
          </Link>
        </p>

        <p className="text-sm text-red-500 min-h-[20px]">{error ?? ' '}</p>
      </form>
    </>
  );
}
