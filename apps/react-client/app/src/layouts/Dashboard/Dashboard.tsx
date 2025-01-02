import { Outlet } from 'react-router-dom';
import { DashboardLayout as MuiDashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageHeader } from '@toolpad/core/PageContainer';
import { DashboardContainer, ContentBox } from './Dashboard.styles';

export function DashboardLayout() {
  return (
    <MuiDashboardLayout sidebarExpandedWidth={200}>
      <DashboardContainer>
        <PageHeader />
        <ContentBox>
          <Outlet />
        </ContentBox>
      </DashboardContainer>
    </MuiDashboardLayout>
  );
}
