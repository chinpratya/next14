import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { TransactionMetaSchema } from '../schemas';
import { TransactionMeta } from '../types';

export const getMetaTransaction =
  async (): Promise<TransactionMeta> => {
    const { data } = await apiClient.get(
      `/meta/transaction`,
      {
        baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
      }
    );

    return TransactionMetaSchema.parse(data);
  };

export const useGetMetaTransaction = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.transaction.meta,
      ],
      queryFn: () => getMetaTransaction(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
