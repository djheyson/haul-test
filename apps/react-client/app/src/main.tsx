import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardLayout } from './layouts';
import { Home, About, Inspections, InspectionDetail } from './pages';

import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InfoIcon from '@mui/icons-material/Info';

import App from './app/App';

export const routes = [
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: DashboardLayout,
        children: [
          {
            path: '',
            title: 'Home',
            icon: <HomeIcon />,
            crumb: () => 'Home',
            Component: Home,
          },
          {
            path: 'inspections',
            title: 'Inspections',
            icon: <LocalShippingIcon />,
            crumb: () => 'Inspections',
            children: [
              {
                index: true,
                Component: Inspections,
              },
              {
                path: ':reportNumber',
                Component: InspectionDetail,
                crumb: () => 'Inspection Detail',
              },
            ],
          },
          {
            path: 'about',
            title: 'About',
            icon: <InfoIcon />,
            crumb: () => 'About',
            Component: About,
          },
        ],
      },
    ],
  },
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter(routes)} />
  </StrictMode>
);
