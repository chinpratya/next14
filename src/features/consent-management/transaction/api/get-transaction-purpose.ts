import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { TransactionPurposeSchema } from '../schemas';
import { TransactionDetailPurpose } from '../types';

export type GetTransactionPurpose = {
  transactionId: string;
};

export const getTransactionPurpose = async ({
  transactionId,
}: GetTransactionPurpose): Promise<TransactionDetailPurpose> => {
  const response = await apiClient.get(
    `/transaction/purpose/${transactionId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return TransactionPurposeSchema.parse(response.data);
};

export const useGetTransactionPurpose = ({
  transactionId,
}: GetTransactionPurpose) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.transaction.purpose(
          transactionId
        ),
      ],
      queryFn: () =>
        getTransactionPurpose({
          transactionId,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
