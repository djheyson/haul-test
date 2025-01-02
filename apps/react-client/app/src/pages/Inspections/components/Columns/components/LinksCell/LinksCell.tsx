import { useState } from 'react';
import { Tooltip } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  LinksCellContainer,
  IconWrapper,
  StyledIconButton,
  StyledLink,
} from './LinksCell.styles';
import { VehicleModal } from '../VehicleModal/VehicleModal';

export const LinksCell = ({ row }: GridRenderCellParams) => {
  const [vehicleIdNumber, setVehicleIdNumber] = useState<string>();

  const driver = row.vehicles.find((v: any) => v.unitType === 'Driver');
  const truck = row.vehicles.find((v: any) => v.unitType?.includes('Truck'));
  const trailer = row.vehicles.find(
    (v: any) =>
      v.unitType?.includes('Trailer') || v.unitType?.includes('Intermodal')
  );

  return (
    <LinksCellContainer>
      <Tooltip title="Driver">
        <IconWrapper>
          <StyledIconButton
            aria-label="driver"
            size="small"
            color="primary"
            disabled={!driver}
          >
            <PersonIcon />
          </StyledIconButton>
        </IconWrapper>
      </Tooltip>

      <Tooltip title="Truck">
        <IconWrapper>
          <StyledIconButton
            aria-label="truck"
            size="small"
            color="primary"
            disabled={!truck}
            onClick={() => setVehicleIdNumber(truck?.vehicleIdNumber)}
          >
            <LocalShippingIcon />
          </StyledIconButton>
        </IconWrapper>
      </Tooltip>

      <Tooltip title="Trailer">
        <IconWrapper>
          <StyledIconButton
            aria-label="trailer"
            size="small"
            color="primary"
            disabled={!trailer}
            onClick={() => setVehicleIdNumber(trailer?.vehicleIdNumber)}
          >
            <RvHookupIcon />
          </StyledIconButton>
        </IconWrapper>
      </Tooltip>

      <Tooltip title="Open details">
        <IconWrapper>
          <StyledLink to={`/inspections/${row.reportNumber}`}>
            <StyledIconButton
              aria-label="open"
              size="small"
              color="primary"
              disabled={!row.id}
            >
              <OpenInNewIcon />
            </StyledIconButton>
          </StyledLink>
        </IconWrapper>
      </Tooltip>

      {vehicleIdNumber && (
        <VehicleModal
          vehicleIdNumber={vehicleIdNumber}
          onClose={() => setVehicleIdNumber(undefined)}
        />
      )}
    </LinksCellContainer>
  );
};
