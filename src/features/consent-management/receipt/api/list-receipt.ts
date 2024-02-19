import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ReceiptResponseSchema } from '../schemas';
import { ReceiptResponse } from '../types';

export const listReceipt = async ({
  ...params
}: Request): Promise<ReceiptResponse> => {
  const response = await apiClient.get(`/receipt`, {
    baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    params,
  });

  return ReceiptResponseSchema.parse(response);
};

export const useListReceipt = (params: Request = {}) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.receipt.all,
        params,
      ],
      queryFn: () => listReceipt(params),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
