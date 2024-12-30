import Box from '@mui/material/Box';
import { DataGrid as MuiDataGrid, GridColDef } from '@mui/x-data-grid';
import { InspectionData } from '@haul/nest-api/app/app.service';
import { useEffect, useState } from 'react';
import { getInspections } from '../../api';

const columns: GridColDef[] = [
  { field: 'reportNumber', headerName: 'Report Number', width: 150 },
  { field: 'inspectionDate', headerName: 'Date', width: 120 },
  { field: 'reportState', headerName: 'State', width: 80 },
  { field: 'level', headerName: 'Level', width: 80 },
  {
    field: 'vehicle_info',
    headerName: 'Vehicle Info',
    width: 200,
    valueGetter: (params: any) => {
      const vehicle = params?.row?.vehicles?.[0];
      return vehicle
        ? `${vehicle.unitType} - ${vehicle.licenseState} ${
            vehicle.licenseNumber || ''
          }`
        : '';
    },
  },
  {
    field: 'violation_info',
    headerName: 'Violation',
    width: 300,
    valueGetter: (params: any) => {
      const violation = params?.row?.violations?.[0];
      return violation?.description
        ? `${violation.code}: ${violation.description}`
        : 'No Violation';
    },
  },
  { field: 'hmInspection', headerName: 'HM Inspection', width: 120 },
];

export function DataGrid() {
  const [data, setData] = useState<{ items: InspectionData[]; total: number }>({
    items: [],
    total: 0,
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  useEffect(() => {
    getInspections({ page, pageSize }).then(setData);
  }, [page, pageSize]);

  if (!data) return null;
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <MuiDataGrid
        rows={data.items}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[25, 50, 100]}
        paginationModel={{ page, pageSize }}
        paginationMode="server"
        rowCount={data.total}
        onPaginationModelChange={(paginationModel) => {
          setPage(paginationModel.page);
          setPageSize(paginationModel.pageSize);
        }}
      />
    </Box>
  );
}
