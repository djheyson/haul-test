import { api } from '../../utils/api';
import { AxiosError } from 'axios';

export const cleanInspections = async (): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>('/clean');
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error cleaning inspections:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
