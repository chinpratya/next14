import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityResponseSchema } from '../schemas';
import { ActivityResponse } from '../types';

type ListActivity = Request & {
  status?: string;
  consent?: boolean;
  tagID?: string;
  activityType?: string;
};

export const listActivity = async ({
  ...params
}: ListActivity): Promise<ActivityResponse> => {
  const response = await apiClient.get(`/activity`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    params,
  });
  return ActivityResponseSchema.parse(response);
};

type UseListActivity = ListActivity;

export const useListActivity = ({
  ...params
}: UseListActivity) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.all,
        params,
      ],
      queryFn: () => listActivity({ ...params }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
