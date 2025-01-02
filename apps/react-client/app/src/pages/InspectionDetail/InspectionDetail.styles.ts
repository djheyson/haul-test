import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Container = styled(Box)({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  overflow: 'auto',
  height: '100%',
  gap: 22,
});

export const ContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 22,
  overflow: 'auto',
});

export const FormSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

export const GridRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 10,
});

export const TimeGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 10,
});
