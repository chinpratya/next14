import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ActivityDisclosureActorResponseSchema } from '../schemas';
import { ActivityDisclosureActorResponse } from '../types';

export type ListDisclosureActorOfActivity = Request & {
  activityId: string;
};

export const listDisclosureActorOfActivity = async ({
  activityId,
}: ListDisclosureActorOfActivity): Promise<ActivityDisclosureActorResponse> => {
  const response = await apiClient.get(
    `/activity/${activityId}/disclosure/actor`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return ActivityDisclosureActorResponseSchema.parse(
    response
  );
};

export const useListDisclosureActorOfActivity = ({
  activityId,
}: ListDisclosureActorOfActivity) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.activity.disclosureActors(
          activityId
        ),
      ],
      queryFn: () =>
        listDisclosureActorOfActivity({ activityId }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
