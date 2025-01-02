import { GridRenderCellParams } from '@mui/x-data-grid';
import { StatusContainer, StatusDot, StatusText } from './StatusCell.styles';

export const StatusCell = ({ row }: GridRenderCellParams) => {
  const status = row.status.key as 'no-violation' | 'violation';

  return (
    <StatusContainer>
      <StatusDot status={status} />
      <StatusText>{row.status.value}</StatusText>
    </StatusContainer>
  );
};
