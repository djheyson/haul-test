import { Box, Typography } from '@mui/material';
import { VehicleInfo } from '@haul/nest-api/app/vehicle/vehicle.service';
import {
  VehicleInfoContainer,
  InfoRow,
  InfoColumn,
} from './VehicleInfoContent.styles';

export const VehicleInfoContent = ({
  vehicleIdNumber,
  make,
  model,
  modelYear,
  vehicleType,
  manufacturer,
  bodyCabType,
  bodyClass,
  brakeSystemType,
  driveType,
  fuelTypePrimary,
  vehicleDescriptor,
}: VehicleInfo) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Typography variant="h6">Vehicle Information</Typography>

    <VehicleInfoContainer>
      <InfoColumn>
        {Boolean(vehicleIdNumber) && (
          <InfoRow>
            <strong>VIN:</strong> {vehicleIdNumber}
          </InfoRow>
        )}
        {Boolean(make) && (
          <InfoRow>
            <strong>Make:</strong> {make}
          </InfoRow>
        )}
        {Boolean(model) && (
          <InfoRow>
            <strong>Model:</strong> {model}
          </InfoRow>
        )}
        {Boolean(modelYear) && (
          <InfoRow>
            <strong>Model Year:</strong> {modelYear}
          </InfoRow>
        )}
        {Boolean(vehicleType) && (
          <InfoRow>
            <strong>Vehicle Type:</strong> {vehicleType}
          </InfoRow>
        )}
        {Boolean(manufacturer) && (
          <InfoRow>
            <strong>Manufacturer:</strong> {manufacturer}
          </InfoRow>
        )}
      </InfoColumn>

      <InfoColumn>
        {Boolean(bodyCabType) && (
          <InfoRow>
            <strong>Body Cab Type:</strong> {bodyCabType}
          </InfoRow>
        )}
        {Boolean(bodyClass) && (
          <InfoRow>
            <strong>Body Class:</strong> {bodyClass}
          </InfoRow>
        )}
        {Boolean(brakeSystemType) && (
          <InfoRow>
            <strong>Brake System Type:</strong> {brakeSystemType}
          </InfoRow>
        )}
        {Boolean(driveType) && (
          <InfoRow>
            <strong>Drive Type:</strong> {driveType}
          </InfoRow>
        )}
        {Boolean(fuelTypePrimary) && (
          <InfoRow>
            <strong>Fuel Type Primary:</strong> {fuelTypePrimary}
          </InfoRow>
        )}
        {Boolean(vehicleDescriptor) && (
          <InfoRow>
            <strong>Vehicle Descriptor:</strong> {vehicleDescriptor}
          </InfoRow>
        )}
      </InfoColumn>
    </VehicleInfoContainer>
  </Box>
);
