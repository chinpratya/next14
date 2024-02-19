import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';

import { RequestDetailSchema } from '../schemas';
import { RequestDetail } from '../types';

export const getRequest = async (
  requestId: string,
  userID: string
): Promise<RequestDetail> => {
  const { data } = await apiClient.get(
    `/request/${requestId}?userID=${userID}`,
    {
      baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    }
  );

  return RequestDetailSchema.parse(data);
};

export const useGetRequest = (
  requestId: string,
  userID: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.request.detail(
          requestId,
          userID
        ),
      ],
      queryFn: () => getRequest(requestId, userID),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
