import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivitySchema } from '../schemas';
import { Activity } from '../types';

export const getActivity = async (
  activityId: string
): Promise<Activity> => {
  const { data } = await apiClient.get(
    `/activity/${activityId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return ActivitySchema.parse(data);
};

export type UseGetActivity = {
  activityId: string;
};

export const useGetActivity = ({
  activityId,
}: UseGetActivity) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.detail(activityId),
      ],
      queryFn: () => getActivity(activityId),
      enabled: !!activityId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
