import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { siemQueryKeys } from '@/lib/queryKeys/siem';

import { RuleInfoSchema } from '../schemas';
import { RuleInfo } from '../types';

export const getRuleInfo = async (
  ruleId: string
): Promise<RuleInfo> => {
  const { data } = await apiClient.get(
    `/siem/rule/${ruleId}`,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );

  return RuleInfoSchema.parse(data);
};

export const useGetRuleInfo = (ruleId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => getRuleInfo(ruleId),
      queryKey: [siemQueryKeys.rule.detail(ruleId)],
    });

  return {
    data,
    isLoading: !isFetched && isFetching,
    isError,
  };
};
