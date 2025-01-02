import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const Container = styled(Box)({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  height: '100%',
  gap: 24,
  overflow: 'hidden',
});

export const MainContent = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 400px',
  overflow: 'hidden',
  height: '100%',
});

export const ContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  overflow: 'auto',
  padding: '16px',
});

export const FormSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '16px',
  backgroundColor: '#f5f5f5',
  borderRadius: 4,
});

export const GridRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 16,
});

export const TimeGrid = styled(GridRow)();

export const CenteredContent = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export const NoDataText = styled(Typography)({
  color: '#666',
  fontSize: '1.125rem',
});
