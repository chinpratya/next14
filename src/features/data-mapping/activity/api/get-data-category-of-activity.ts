import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { ActivityDataCategorySchema } from '../schemas';
import { ActivityDataCategory } from '../types';

export type GetDataCategoryOfActivity = {
  activityId: string;
  dataCategoryId: string;
};

export const getDataCategoryOfActivity = async ({
  activityId,
  dataCategoryId,
}: GetDataCategoryOfActivity): Promise<ActivityDataCategory> => {
  const response = await apiClient.get(
    `/activity/${activityId}/data-category/${dataCategoryId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return ActivityDataCategorySchema.parse(response.data);
};

export const useGetDataCategoryOfActivity = ({
  activityId,
  dataCategoryId,
}: GetDataCategoryOfActivity) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.dataCategoryDetail(
          activityId,
          dataCategoryId
        ),
      ],
      queryFn: () =>
        getDataCategoryOfActivity({
          activityId,
          dataCategoryId,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
