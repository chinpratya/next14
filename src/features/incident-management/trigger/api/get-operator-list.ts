import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { EngineOperatorSchema } from '../schemas';
// import { TagResponse } from '../types';

export type getOperatorList = Request;

export const getOperatorList = async ({
  ...params
}: getOperatorList): Promise<any> => {
  const response = await apiClient.get(
    '/engineOperator',
    {
      params,
      baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    }
  );

  return EngineOperatorSchema.parse(response?.data);
  //   return response.data;
};

export const useGetOperatorList = (
  params: getOperatorList
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.operator.all,
        {
          ...params,
        },
      ],
      queryFn: () => getOperatorList(params),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
