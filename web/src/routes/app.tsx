import { createFileRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import Header from '../components/Header';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const Route = createFileRoute('/app')({
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
