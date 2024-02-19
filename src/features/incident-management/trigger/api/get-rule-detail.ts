import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';

// import { SlaDetaSchema } from '../schemas';
import { RuleDetails } from '../types';

export const getRuleDetail = async (
  ruleId: string
): Promise<RuleDetails> => {
  const { data } = await apiClient.get(
    `/rule/${ruleId}`,
    {
      baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    }
  );

  return data;
};

export const useGetRuleDetail = (ruleId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.sla.detail(ruleId),
      ],
      queryFn: () => getRuleDetail(ruleId),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
