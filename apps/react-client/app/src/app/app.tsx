import { AppProvider } from '@toolpad/core/react-router-dom';
import { Outlet } from 'react-router-dom';
import type { Navigation } from '@toolpad/core';
import logo from '../assets/logo.jpg';
import { routes } from '../main';
import { useMemo } from 'react';
import { flattenRoutes } from '../utils';

export default function App() {
  const NAVIGATION = useMemo<Navigation>(() => {
    return [
      { kind: 'header', title: 'Main items' },
      ...flattenRoutes(routes)
        .filter((route) => route.title)
        .map((route) => ({
          segment: route.path,
          title: route.title,
          icon: route.icon,
        })),
    ];
  }, [routes]);

  const BRANDING = useMemo(() => {
    return {
      title: 'Haul',
      homeUrl: '/',
      logo: <img src={logo} alt="Haul" />,
    };
  }, []);

  return (
    <AppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </AppProvider>
  );
}
