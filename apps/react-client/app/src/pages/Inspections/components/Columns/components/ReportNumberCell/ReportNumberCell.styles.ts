import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 500,
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.shortest,
  }),

  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.dark,
  },

  '&:active': {
    color: theme.palette.primary.dark,
  },

  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));
