import { styled } from '@mui/material/styles';
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';

export const GridContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  height: '100%',
  gap: theme.spacing(2),
}));

export const StyledDataGrid = styled(MuiDataGrid)(({ theme }) => ({
  fontSize: '12px',

  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.grey[50],
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  '& .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  '& .MuiDataGrid-row:hover': {
    backgroundColor: theme.palette.action.hover,
  },

  '& .MuiDataGrid-footerContainer': {
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.grey[50],
  },

  // Loading overlay styling
  '& .MuiDataGrid-loadingOverlay': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

  // Selected row styling
  '& .MuiDataGrid-row.Mui-selected': {
    backgroundColor: `${theme.palette.primary.light}20`,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.light}30`,
    },
  },
}));

export const LoadingContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));
