import { api } from '../../utils/api';
import { AxiosError } from 'axios';

export const fetchInspections = async (
  carrierId: string
): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>('/fetch-inspections', {
      carrierId,
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error fetching inspections:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
