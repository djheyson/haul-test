import dayjs from 'dayjs';
import { GridColDef } from '@mui/x-data-grid';

import {
  StatusCell,
  ReportNumberCell,
  VehiclePlateCell,
  DescriptionCell,
  LinksCell,
} from './components';

export const columns: GridColDef[] = [
  {
    editable: false,
    field: 'inspectionDate',
    headerName: 'Date',
    width: 120,
    valueGetter: (inspectionDate: any) => {
      return dayjs(inspectionDate).format('MMM DD, YYYY');
    },
  },
  {
    editable: false,
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: StatusCell,
  },
  {
    editable: false,
    field: 'reportNumber',
    headerName: 'Inspection Number',
    width: 150,
    renderCell: ReportNumberCell,
  },
  {
    editable: false,
    field: 'vehiclePlate',
    headerName: 'Vehicle Plate',
    width: 225,
    renderCell: VehiclePlateCell,
  },
  {
    editable: false,
    field: 'basic',
    headerName: 'Basic',
    width: 200,
    valueGetter: (_, row: any) => {
      const violations = new Set(row?.violations.map((v: any) => v.basic));
      return Array.from(violations).join(', ') || '-';
    },
  },
  {
    editable: false,
    field: 'description',
    headerName: 'Description',
    width: 200,
    type: 'string',
    valueGetter: (_, row: any) => {
      const violations = new Set(
        row?.violations.map((v: any) => v.description)
      );
      return Array.from(violations).join(', ') || null;
    },
    renderCell: DescriptionCell,
  },
  {
    editable: false,
    field: 'weight',
    headerName: 'Weight',
    width: 120,
    valueGetter: (_, row: any) => {
      return row?.timeWeight || '-';
    },
  },
  {
    editable: false,
    field: 'links',
    headerName: 'Links',
    width: 170,
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    renderCell: LinksCell,
  },
];
