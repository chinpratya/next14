import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { IncidentCategorySchema } from '../schemas';
// import { TagResponse } from '../types';

export type getListCategory = Request;

export const getListCategory = async ({
  ...params
}: getListCategory): Promise<any> => {
  const response = await apiClient.get('/category', {
    params,
    baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
  });

  return IncidentCategorySchema.parse(response?.data);
  //   return response.data;
};

export const useGetListCategory = (
  params: getListCategory
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.tags.all,
        {
          ...params,
        },
      ],
      queryFn: () => getListCategory(params),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
