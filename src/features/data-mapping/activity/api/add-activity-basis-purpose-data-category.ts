import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type AddActivityBasisPurposeDataCategory = {
  activityId: string;
  basisId: string;
  purposeId: string;
  categories: Record<string, unknown>;
};

export const addActivityBasisPurposeDataCategory = ({
  activityId,
  basisId,
  purposeId,
  categories,
}: AddActivityBasisPurposeDataCategory): Promise<void> =>
  apiClient.post(
    `/activity/${activityId}/basis/${basisId}/purpose/${purposeId}/data-category`,
    {
      ...categories,
    },
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseAddActivityBasisPurposeDataCategory = {
  activityId: string;
  basisId: string;
  purposeId: string;
  onSuccess?: () => void;
};

export const useAddActivityBasisPurposeDataCategory = ({
  activityId,
  basisId,
  purposeId,
  onSuccess,
}: UseAddActivityBasisPurposeDataCategory) => {
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: (categories: Record<string, unknown>) =>
      addActivityBasisPurposeDataCategory({
        activityId,
        basisId,
        purposeId,
        categories,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.basisPurposeDataCategory(
          activityId,
          basisId,
          purposeId
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
    isSuccess,
  };
};
