import { Tooltip } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import {
  CellContainer,
  TextContainer,
  EmptyCell,
} from './DescriptionCell.styles';

export const DescriptionCell = ({ value }: GridRenderCellParams) => {
  if (!value) return <EmptyCell>-</EmptyCell>;

  return (
    <Tooltip title={value}>
      <CellContainer>
        <TextContainer>{value}</TextContainer>
      </CellContainer>
    </Tooltip>
  );
};
