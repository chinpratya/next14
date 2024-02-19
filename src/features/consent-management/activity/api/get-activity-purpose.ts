import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { ActivityPurposeDetailSchema } from '../schemas';
import { ActivityPurposeDetail } from '../types';

export const getActivityPurpose = async (
  activityId: string,
  purposeId: string
): Promise<ActivityPurposeDetail[]> => {
  const { data } = await apiClient.get(
    `/activity/${activityId}/purpose/${purposeId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return z.array(ActivityPurposeDetailSchema).parse(data);
};

export type UseGetActivityPreview = {
  activityId: string;
  purposeId: string;
};

export const useGetActivityPurpose = ({
  activityId,
  purposeId,
}: UseGetActivityPreview) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.activity.purposeDetail(
          activityId,
          purposeId
        ),
      ],
      queryFn: () =>
        getActivityPurpose(activityId, purposeId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
