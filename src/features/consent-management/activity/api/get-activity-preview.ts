import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { ActivityPreviewSchema } from '../schemas';
import { ConsentActivityPreview } from '../types';

export const getActivityPreview = async (
  activityId: string
): Promise<ConsentActivityPreview[]> => {
  const { data } = await apiClient.get(
    `/activity/preview/${activityId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return z.array(ActivityPreviewSchema).parse(data);
};

export type UseGetActivityPreview = {
  activityId: string;
};

export const useGetActivityPreview = ({
  activityId,
}: UseGetActivityPreview) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.activity.preview(
          activityId
        ),
      ],
      queryFn: () => getActivityPreview(activityId),
      enabled: !!activityId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
