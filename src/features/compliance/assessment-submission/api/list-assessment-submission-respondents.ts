import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { AssessmentSubmissionRespondentsResponseSchema } from '../schemas';
import { AssessmentSubmissionRespondentsResponse } from '../types';

type ListAssessmentSubmissionRespondents = {
  assessmentId: string;
  organizationId: string;
  branchId: string;
};

export const listAssessmentSubmissionRespondents =
  async ({
    assessmentId,
    branchId,
    organizationId,
  }: ListAssessmentSubmissionRespondents): Promise<AssessmentSubmissionRespondentsResponse> => {
    const response = await apiClient.get(
      `/assignment-submission/${assessmentId}/respondent?branchID=${branchId}&organizationID=${organizationId}`,
      {
        baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      }
    );

    return AssessmentSubmissionRespondentsResponseSchema.parse(
      response
    );
  };

export type UseListAssessmentSubmissionRespondents = {
  assessmentId: string;
  organizationId: string;
  branchId: string;
  enabled: boolean;
};

export const useListAssessmentSubmissionRespondents = ({
  assessmentId,
  branchId,
  organizationId,
  enabled,
}: UseListAssessmentSubmissionRespondents) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      enabled: enabled,
      queryKey: [
        complianceQueryKeys.assessmentSubmission.branchRespondent(
          assessmentId
        ),
        organizationId,
        branchId,
      ],
      queryFn: () =>
        listAssessmentSubmissionRespondents({
          assessmentId,
          branchId,
          organizationId,
        }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
