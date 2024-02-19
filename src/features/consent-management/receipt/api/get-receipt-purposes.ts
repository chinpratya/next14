import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { ReceiptPurposeResponseSchema } from '../schemas';
import { ReceiptPurposeResponse } from '../types';

export type GetReceiptPurposes = {
  receiptId: string;
};

export const getReceiptPurposes = async ({
  receiptId,
}: GetReceiptPurposes): Promise<ReceiptPurposeResponse> => {
  const response = await apiClient.get(
    `/receipt/purpose/${receiptId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return ReceiptPurposeResponseSchema.parse(response);
};

export const useGetReceiptPurposes = ({
  receiptId,
}: GetReceiptPurposes) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.receipt.purposes(
          receiptId
        ),
      ],
      queryFn: () => getReceiptPurposes({ receiptId }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
