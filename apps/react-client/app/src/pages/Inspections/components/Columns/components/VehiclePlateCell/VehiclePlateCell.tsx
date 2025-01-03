import { GridRenderCellParams } from '@mui/x-data-grid';
import {
  VehicleList,
  VehicleItem,
  VehicleType,
  LicenseNumber,
} from './VehiclePlateCell.styles';
import { VehicleModal } from '../../../../../components';
import { useState } from 'react';

export const VehiclePlateCell = ({ row }: GridRenderCellParams) => {
  const [vehicleIdNumber, setVehicleIdNumber] = useState<string>();
  return (
    <VehicleList>
      {row.vehicles
        .filter((v: any) => v.unitType && v.licenseNumber)
        .map((v: any, index: number) => (
          <VehicleItem key={index}>
            <VehicleType>{`${v.unitType}:`}</VehicleType>
            <LicenseNumber
              onClick={() => setVehicleIdNumber(v.vehicleIdNumber)}
            >
              {v.licenseNumber}
            </LicenseNumber>
          </VehicleItem>
        ))}

      {vehicleIdNumber && (
        <VehicleModal
          vehicleIdNumber={vehicleIdNumber}
          onClose={() => setVehicleIdNumber(undefined)}
        />
      )}
    </VehicleList>
  );
};
