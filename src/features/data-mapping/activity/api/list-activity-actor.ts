import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityActorResponseSchema } from '../schemas';
import { ActivityActorResponse } from '../types';

export type ListActivityActor = Request & {
  activityId: string;
  actorType: string;
};

export const listActivityActor = async ({
  activityId,
  actorType,
  ...params
}: ListActivityActor): Promise<ActivityActorResponse> => {
  const response = await apiClient.get(
    `/activity/${activityId}/actor/${actorType}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params,
    }
  );

  return ActivityActorResponseSchema.parse(response);
};

export const useListActivityActor = ({
  activityId,
  actorType,
  ...params
}: ListActivityActor) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.actors(
          activityId,
          actorType
        ),
        params,
      ],
      queryFn: () =>
        listActivityActor({
          activityId,
          actorType,
          ...params,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
