import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityUsagePurposeResponseSchema } from '../schemas';
import { ActivityUsagePurposeResponse } from '../types';

type ListActivityUseAndPublishUsagePurpose = Request & {
  activityId: string;
};
export const listActivityUseAndPublishUsagePurpose =
  async ({
    activityId,
    ...params
  }: ListActivityUseAndPublishUsagePurpose): Promise<ActivityUsagePurposeResponse> => {
    const response = await apiClient.get(
      `/activity/${activityId}/usage/purpose`,
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
        params,
      }
    );
    return ActivityUsagePurposeResponseSchema.parse(
      response
    );
  };

type UseListActivityUseAndPublishUsagePurpose =
  ListActivityUseAndPublishUsagePurpose;

export const useListActivityUseAndPublishUsagePurpose = ({
  activityId,
  ...params
}: UseListActivityUseAndPublishUsagePurpose) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.usagePurpose(
          activityId
        ),
        params,
      ],
      queryFn: () =>
        listActivityUseAndPublishUsagePurpose({
          ...params,
          activityId,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
