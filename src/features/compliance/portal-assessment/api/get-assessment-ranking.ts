import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';

import { RankingResponse } from '../types/assessment';

export type GetRanking = {
  assessmentId: string;
  type: string;
};
export const getRanking = ({
  assessmentId,
  type,
}: GetRanking): Promise<RankingResponse> => {
  return apiClient.get(
    `/portal/assessment/${assessmentId}/ranking?type=${type}`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL,
    }
  );
};

export type UseGetRanking = GetRanking;

export const useGetRanking = ({
  assessmentId,
  type,
}: UseGetRanking) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        compliancePortalQueryKeys.assessment.ranking(
          assessmentId,
          type
        ),
      ],
      queryFn: () =>
        getRanking({
          assessmentId,
          type,
        }),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
