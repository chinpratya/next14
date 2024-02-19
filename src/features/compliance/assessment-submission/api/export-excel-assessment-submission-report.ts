import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

type ExportExcelAssessmentSubmissionReport = {
  assessmentId: string;
};

export const exportExcelAssessmentSubmissionReport =
  async ({
    assessmentId,
  }: ExportExcelAssessmentSubmissionReport) => {
    const { data } = await apiClient.get(
      `/assignment-submission/${assessmentId}/report/export`,
      {
        baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      }
    );
    return data;
  };

type UseGetAssessmentSubmissionAllRespondents = {
  assessmentId: string;
  enable?: boolean;
};

export const useExportExcelAssessmentSubmissionReport = ({
  assessmentId,
}: UseGetAssessmentSubmissionAllRespondents) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.assessmentSubmission.export(
          assessmentId
        ),
      ],
      queryFn: () =>
        exportExcelAssessmentSubmissionReport({
          assessmentId,
        }),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
