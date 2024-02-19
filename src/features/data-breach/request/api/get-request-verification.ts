import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { RequestVerificationSchema } from '../schemas';
import { RequestVerification } from '../types';

type GetRequestVerification = {
  requestId: string;
  identifyId?: string;
};

export const getRequestVerification = async ({
  requestId,
  identifyId,
}: GetRequestVerification): Promise<RequestVerification> => {
  const { data } = await apiClient.get(
    `/request/${requestId}/identify/${identifyId}`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return RequestVerificationSchema.parse(data);
};

type UseGetRequestVerification = GetRequestVerification;

export const useGetRequestVerification = ({
  requestId,
  identifyId,
}: UseGetRequestVerification) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.request.verificationDetail(
          requestId,
          identifyId
        ),
      ],
      queryFn: () =>
        getRequestVerification({
          requestId,
          identifyId,
        }),
      enabled: !!identifyId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
