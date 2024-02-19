import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivityDpiaInitSchema } from '../schemas';
import { ActivityDpiaInit } from '../types';

export const getActivityDpiaInit = async (
  activityId: string
): Promise<ActivityDpiaInit> => {
  const { data } = await apiClient.get(
    `/activity/${activityId}/dpia/init`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return ActivityDpiaInitSchema.parse(data);
};

export type UseGetActivityDpiaInit = {
  activityId: string;
  enabled?: boolean;
};

export const useGetActivityDpiaInit = ({
  activityId,
  enabled,
}: UseGetActivityDpiaInit) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.dpiaInit(
          activityId
        ),
      ],

      queryFn: () => getActivityDpiaInit(activityId),
      enabled,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
