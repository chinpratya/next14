import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { PreferenceCentersResponseSchema } from '../schemas';
import { PreferenceCentersResponse } from '../types';

export const listPreferenceCenters = async ({
  ...params
}: Request): Promise<PreferenceCentersResponse> => {
  const response = await apiClient.get(`/preference`, {
    baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    params,
  });

  return PreferenceCentersResponseSchema.parse(response);
};

export const useListPreferenceCenters = (
  params: Request = {}
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.preferenceCenters.all,
        params,
      ],
      queryFn: () => listPreferenceCenters(params),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
