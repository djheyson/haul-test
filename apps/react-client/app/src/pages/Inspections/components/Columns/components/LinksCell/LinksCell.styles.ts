import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export const LinksCellContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  height: '100%',
  alignItems: 'center',
}));

export const IconWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.shorter,
  }),

  '&:hover:not(:disabled)': {
    transform: 'scale(1.1)',
    backgroundColor: theme.palette.action.hover,
  },

  '&:disabled': {
    opacity: 0.5,
  },
}));

export const StyledLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
});
