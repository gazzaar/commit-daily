import { createFileRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { AuthRoute } from '../components/AuthRoute';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthRoute>
      <Outlet />
    </AuthRoute>
  );
}
