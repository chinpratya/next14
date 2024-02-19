/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys/incident-management';
import { Request } from '@/types';

import { ServerityListSchema } from '../schemas';
import { ServerityListDatas } from '../types';

export const getServerityList = async ({
  ...params
}: Request): Promise<ServerityListDatas> => {
  const response = await apiClient.get(`/severity`, {
    baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    params,
  });

  return ServerityListSchema.parse(response);
};

export const useServerityList = (params: Request) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.serverity.all,
        params,
      ],
      queryFn: () => getServerityList(params),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
