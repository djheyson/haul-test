import dayjs from 'dayjs';
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Link,
} from '@mui/material';
import { InspectionData } from '@haul/nest-api/app/inspection/inspection.service';
import {
  Container,
  StyledTableContainer,
  HeaderCell,
  LinkCell,
  StatusContainer,
  StatusDot,
  StatusText,
} from './InspectionSection.styles';

interface InspectionSectionProps {
  linkedInspections: InspectionData[];
}

export const InspectionSection = ({
  linkedInspections,
}: InspectionSectionProps) => {
  return (
    <Container>
      <Typography variant="h6">Linked Inspections</Typography>

      <Paper>
        <StyledTableContainer>
          <Table aria-label="inspections table">
            <TableHead>
              <TableRow>
                <HeaderCell>Date</HeaderCell>
                <HeaderCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                  Report Number
                </HeaderCell>
                <HeaderCell align="right">Status</HeaderCell>
                <HeaderCell align="right">Report State</HeaderCell>
                <HeaderCell align="right">Level</HeaderCell>

                <HeaderCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                  Time Weight
                </HeaderCell>
                <HeaderCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                  Placable Hm Veh Insp
                </HeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {linkedInspections.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {dayjs(row.inspectionDate).format('MMM DD, YYYY')}
                  </TableCell>
                  <LinkCell align="right">
                    <Link href={`/inspections/${row.reportNumber}`}>
                      {row.reportNumber}
                    </Link>
                  </LinkCell>
                  <TableCell align="right">
                    <StatusContainer>
                      <StatusDot
                        status={
                          row.status.value === 'No Violation'
                            ? 'no-violation'
                            : 'violation'
                        }
                      />
                      <StatusText>{row.status.value}</StatusText>
                    </StatusContainer>
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                    {row.reportState}
                  </TableCell>
                  <TableCell align="right">{row.level}</TableCell>
                  <TableCell align="right">{row.timeWeight}</TableCell>
                  <TableCell align="right">{row.placarableHmVehInsp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Paper>
    </Container>
  );
};
