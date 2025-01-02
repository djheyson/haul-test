import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const VehicleInfoContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(3),
}));

export const InfoColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const InfoRow = styled(Box)({
  display: 'flex',
  gap: 8,
  '& strong': {
    fontWeight: 600,
  },
});
