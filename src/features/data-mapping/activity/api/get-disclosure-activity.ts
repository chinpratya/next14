import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

export type GetDisclosureActivity = {
  activityId: string;
};

export const getDisclosureActivity = async ({
  activityId,
}: GetDisclosureActivity): Promise<string> => {
  const response = await apiClient.get(
    `/activity/${activityId}/disclosure`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return response?.data?.isDisclosure ?? false;
};

export const useGetDisclosureActivity = (
  activityId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.disclosure(
          activityId
        ),
      ],
      queryFn: () =>
        getDisclosureActivity({
          activityId,
        }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching || !isFetched,
    isError,
  };
};
