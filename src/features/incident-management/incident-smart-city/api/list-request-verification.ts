import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';

import { RequestVerificationResponseSchema } from '../schemas';
import { RequestVerificationResponse } from '../types';

export const listRequestVerification = async (
  requestId: string
): Promise<RequestVerificationResponse> => {
  const response = await apiClient.get(
    `/request/${requestId}/identify`,
    {
      baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    }
  );

  return RequestVerificationResponseSchema.parse(
    response
  );
};

export const useListRequestVerification = (
  requestId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.request.verification(
          requestId
        ),
      ],
      queryFn: () => listRequestVerification(requestId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
