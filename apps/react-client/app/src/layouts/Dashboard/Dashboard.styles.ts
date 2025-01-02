import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';

export const DashboardContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  overflow: 'auto',
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  height: '100%',
}));

export const ContentBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  overflow: 'auto',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));
