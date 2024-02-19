import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { IncidentCategorySchema } from '../schemas';
// import { TagResponse } from '../types';

export type getRuleList = Request;

export const getRuleList = async ({
  ...params
}: getRuleList): Promise<any> => {
  const response = await apiClient.get('/rule', {
    params,
    baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
  });

  //   return IncidentCategorySchema.parse(response?.data);
  return response.data;
};

export const useGetRuleList = (params: getRuleList) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.rule.all,
        {
          ...params,
        },
      ],
      queryFn: () => getRuleList(params),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
