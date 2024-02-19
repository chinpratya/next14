import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityDataCategoryResponseSchema } from '../schemas';
import { ActivityDataCategoryResponse } from '../types';

export type ListDataCategoryOfActivity = Request & {
  activityId: string;
  tagID?: string;
};

export const listDataCategoryOfActivity = async ({
  activityId,
  tagID,
  ...params
}: ListDataCategoryOfActivity): Promise<ActivityDataCategoryResponse> => {
  const response = await apiClient.get(
    `/activity/${activityId}/data-category`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params: {
        ...params,
        tagID,
      },
    }
  );
  return ActivityDataCategoryResponseSchema.parse(
    response
  );
};

export const useListDataCategoryOfActivity = ({
  activityId,
  tagID,
  ...params
}: ListDataCategoryOfActivity) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.dataCategory(
          activityId
        ),
        { ...params, tagID },
      ],
      queryFn: () =>
        listDataCategoryOfActivity({
          activityId,
          tagID,
          ...params,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
