import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: 500,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  height: '100%',
  justifyContent: 'center',
}));

export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  gap: theme.spacing(2),
}));

export const FileInputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  width: '100%',
}));

export const WarningBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#fff3e0', // Light orange background
  border: '1px solid #ffb74d', // Orange border
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.875rem',
  lineHeight: 1.5,
  color: '#e65100', // Dark orange text
  marginBottom: theme.spacing(2),
}));
