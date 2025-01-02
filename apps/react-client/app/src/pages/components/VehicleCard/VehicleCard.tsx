import { Typography, Avatar, CardContent } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import { Vehicle } from '@haul/nest-api/app/inspection/inspection.service';
import { StyledCard, CardHeader, CardDetails } from './VehicleCard.styles';

export const VehicleCard = (vehicle: Vehicle) => {
  const isTrailer = vehicle.vehicleInfo?.vehicleType === 'TRAILER';

  return (
    <StyledCard>
      <CardContent>
        <CardHeader>
          <Avatar sx={{ bgcolor: 'grey.200' }}>
            {isTrailer ? <RvHookupIcon /> : <LocalShippingIcon />}
          </Avatar>
          <Typography variant="h6">
            {isTrailer ? `Trailer #${vehicle.unit}` : `Truck #${vehicle.unit}`}
          </Typography>
        </CardHeader>

        <CardDetails>
          <Typography variant="body2" color="text.secondary">
            <strong>VIN:</strong> {vehicle.vehicleIdNumber || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Make:</strong>{' '}
            {`${vehicle.vehicleInfo?.modelYear} ${vehicle.vehicleInfo?.make}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Model:</strong> {vehicle.vehicleInfo?.model || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Type:</strong> {vehicle.vehicleInfo?.vehicleType || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Manufacturer:</strong>{' '}
            {vehicle.vehicleInfo?.manufacturer || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Body/Cab:</strong>{' '}
            {vehicle.vehicleInfo?.bodyCabType || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Body Class:</strong>{' '}
            {vehicle.vehicleInfo?.bodyClass || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Brake System:</strong>{' '}
            {vehicle.vehicleInfo?.brakeSystemType || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Drive Type:</strong>{' '}
            {vehicle.vehicleInfo?.driveType || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Fuel Type:</strong>{' '}
            {vehicle.vehicleInfo?.fuelTypePrimary || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Description:</strong>{' '}
            {vehicle.vehicleInfo?.vehicleDescriptor || 'N/A'}
          </Typography>
        </CardDetails>
      </CardContent>
    </StyledCard>
  );
};
