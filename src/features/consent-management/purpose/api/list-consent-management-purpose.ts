import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ConsentPurposeResponseSchema } from '../schemas';
import { ConsentPurposeResponse } from '../types';

export type ListActivityActor = Request;

export const listConsentManagementPurpose = async ({
  ...params
}: ListActivityActor): Promise<ConsentPurposeResponse> => {
  const response = await apiClient.get(`/purpose`, {
    baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    params,
  });

  return ConsentPurposeResponseSchema.parse(response);
};

export const useListConsentManagementPurpose = ({
  ...params
}: ListActivityActor) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.purpose.all,
        params,
      ],
      queryFn: () =>
        listConsentManagementPurpose({
          ...params,
        }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
