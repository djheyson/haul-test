import { VehicleResponse } from '@haul/nest-api/app/vehicle/vehicle.service';
import { api } from '../../utils/api';
import { AxiosError } from 'axios';

export const getVehicleInfo = async (
  vin: string
): Promise<VehicleResponse | null> => {
  try {
    const response = await api.get<VehicleResponse>(`/vehicle/${vin}`);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error fetching vehicle info:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return null;
  }
};
