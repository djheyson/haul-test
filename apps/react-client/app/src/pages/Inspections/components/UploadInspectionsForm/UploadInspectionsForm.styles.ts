import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

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
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'end',
}));

export const FileInputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  width: '100%',
}));
