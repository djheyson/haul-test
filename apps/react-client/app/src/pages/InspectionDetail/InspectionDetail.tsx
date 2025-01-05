import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { getInspection } from '../../api';
import { useEffect, useState } from 'react';
import { ResponseGetInspection } from '@haul/nest-api/app/inspection/inspection.service';
import { PageHeader } from '@toolpad/core';
import { Box, Typography, TextField, CircularProgress } from '@mui/material';
import { VehicleSection, ViolationSection, VehicleCard } from '../components';
import {
  Container,
  MainContent,
  ContentContainer,
  FormSection,
  GridRow,
  TimeGrid,
  CenteredContent,
  NoDataText,
} from './InspectionDetail.styles';

export function InspectionDetail() {
  const { reportNumber } = useParams();
  const [data, setData] = useState<ResponseGetInspection>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (reportNumber) {
      setIsLoading(true);
      getInspection(reportNumber)
        .then(setData)
        .finally(() => setIsLoading(false));
    }
  }, [reportNumber]);

  if (isLoading)
    return (
      <CenteredContent>
        <CircularProgress />
      </CenteredContent>
    );

  if (!data)
    return (
      <Container>
        <CenteredContent>
          <NoDataText>No inspection data found</NoDataText>
        </CenteredContent>
      </Container>
    );

  const vehicles = data?.vehicles.filter((v) => v.unitType);
  const violations = data?.violations.filter((v) => v.code);

  return (
    <Container>
      <PageHeader
        breadcrumbs={[
          { path: '/', title: 'Home' },
          { path: '/inspections', title: 'Inspections' },
          {
            path: `/inspections/${data.reportNumber}`,
            title: data.reportNumber,
          },
        ]}
      />

      <MainContent>
        <ContentContainer>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h5">Inspection Overview</Typography>

            <FormSection>
              <GridRow>
                <TextField
                  disabled
                  label="Status"
                  variant="filled"
                  defaultValue={data.status.value}
                />
                <TextField
                  disabled
                  label="Report Number"
                  variant="filled"
                  defaultValue={data.reportNumber}
                />
              </GridRow>

              <GridRow>
                <TextField
                  disabled
                  label="USDOT #"
                  variant="filled"
                  defaultValue="-"
                />
                <TextField
                  disabled
                  label="Report State"
                  variant="filled"
                  defaultValue={data.reportState}
                />
              </GridRow>

              <GridRow>
                <TextField
                  disabled
                  label="Date"
                  variant="filled"
                  defaultValue={dayjs(data.inspectionDate).format(
                    'MMM DD, YYYY'
                  )}
                />
                <TimeGrid>
                  <TextField
                    disabled
                    label="Start Time"
                    variant="filled"
                    defaultValue="-"
                  />
                  <TextField
                    disabled
                    label="End Time"
                    variant="filled"
                    defaultValue="-"
                  />
                </TimeGrid>
              </GridRow>

              <GridRow>
                <TextField
                  disabled
                  label="Level"
                  variant="filled"
                  defaultValue={data.level}
                />
                <TextField
                  disabled
                  label="Facility"
                  variant="filled"
                  defaultValue="-"
                />
              </GridRow>

              <GridRow>
                <TextField
                  disabled
                  label="HM Inspection"
                  variant="filled"
                  defaultValue={data.hmInspection}
                />
                <TextField
                  disabled
                  label="Hazmat Placard Required"
                  variant="filled"
                  defaultValue={data.placarableHmVehInsp}
                />
              </GridRow>
            </FormSection>
          </Box>

          <VehicleSection vehicles={vehicles} />
          <ViolationSection violations={violations} />
        </ContentContainer>

        <ContentContainer>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h5">Vehicles</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {vehicles
                .filter((vehicle) => Boolean(vehicle.unitType))
                .map((vehicle) => (
                  <VehicleCard key={vehicle.vehicleIdNumber} {...vehicle} />
                ))}
            </Box>
          </Box>
        </ContentContainer>
      </MainContent>
    </Container>
  );
}
