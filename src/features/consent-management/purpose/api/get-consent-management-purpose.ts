import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { ConsentPurposeDetailSchema } from '../schemas';
import { ConsentPurposeDetail } from '../types';

export const getConsentManagementPurpose = async (
  purposeId: string
): Promise<ConsentPurposeDetail> => {
  const { data } = await apiClient.get(
    `/purpose/${purposeId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return ConsentPurposeDetailSchema.parse(data);
};

export type UseGetActivityDpia = {
  purposeId: string;
};

export const useGetConsentManagementPurpose = ({
  purposeId,
}: UseGetActivityDpia) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.purpose.detail(
          purposeId
        ),
      ],
      queryFn: () =>
        getConsentManagementPurpose(purposeId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
