import { GridRenderCellParams } from '@mui/x-data-grid';
import { StyledLink } from './ReportNumberCell.styles';

export const ReportNumberCell = ({ row }: GridRenderCellParams) => {
  return (
    <StyledLink to={`/inspections/${row.reportNumber}`}>
      {row.reportNumber}
    </StyledLink>
  );
};
