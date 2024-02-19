import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { ConsentActivitySchema } from '@/schema';
import { ConsentActivityType } from '@/types';

export type GetConsentBuilderActivities = {
  preferenceId: string;
};

export const getConsentBuilderActivities = async ({
  preferenceId,
}: GetConsentBuilderActivities): Promise<
  ConsentActivityType[]
> => {
  const response = await apiClient.get(
    `/preference/${preferenceId}/activity`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );
  return z
    .array(ConsentActivitySchema)
    .parse(response.data);
};

export const useGetConsentBuilderActivities = ({
  preferenceId,
}: GetConsentBuilderActivities) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      enabled: !!preferenceId,
      queryKey: [
        consentManagementQueryKeys.preference.activities(
          preferenceId
        ),
      ],
      queryFn: () =>
        getConsentBuilderActivities({ preferenceId }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
