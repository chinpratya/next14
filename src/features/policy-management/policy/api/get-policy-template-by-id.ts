import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';

import { PolicyTemplateFormSchema } from '../schemas';
import { PolicyTemplateForm } from '../types';

export const getPolicyTemplateById = async (
  templateId?: string
): Promise<PolicyTemplateForm> => {
  const { data } = await apiClient.get(
    `/policyNotices/template/${templateId}/default`,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );

  return PolicyTemplateFormSchema.parse(data);
};

export type useGetPolicyTemplateByIdProps = {
  templateId?: string;
};
export const useGetPolicyTemplateById = ({
  templateId,
}: useGetPolicyTemplateByIdProps) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        policyManagementQueryKeys.policy.templateID(
          templateId
        ),
      ],
      queryFn: () => getPolicyTemplateById(templateId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
