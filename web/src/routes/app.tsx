import { createFileRoute, redirect } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import Header from '../components/Header';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const Route = createFileRoute('/app')({
  beforeLoad: ({ location }) => {
    if (location.pathname === '/app' || location.pathname === '/app/') {
      throw redirect({
        to: '/app/dashboard',
      });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <>
      <ProtectedRoute>
        <Header />
        <Outlet />
      </ProtectedRoute>
    </>
  );
}
