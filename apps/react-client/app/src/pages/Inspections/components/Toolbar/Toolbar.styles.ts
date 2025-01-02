import { FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ToolbarContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: theme.spacing(1),
  alignItems: 'center',
}));

export const FiltersContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
  flexWrap: 'wrap',
}));

export const FilterControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
}));
