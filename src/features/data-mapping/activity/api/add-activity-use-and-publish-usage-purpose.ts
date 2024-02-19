import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type AddActivityUseAndPublishUsagePurpose = {
  activityId: string;
  purposeID: string[];
};

export const addActivityUseAndPublishUsagePurpose = ({
  activityId,
  purposeID,
}: AddActivityUseAndPublishUsagePurpose): Promise<void> =>
  apiClient.post(
    `/activity/${activityId}/usage/purpose`,
    {
      purposeID,
    },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseAddActivityUseAndPublishUsagePurpose = {
  activityId: string;
  onSuccess?: () => void;
};

export const useAddActivityUseAndPublishUsagePurpose = ({
  activityId,
  onSuccess,
}: UseAddActivityUseAndPublishUsagePurpose) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (purposeID: string[]) =>
      addActivityUseAndPublishUsagePurpose({
        activityId,
        purposeID,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.usagePurpose(
          activityId
        ),
      ]);
      queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.purpose(activityId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
