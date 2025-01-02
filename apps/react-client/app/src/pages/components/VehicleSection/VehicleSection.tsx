import { Vehicle } from '@haul/nest-api/app/inspection/inspection.service';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';

interface VehicleSectionProps {
  vehicles: Vehicle[];
}

export const VehicleSection = ({ vehicles }: VehicleSectionProps) => {
  if (!vehicles?.length) return null;

  return (
    <Box>
      <Typography variant="h5">Vehicle Information</Typography>

      <TableContainer component={Paper}>
        <Table aria-label="vehicle table">
          <TableHead>
            <TableRow>
              <TableCell>Unit</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Make</TableCell>
              <TableCell align="right" style={{ whiteSpace: 'nowrap' }}>
                Plate state
              </TableCell>
              <TableCell align="right" style={{ whiteSpace: 'nowrap' }}>
                Plate number
              </TableCell>
              <TableCell align="right" style={{ whiteSpace: 'nowrap' }}>
                VIN
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.unit}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  align="right"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {row.unitType}
                </TableCell>
                <TableCell align="right">{row.vehicleInfo?.make}</TableCell>
                <TableCell align="right">{row.licenseState}</TableCell>
                <TableCell align="right">{row.licenseNumber}</TableCell>
                <TableCell align="right">{row.vehicleIdNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
