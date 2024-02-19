import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivityPreviewSchema } from '../schemas';
import { ActivityPreview } from '../types';

export const getActivityPreview = async (
  activityId: string
): Promise<ActivityPreview> => {
  const { data } = await apiClient.get(
    `/activity/${activityId}/preview`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return ActivityPreviewSchema.parse(data);
};

export type UseGetActivityPreview = {
  activityId: string;
  isCallData: boolean;
};

export const useGetActivityPreview = ({
  activityId,
  isCallData,
}: UseGetActivityPreview) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.preview(activityId),
      ],
      queryFn: () => getActivityPreview(activityId),
      enabled: isCallData,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
