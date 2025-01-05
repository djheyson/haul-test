import { styled } from '@mui/material/styles';
import { Box, Paper, Alert } from '@mui/material';

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
  backgroundColor: '#fff3e0',
  border: '1px solid #ffb74d',
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.875rem',
  lineHeight: 1.5,
  color: '#e65100',
  marginBottom: theme.spacing(2),
}));

export const ErrorAlert = styled(Alert)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  '& .MuiAlert-icon': {
    color: theme.palette.error.contrastText,
  },
}));
