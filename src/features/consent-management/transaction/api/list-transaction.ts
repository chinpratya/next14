import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { TransactionResponseSchema } from '../schemas';
import { TransactionResponse } from '../types';

export const listTransaction = async ({
  ...params
}: Request): Promise<TransactionResponse> => {
  const response = await apiClient.get(`/transaction`, {
    baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    params,
  });

  return TransactionResponseSchema.parse(response);
};

export const useListTransaction = (
  params: Request = {}
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.transaction.all,
        params,
      ],
      queryFn: () => listTransaction(params),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
