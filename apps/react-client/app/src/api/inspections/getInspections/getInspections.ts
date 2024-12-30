import { api } from '../../utils/api';
import { AxiosError } from 'axios';

interface PaginatedResponse {
  items: any[];
  total: number;
}

interface PaginationParams {
  page: number;
  pageSize: number;
}

export const getInspections = async ({
  page,
  pageSize,
}: PaginationParams): Promise<PaginatedResponse> => {
  try {
    const response = await api.get<PaginatedResponse>('/', {
      params: { page, pageSize },
    });

    return {
      items: response.items,
      total: response.total,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error fetching paginated data:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return {
      items: [],
      total: 0,
    };
  }
};
