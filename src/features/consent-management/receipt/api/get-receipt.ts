import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { ReceiptSchema } from '../schemas';
import { Receipt } from '../types';

export type GetReceipt = {
  receiptId: string;
};

export const getReceipt = async ({
  receiptId,
}: GetReceipt): Promise<Receipt> => {
  const response = await apiClient.get(
    `/receipt/${receiptId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return ReceiptSchema.parse(response.data);
};

export const useGetReceipt = ({
  receiptId,
}: GetReceipt) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.receipt.detail(
          receiptId
        ),
      ],
      queryFn: () =>
        getReceipt({
          receiptId,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
