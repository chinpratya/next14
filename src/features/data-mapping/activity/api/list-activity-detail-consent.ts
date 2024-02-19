import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityConsentResponseSchema } from '../schemas/consent';
import { ActivityConsentResponse } from '../types/consent';

export type ListActivityDetailConsent = Request & {
  activityId: string;
};

export const listActivityDetailConsent = async ({
  activityId,
  ...params
}: ListActivityDetailConsent): Promise<ActivityConsentResponse> => {
  const response = await apiClient.get(`/receipt`, {
    baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    params: {
      ...params,
      activity: activityId,
    },
  });

  return ActivityConsentResponseSchema.parse(response);
};

export const useListActivityDetailConsent = ({
  activityId,
  ...params
}: ListActivityDetailConsent) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.consent(activityId),
        params,
      ],
      queryFn: () =>
        listActivityDetailConsent({
          activityId,
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
