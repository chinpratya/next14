import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { DataLifecycleSchema } from '../schemas';
import { DataLifecycle } from '../types';

export type GetDataLifecycleByActivity = {
  activityId: string;
};

export const getDataLifecycleByActivity = async ({
  activityId,
}: GetDataLifecycleByActivity): Promise<DataLifecycle> => {
  const response = await apiClient.get(
    `/data-life-cycle-activity/${activityId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return DataLifecycleSchema.parse(response.data);
};

export const useGetDataLifecycleByActivity = ({
  activityId,
}: GetDataLifecycleByActivity) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dataLifecycle.detail(
          activityId
        ),
      ],
      queryFn: () =>
        getDataLifecycleByActivity({ activityId }),
      enabled: !!activityId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
