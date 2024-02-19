import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteMaturityModel = (
  maturityModelId: string
) =>
  apiClient.delete(
    `/setting/matutity-model/${maturityModelId}`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

export type UseDeleteMaturityModel = {
  search?: string;
  page: number;
  pageSize: number;
  onSuccess?: () => void;
};

export const useDeleteMaturityModel = ({
  search = '',
  page,
  pageSize,
  onSuccess,
}: UseDeleteMaturityModel) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteMaturityModel,
    onSuccess: () => {
      queryClient.invalidateQueries([
        complianceQueryKeys.maturityModel.all(
          search,
          page,
          pageSize
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
