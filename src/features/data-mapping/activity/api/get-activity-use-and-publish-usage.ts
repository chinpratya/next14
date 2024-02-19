import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivityUsageSchema } from '../schemas';
import { ActivityUsage } from '../types';

export const getActivityUseAndPublishUage = async (
  activityId: string
): Promise<ActivityUsage> => {
  const { data } = await apiClient.get(
    `/activity/${activityId}/usage`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return ActivityUsageSchema.parse(data);
};

export type UseGetActivityUseAndPublishUsage = {
  activityId: string;
};

export const useGetActivityUseAndPublishUsage = ({
  activityId,
}: UseGetActivityUseAndPublishUsage) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.usage(activityId),
      ],
      queryFn: () =>
        getActivityUseAndPublishUage(activityId),
      enabled: !!activityId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
