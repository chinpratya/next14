import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivityCollectOfActivityAccessDetailSchema } from '../schemas';
import { ActivityCollectOfActivityAccessDetail } from '../types';

type GetActivityCollectAccess = {
  activityId: string;
  accessId?: string;
};

export const getActivityCollectAccess = async ({
  activityId,
  accessId,
}: GetActivityCollectAccess): Promise<ActivityCollectOfActivityAccessDetail> => {
  const { data } = await apiClient.get(
    `/activity/${activityId}/collect/access/${accessId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );
  return ActivityCollectOfActivityAccessDetailSchema.parse(
    data
  );
};

type UseGetActivityCollectAccess = {
  activityId: string;
  accessId?: string;
};

export const useGetActivityCollectAccess = ({
  activityId,
  accessId,
}: UseGetActivityCollectAccess) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.collectAccessDetail(
          activityId,
          accessId
        ),
      ],
      queryFn: () =>
        getActivityCollectAccess({
          activityId,
          accessId,
        }),
      enabled: !!accessId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
