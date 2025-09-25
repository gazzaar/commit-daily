import { createFileRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import Header from '../components/header/Header';

export const Route = createFileRoute('/app')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
