import { styled } from '@mui/material/styles';

export const VehicleList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  lineHeight: '1.5em',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: theme.spacing(0.5),
}));

export const VehicleItem = styled('li')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.primary,
  gap: theme.spacing(0.5),
}));

export const VehicleType = styled('span')(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  fontSize: '0.75em',
  letterSpacing: '0.1em',
}));

export const LicenseNumber = styled('span')(({ theme }) => ({
  letterSpacing: '0.05em',
  fontSize: '0.8em',
  color: theme.palette.primary.main,
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
}));
