import { styled } from '@mui/material/styles';

export const CellContainer = styled('div')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const TextContainer = styled('div')(({ theme }) => ({
  lineHeight: '1.5em',
  whiteSpace: 'normal',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  color: theme.palette.text.primary,
  fontSize: theme.typography.body2.fontSize,
}));

export const EmptyCell = styled('span')(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontStyle: 'italic',
}));
