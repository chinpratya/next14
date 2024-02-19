import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityPurposeResponseSchema } from '../schemas';
import { ActivityPurposeResponse } from '../types';

export type ListActivityPurpose = Request & {
  activityId: string;
};

export const listActivityPurpose = async ({
  activityId,
  ...params
}: ListActivityPurpose): Promise<ActivityPurposeResponse> => {
  const response = await apiClient.get(
    `/activity/${activityId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
      params,
    }
  );
  return ActivityPurposeResponseSchema.parse(response);
};

export const useListActivityPurpose = ({
  activityId,
  ...params
}: ListActivityPurpose) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.activity.purpose(
          activityId
        ),
        params,
      ],
      queryFn: () =>
        listActivityPurpose({ activityId, ...params }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
