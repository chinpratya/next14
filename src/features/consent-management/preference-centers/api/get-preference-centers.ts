import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { PreferenceCentersDetailSchema } from '../schemas';
import { PreferenceCentersDetail } from '../types';

export type GetPreferenceCenters = {
  preferenceId: string;
};

export const getPreferenceCenters = async ({
  preferenceId,
}: GetPreferenceCenters): Promise<PreferenceCentersDetail> => {
  const response = await apiClient.get(
    `/preference/${preferenceId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return PreferenceCentersDetailSchema.parse(
    response.data
  );
};

export const useGetPreferenceCenters = ({
  preferenceId,
}: GetPreferenceCenters) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.preferenceCenters.detail(
          preferenceId
        ),
      ],
      queryFn: () =>
        getPreferenceCenters({
          preferenceId,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
