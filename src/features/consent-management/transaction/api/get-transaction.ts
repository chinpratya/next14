import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { TransactionDetailSchema } from '../schemas';
import { TransactionDetail } from '../types';

export type GetTransaction = {
  transactionId: string;
};

export const getTransaction = async ({
  transactionId,
}: GetTransaction): Promise<TransactionDetail> => {
  const response = await apiClient.get(
    `/transaction/${transactionId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return TransactionDetailSchema.parse(response.data);
};

export const useGetTransaction = ({
  transactionId,
}: GetTransaction) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.transaction.detail(
          transactionId
        ),
      ],
      queryFn: () =>
        getTransaction({
          transactionId,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
