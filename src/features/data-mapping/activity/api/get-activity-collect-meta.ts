import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityCollectMetaSchema } from '../schemas';
import { ActivityCollectMeta } from '../types';

export type GetActivityCollectMeta = Request & {
  activityId: string;
};

export const getActivityCollectMeta = async ({
  activityId,
  ...params
}: GetActivityCollectMeta): Promise<
  ActivityCollectMeta[]
> => {
  const { data } = await apiClient.get(
    `/activity/${activityId}/collect/meta`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params: {
        ...params,
      },
    }
  );
  return z.array(ActivityCollectMetaSchema).parse(data);
};

type UseGetActivityCollectMeta = Request & {
  activityId: string;
};

export const useGetActivityCollectMeta = ({
  activityId,
  ...params
}: UseGetActivityCollectMeta) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.collectMeta,
        { activityId, params },
      ],
      queryFn: () =>
        getActivityCollectMeta({ activityId, ...params }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
