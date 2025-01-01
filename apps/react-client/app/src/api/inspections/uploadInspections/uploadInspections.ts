import { api } from '../../utils/api';
import { AxiosError } from 'axios';

export const uploadInspections = async (
  file: File
): Promise<{ message: string }> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<{ message: string }>(
      '/upload',
      formData as unknown as Record<string, unknown>,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error uploading inspections:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
