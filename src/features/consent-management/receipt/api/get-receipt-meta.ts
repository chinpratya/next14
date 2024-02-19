import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { ReceiptMetaSchema } from '../schemas';
import { ReceiptMeta } from '../types';

export const getReceiptMeta =
  async (): Promise<ReceiptMeta> => {
    const { data } = await apiClient.get(
      `/meta/receipt`,
      {
        baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
      }
    );

    return ReceiptMetaSchema.parse(data);
  };

export const useGetReceiptMeta = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [consentManagementQueryKeys.receipt.meta],
      queryFn: () => getReceiptMeta(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
