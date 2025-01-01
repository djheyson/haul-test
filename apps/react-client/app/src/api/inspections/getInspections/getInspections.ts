import {
  Filters,
  ResponseGetInspections,
} from '@haul/nest-api/app/app.service';
import { api } from '../../utils/api';
import { AxiosError } from 'axios';

interface PaginationParams {
  page: number;
  pageSize: number;
}

export const getInspections = async ({
  page,
  pageSize,
  filters,
}: PaginationParams & {
  filters: Filters;
}): Promise<ResponseGetInspections> => {
  try {
    const response = await api.get<ResponseGetInspections>('/', {
      params: { page, pageSize, filters },
    });

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error fetching inspections:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return null;
  }
};
