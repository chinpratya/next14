import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityDsarResponseSchema } from '../schemas/dsar';
import { ActivityDsarResponse } from '../types/dsar';

export type ListActivityDetailDsar = Request & {
  activityId: string;
};

export const listActivityDetailDsar = async ({
  activityId,
  ...params
}: ListActivityDetailDsar): Promise<ActivityDsarResponse> => {
  const response = await apiClient.get(`/request`, {
    baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    params: {
      ...params,
      activity: activityId,
    },
  });

  return ActivityDsarResponseSchema.parse(response);
};

export const useListActivityDetailDsar = ({
  activityId,
  ...params
}: ListActivityDetailDsar) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.dsar(activityId),
        params,
      ],
      queryFn: () =>
        listActivityDetailDsar({ activityId, ...params }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
