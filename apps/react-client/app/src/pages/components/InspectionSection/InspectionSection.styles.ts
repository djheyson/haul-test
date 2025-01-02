import { styled } from '@mui/material/styles';
import { Box, TableCell, TableContainer } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

export const StyledTableContainer = styled(TableContainer, {
  shouldForwardProp: (prop) => prop !== 'component',
})(() => ({
  '& .MuiTableCell-root': {
    padding: '12px 16px',
  },
}));

export const HeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  backgroundColor: theme.palette.grey[50],
}));

export const LinkCell = styled(TableCell)(() => ({
  '& .MuiLink-root': {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export const StatusContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
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
  transition: theme.transitions.create('background-color'),
}));

export const StatusText = styled('span')(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 500,
  color: theme.palette.text.primary,
}));
