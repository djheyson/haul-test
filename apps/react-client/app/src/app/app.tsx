import { AppProvider } from '@toolpad/core/react-router-dom';
import { Outlet } from 'react-router-dom';
import type { Navigation } from '@toolpad/core';

import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InfoIcon from '@mui/icons-material/Info';
import logo from '../assets/logo.jpg';

const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Main items' },
  { segment: '', title: 'Home', icon: <HomeIcon /> },
  { segment: 'inspections', title: 'Inspections', icon: <LocalShippingIcon /> },
  { segment: 'about', title: 'About', icon: <InfoIcon /> },
];

const BRANDING = {
  title: 'Haul',
  homeUrl: '/',
  logo: <img src={logo} alt="Haul" />,
};

export default function App() {
  return (
    <AppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </AppProvider>
  );
}
