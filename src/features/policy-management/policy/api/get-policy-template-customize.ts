import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';

import { PolicyTemplateFormSchema } from '../schemas';
import { PolicyTemplateForm } from '../types';

export const getPolicyTemplateCustomize = async (
  templateId?: string
): Promise<PolicyTemplateForm> => {
  const { data } = await apiClient.get(
    `/policyNotices/wizzard/${templateId}`,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );

  return PolicyTemplateFormSchema.parse(data);
};

export type useGetPolicyTemplateCustomizeProps = {
  templateId?: string;
};

export const useGetPolicyTemplateCustomize = ({
  templateId,
}: useGetPolicyTemplateCustomizeProps) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        policyManagementQueryKeys.policy.customizeTemplate(
          templateId
        ),
      ],
      queryFn: () =>
        getPolicyTemplateCustomize(templateId),
      enabled: !!templateId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
