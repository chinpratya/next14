import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type DeleteActivityUseAndPublishUsagePurpose = {
  activityId: string;
  purposeId: string;
};
export const deleteActivityUseAndPublishUsagePurpose = ({
  activityId,
  purposeId,
}: DeleteActivityUseAndPublishUsagePurpose): Promise<void> =>
  apiClient.delete(
    `/activity/${activityId}/usage/purpose/${purposeId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseDeleteActivityUseAndPublishUsagePurpose = {
  onSuccess?: () => void;
  activityId: string;
};

export const useDeleteActivityUseAndPublishUsagePurpose =
  ({
    onSuccess,
    activityId,
  }: UseDeleteActivityUseAndPublishUsagePurpose) => {
    const { mutate, isLoading } = useMutation({
      mutationFn: (purposeId: string) =>
        deleteActivityUseAndPublishUsagePurpose({
          activityId,
          purposeId,
        }),
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          dataMappingQueryKeys.activity.usagePurpose(
            activityId
          ),
        ]);
        queryClient.invalidateQueries([
          dataMappingQueryKeys.activity.purpose(
            activityId
          ),
        ]);
        onSuccess?.();
      },
    });

    return {
      submit: mutate,
      isLoading,
    };
  };
