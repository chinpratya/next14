import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { RequestFormSchema } from '../schemas';
import { RequestForm } from '../types';

export const getRequestForm = async (
  requestId: string
): Promise<RequestForm> => {
  const { data } = await apiClient.get(
    `/request/form/${requestId}`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return RequestFormSchema.parse(data);
};

export const useGetRequestForm = (requestId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.request.form(requestId),
      ],
      queryFn: () => getRequestForm(requestId),
      enabled: !!requestId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
