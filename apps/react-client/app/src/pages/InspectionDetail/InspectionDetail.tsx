import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { getInspection, getVehicleInfo } from '../../api';
import { useCallback, useEffect, useState } from 'react';
import {
  ResponseGetInspection,
  Vehicle,
  Violation,
} from '@haul/nest-api/app/inspection/inspection.service';
import { VehicleInfo } from '@haul/nest-api/app/vehicle/vehicle.service';
import { PageHeader } from '@toolpad/core';
import { Box, Typography, TextField } from '@mui/material';
import { VehicleSection, ViolationSection } from './components';
import {
  Container,
  ContentContainer,
  FormSection,
  GridRow,
  TimeGrid,
} from './InspectionDetail.styles';

export function InspectionDetail() {
  const { reportNumber } = useParams();
  const [data, setData] = useState<ResponseGetInspection>(null);
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (reportNumber) {
      setIsLoading(true);
      getInspection(reportNumber)
        .then(setData)
        .finally(() => setIsLoading(false));
    }
  }, [reportNumber]);

  useEffect(() => {
    if (data?.vehicles) {
      Promise.all(
        data.vehicles
          .filter((v) => v.vehicleIdNumber)
          .map((vehicle) =>
            getVehicleInfo(vehicle.vehicleIdNumber as string).then(
              (res) => res?.vehicleInfo
            )
          )
      ).then((res) => {
        if (res.length) {
          setVehicleInfo(
            res.filter((info): info is VehicleInfo => info !== undefined)
          );
        }
      });
    }
  }, [data]);

  const renderVehicleSection = useCallback(
    (vehicles: Vehicle[]) => {
      if (!data) return null;
      return <VehicleSection vehicles={vehicles} vehicleInfo={vehicleInfo} />;
    },
    [data, vehicleInfo]
  );

  const renderViolationSection = useCallback(
    (violations: Violation[]) => {
      if (!data) return null;
      return <ViolationSection violations={violations} />;
    },
    [data]
  );

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  const vehicles = data.vehicles.filter((v) => v.unitType);
  const violations = data.violations.filter((v) => v.code);

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

      <ContentContainer>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h5">Inspection Overview</Typography>

          <FormSection>
            <GridRow>
              <TextField disabled label="Status" variant="filled" />
              <TextField
                disabled
                label="Report Number"
                variant="filled"
                value={data.reportNumber}
              />
            </GridRow>

            <GridRow>
              <TextField disabled label="USDOT #" variant="filled" />
              <TextField
                disabled
                label="Report State"
                variant="filled"
                value={data.reportState}
              />
            </GridRow>

            <GridRow>
              <TextField
                disabled
                label="Date"
                variant="filled"
                value={dayjs(data.inspectionDate).format('MMM DD, YYYY')}
              />
              <TimeGrid>
                <TextField disabled label="Start Time" variant="filled" />
                <TextField disabled label="End Time" variant="filled" />
              </TimeGrid>
            </GridRow>

            <GridRow>
              <TextField
                disabled
                label="Level"
                variant="filled"
                value={data.level}
              />
              <TextField disabled label="Facility" variant="filled" />
            </GridRow>

            <GridRow>
              <TextField
                disabled
                label="HM Inspection"
                variant="filled"
                value={data.hmInspection}
              />
              <TextField
                disabled
                label="Hazmat Placard Required"
                variant="filled"
                value={data.placarableHmVehInsp}
              />
            </GridRow>
          </FormSection>
        </Box>

        {renderVehicleSection(vehicles)}
        {renderViolationSection(violations)}
      </ContentContainer>
    </Container>
  );
}
