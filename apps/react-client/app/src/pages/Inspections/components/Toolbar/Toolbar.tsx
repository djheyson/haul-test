import { GridToolbarProps, ToolbarPropsOverrides } from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, InputAdornment, InputLabel } from '@mui/material';
import { Filters } from '@haul/nest-api/app/inspection/inspection.service';
import { cleanInspections } from '@haul/react-client/api';
import {
  ToolbarContainer,
  FiltersContainer,
  FilterControl,
} from './Toolbar.styles';

declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    allBasics?: string[];
    allStatus?: string[];
    allAssignedTo?: string[];
    filters?: Filters;
    onChangeFilters?: (filters: Filters) => void;
    refetch?: () => void;
  }
}

export function Toolbar({
  allBasics,
  allStatus,
  allAssignedTo,
  filters,
  onChangeFilters,
  refetch,
}: Partial<GridToolbarProps & ToolbarPropsOverrides>) {
  return (
    <ToolbarContainer>
      <FiltersContainer>
        <FilterControl variant="standard" size="small">
          <Select
            startAdornment={
              <InputAdornment position="start">
                <InputLabel id="assigned-to-label">Assigned To:</InputLabel>
              </InputAdornment>
            }
            id="assigned-to"
            labelId="assigned-to-label"
            value={(filters?.assignedTo as string) ?? ''}
            defaultValue=""
            onChange={(event: SelectChangeEvent) => {
              onChangeFilters?.({ assignedTo: event.target.value });
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {allAssignedTo?.map((assignedTo, index) => (
              <MenuItem key={index} value={assignedTo}>
                {assignedTo}
              </MenuItem>
            ))}
          </Select>
        </FilterControl>

        <FilterControl variant="standard" size="small">
          <Select
            startAdornment={
              <InputAdornment position="start">
                <InputLabel id="status-label">Status:</InputLabel>
              </InputAdornment>
            }
            id="status"
            labelId="status-label"
            value={(filters?.status as string) ?? ''}
            defaultValue=""
            onChange={(event: SelectChangeEvent) => {
              onChangeFilters?.({ status: event.target.value });
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {allStatus?.map((status, index) => (
              <MenuItem key={index} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FilterControl>

        <FilterControl variant="standard" size="small">
          <Select
            startAdornment={
              <InputAdornment position="start">
                <InputLabel id="basic-label">Basic:</InputLabel>
              </InputAdornment>
            }
            id="basic"
            labelId="basic-label"
            value={(filters?.basic as string) ?? ''}
            defaultValue=""
            onChange={(event: SelectChangeEvent) => {
              onChangeFilters?.({ basic: event.target.value });
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {allBasics?.map((basic, index) => (
              <MenuItem key={index} value={basic}>
                {basic}
              </MenuItem>
            ))}
          </Select>
        </FilterControl>
      </FiltersContainer>

      <Button
        variant="outlined"
        color="error"
        onClick={() => cleanInspections().finally(() => refetch?.())}
      >
        Clean All Data
      </Button>
    </ToolbarContainer>
  );
}
