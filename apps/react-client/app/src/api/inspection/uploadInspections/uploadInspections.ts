import { api } from '../../utils/api';
import { AxiosError } from 'axios';

const CHUNK_SIZE = 1024 * 1024 * 2; // 2MB chunks

export const uploadInspections = async (
  file: File
): Promise<{ message: string }> => {
  try {
    const chunks = Math.ceil(file.size / CHUNK_SIZE);
    const fileId = Date.now().toString();

    for (let i = 0; i < chunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append('file', chunk);
      formData.append('fileId', fileId);
      formData.append('partNumber', i.toString());
      formData.append('totalParts', chunks.toString());
      formData.append('isLastPart', (i === chunks - 1).toString());

      const response = await api.post<{ message: string }>(
        '/inspection/upload',
        formData as unknown as Record<string, unknown>,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (i === chunks - 1) {
        return response;
      }
    }

    throw new Error('Upload failed');
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error uploading inspections:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
