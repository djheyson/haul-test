import { Violation } from '@haul/nest-api/app/inspection/inspection.service';
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

interface ViolationSectionProps {
  violations: Violation[];
}

export const ViolationSection = ({ violations }: ViolationSectionProps) => {
  if (!violations?.length) return null;

  return (
    <Box>
      <Typography variant="h5">Violations</Typography>

      <TableContainer component={Paper}>
        <Table aria-label="violation table">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>OOS</TableCell>
              <TableCell>Description</TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>In SMS</TableCell>
              <TableCell>BASIC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {violations.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  {row.code}
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>{row.unit}</TableCell>
                <TableCell>{row.oos}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{row.basic}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
