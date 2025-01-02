import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
  padding: theme.spacing(4),
  outline: 'none',
}));

export const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 200,
});

export const VehicleInfoContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
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
