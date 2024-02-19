import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';
import { queryString } from '@/utils';

import { AssessmentSubmissionReportResponseSchema } from '../schemas';
import { AssessmentSubmissionReportResponse } from '../types';

export type GetAssessmentSubmissionReport = {
  assessmentId: string;
  organizationId: string;
  branchId: string;
};
export const getAssessmentSubmissionReport = async ({
  assessmentId,
  branchId,
  organizationId,
}: GetAssessmentSubmissionReport): Promise<AssessmentSubmissionReportResponse> => {
  const params = queryString.sample({
    branchID: branchId,
    organizationID: organizationId,
  });

  const response = await apiClient.get(
    `/assignment-submission/${assessmentId}/report`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      params,
    }
  );
  return AssessmentSubmissionReportResponseSchema.parse(
    response
  );
};

export type UseGetAssessmentSubmissionReport = {
  assessmentId: string;
  organizationId: string;
  branchId: string;
};

export const useGetAssessmentSubmissionReport = ({
  assessmentId,
  organizationId,
  branchId,
}: UseGetAssessmentSubmissionReport) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.assessmentSubmission.report(
          assessmentId,
          organizationId,
          branchId
        ),
      ],
      queryFn: () =>
        getAssessmentSubmissionReport({
          assessmentId,
          organizationId,
          branchId,
        }),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
