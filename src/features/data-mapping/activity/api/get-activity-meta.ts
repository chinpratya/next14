import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityMetaSchema } from '../schemas';
import { ActivityMeta } from '../types';

type GetActivityMeta = Request & {
  law?: boolean;
};
export const getActivityMeta = async ({
  law,
  ...params
}: GetActivityMeta): Promise<ActivityMeta> => {
  const { data } = await apiClient.get(`/meta/activity`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    params: {
      law,
      ...params,
    },
  });
  return ActivityMetaSchema.parse(data);
};

type UseGetActivityMeta = Request & {
  law?: boolean;
};

export const useGetActivityMeta = ({
  law,
  ...params
}: UseGetActivityMeta) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.meta,
        { law, params },
      ],
      queryFn: () => getActivityMeta({ law, ...params }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
