import { styled } from '@mui/material/styles';

export const StatusContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const StatusDot = styled('div')<{
  status: 'no-violation' | 'violation';
}>(({ theme, status }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor:
    status === 'no-violation'
      ? theme.palette.success.light
      : theme.palette.error.light,
  boxShadow: `0 0 4px ${
    status === 'no-violation'
      ? theme.palette.success.light
      : theme.palette.error.light
  }`,
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const StatusText = styled('span')(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 500,
  color: theme.palette.text.primary,
}));
