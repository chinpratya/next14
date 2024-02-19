import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivityDpiaSchema } from '../schemas';
import { ActivityDpia } from '../types';

export const getActivityDpia = async (
  activityId: string
): Promise<ActivityDpia> => {
  const { data } = await apiClient.get(
    `/activity/${activityId}/dpia`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return ActivityDpiaSchema.parse(data);
};

export type UseGetActivityDpia = {
  activityId: string;
};

export const useGetActivityDpia = ({
  activityId,
}: UseGetActivityDpia) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.dpia(activityId),
      ],
      queryFn: () => getActivityDpia(activityId),
      enabled: !!activityId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
