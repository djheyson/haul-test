import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: 1200,
  maxHeight: '90vh',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
  padding: theme.spacing(4),
  outline: 'none',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

export const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 200,
});
