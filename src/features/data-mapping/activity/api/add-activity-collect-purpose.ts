import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type AddActivityCollectPurpose = {
  activityId: string;
  purposeID: string[];
};

export const addActivityCollectPurpose = ({
  activityId,
  purposeID,
}: AddActivityCollectPurpose): Promise<void> =>
  apiClient.post(
    `/activity/${activityId}/collect/purpose`,
    {
      purposeID,
    },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseAddActivityCollectPurpose = {
  activityId: string;
  onSuccess?: () => void;
};

export const useAddActivityCollectPurpose = ({
  activityId,
  onSuccess,
}: UseAddActivityCollectPurpose) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (purposeID: string[]) =>
      addActivityCollectPurpose({
        activityId,
        purposeID,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
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
