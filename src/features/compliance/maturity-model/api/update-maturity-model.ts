import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { MaturityModelDetail } from '../types';

export const updateMaturityModel = (
  maturityModelId: string,
  detail: MaturityModelDetail[]
) =>
  apiClient.put(
    `/setting/matutity-model/${maturityModelId}`,
    {
      detail,
    },
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

export type UseUpdateMaturityModel = {
  maturityModelId: string;
  onSuccess?: () => void;
};

export const useUpdateMaturityModel = ({
  maturityModelId,
  onSuccess,
}: UseUpdateMaturityModel) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (detail: MaturityModelDetail[]) =>
      updateMaturityModel(maturityModelId, detail),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        complianceQueryKeys.maturityModel.detail(
          maturityModelId
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
    isError,
  };
};
