import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type RemoveActivityBasisPurposeDataCategory = {
  activityId: string;
  basisId: string;
  purposeId: string;
  dataCategoryId: string;
};

export const removeActivityBasisPurposeDataCategory = ({
  activityId,
  basisId,
  purposeId,
  dataCategoryId,
}: RemoveActivityBasisPurposeDataCategory): Promise<void> =>
  apiClient.delete(
    `/activity/${activityId}/basis/${basisId}/purpose/${purposeId}/data-category/${dataCategoryId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

export type UseRemoveActivityBasisPurposeDataCategory = {
  activityId: string;
  basisId: string;
  purposeId: string;
  onSuccess?: () => void;
};

export const useRemoveActivityBasisPurposeDataCategory =
  ({
    activityId,
    basisId,
    purposeId,
    onSuccess,
  }: UseRemoveActivityBasisPurposeDataCategory) => {
    const { mutate, isLoading } = useMutation({
      mutationFn: (dataCategoryId: string) =>
        removeActivityBasisPurposeDataCategory({
          activityId,
          basisId,
          purposeId,
          dataCategoryId,
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
    };
  };
