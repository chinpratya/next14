import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { ReceiptFormSchema } from '../schemas';
import { ReceiptForm } from '../types';

export type GetReceiptForm = {
  receiptId: string;
};

export const getReceiptForm = async ({
  receiptId,
}: GetReceiptForm): Promise<ReceiptForm> => {
  const response = await apiClient.get(
    `/receipt/from/${receiptId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return ReceiptFormSchema.parse(response.data);
};

export const useGetReceiptForm = ({
  receiptId,
}: GetReceiptForm) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.receipt.form(
          receiptId
        ),
      ],
      queryFn: () =>
        getReceiptForm({
          receiptId,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
