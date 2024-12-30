import { Outlet } from 'react-router-dom';
import { DashboardLayout as MuiDashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

export function DashboardLayout() {
  return (
    <MuiDashboardLayout>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </MuiDashboardLayout>
  );
}
