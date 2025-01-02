import { Vehicle } from '@haul/nest-api/app/inspection/inspection.service';
import { VehicleInfo } from '@haul/nest-api/app/vehicle/vehicle.service';
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

export const VehicleSection = ({
  vehicles,
  vehicleInfo,
}: {
  vehicles: Vehicle[];
  vehicleInfo: VehicleInfo[];
}) => {
  if (!vehicles?.length || !vehicleInfo?.length) return null;

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
              <TableCell align="right">Plate state</TableCell>
              <TableCell align="right">Plate number</TableCell>
              <TableCell align="right">VIN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.unit}
                </TableCell>
                <TableCell component="th" scope="row" align="right">
                  {row.unitType}
                </TableCell>
                <TableCell align="right">
                  {
                    vehicleInfo.find(
                      (info) => info.vehicleIdNumber === row.vehicleIdNumber
                    )?.make
                  }
                </TableCell>
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
