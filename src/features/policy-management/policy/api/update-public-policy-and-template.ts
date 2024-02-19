import { useMutation } from '@tanstack/react-query';

import { policyManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { publishPolicy } from './publish-policy';
import {
  updatePolicyAndTemplate,
  UpdatePolicyAndTemplate,
} from './update-policy-and-template';

export type UpdatePublicPolicyAndTemplate =
  UpdatePolicyAndTemplate & {
    isNewVersion: boolean;
  };

export const updatePublicPolicyAndTemplate = ({
  policyId,
  wizardId,
  isNewVersion,
  policyData,
  templateData,
}: UpdatePublicPolicyAndTemplate) =>
  Promise.all([
    updatePolicyAndTemplate({
      policyId,
      wizardId,
      policyData,
      templateData,
    }),
    publishPolicy(policyId, isNewVersion),
  ]);

export type UseUpdatePublicPolicyAndTemplate = Pick<
  UpdatePublicPolicyAndTemplate,
  'policyId' | 'wizardId'
> & {
  onSuccess?: () => void;
};

export const useUpdatePublicPolicyAndTemplate = ({
  policyId,
  wizardId,
  onSuccess,
}: UseUpdatePublicPolicyAndTemplate) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({
      isNewVersion,
      policyData,
      templateData,
    }: Omit<
      UpdatePublicPolicyAndTemplate,
      'policyId' | 'wizardId'
    >) =>
      updatePublicPolicyAndTemplate({
        policyId,
        wizardId,
        isNewVersion,
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
        policyManagementQueryKeys.policy.version(
          policyId
        ),
      ]);
      await queryClient.invalidateQueries([
        policyManagementQueryKeys.policy.preview(
          policyId
        ),
      ]);
      await queryClient.invalidateQueries([
        policyManagementQueryKeys.policy.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
