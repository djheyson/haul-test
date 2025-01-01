import { ResponseGetInspection } from '@haul/nest-api/app/app.service';
import { api } from '../../utils/api';
import { AxiosError } from 'axios';

export const getInspection = async (
  reportNumber: string
): Promise<ResponseGetInspection> => {
  try {
    const response = await api.get<ResponseGetInspection>(
      `/inspection/${reportNumber}`
    );
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error fetching inspection:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return null;
  }
};
