import { useMutation } from '@tanstack/react-query';

import { policyManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { updatePolicy } from './update-policy';
import { updatePolicyTemplate } from './update-policy-template';

export type UpdatePolicyAndTemplate = {
  policyId: string;
  wizardId?: string;
  policyData: Record<string, unknown>;
  templateData: Record<string, unknown>;
};

export const updatePolicyAndTemplate = async ({
  policyId,
  wizardId,
  policyData,
  templateData,
}: UpdatePolicyAndTemplate) => {
  if (!wizardId) {
    return await updatePolicy({
      policyId,
      data: policyData,
    });
  }
  return Promise.all([
    updatePolicy({
      policyId,
      data: policyData,
    }),
    updatePolicyTemplate({
      policyId,
      wizardId,
      data: templateData,
    }),
  ]);
};

export type UseUpdatePolicyAndTemplate = Pick<
  UpdatePolicyAndTemplate,
  'policyId' | 'wizardId'
> & {
  onSuccess?: () => void;
};

export const useUpdatePolicyAndTemplate = ({
  policyId,
  wizardId,
  onSuccess,
}: UseUpdatePolicyAndTemplate) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({
      policyData,
      templateData,
    }: Pick<
      UpdatePolicyAndTemplate,
      'policyData' | 'templateData'
    >) =>
      updatePolicyAndTemplate({
        policyId,
        wizardId,
        policyData,
        templateData,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        policyManagementQueryKeys.policy.detail(policyId),
      ]);
      await queryClient.invalidateQueries([
        policyManagementQueryKeys.policy.customizeTemplate(
          policyId
        ),
      ]);
      await queryClient.invalidateQueries([
        policyManagementQueryKeys.policy.all,
      ]);

      await queryClient.invalidateQueries([
        policyManagementQueryKeys.policy.preview(
          policyId
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
