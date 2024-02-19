import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type UpdateDisclosureActivity = {
  activityId: string;
  isDisclosure: boolean;
};

export const updateDisclosureActivity = ({
  activityId,
  isDisclosure,
}: UpdateDisclosureActivity): Promise<void> =>
  apiClient.put(
    `/activity/${activityId}/disclosure`,
    {
      isDisclosure,
    },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseUpdateDisclosureActivity = {
  activityId: string;
  onSuccess?: () => void;
};

export const useUpdateDisclosureActivity = ({
  activityId,
  onSuccess,
}: UseUpdateDisclosureActivity) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (isDisclosure: boolean) =>
      updateDisclosureActivity({
        activityId,
        isDisclosure,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.disclosure(
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
