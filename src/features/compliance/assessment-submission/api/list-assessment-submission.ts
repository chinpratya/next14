import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { AssessmentSubmissionResponseSchema } from '../schemas';
import { AssessmentSubmissionResponse } from '../types';

export const listAssessmentSubmission = async (
  search: string,
  page: number,
  pageSize: number
): Promise<AssessmentSubmissionResponse> => {
  const response = await apiClient.get(
    `/assignment-submission?search=${search}&page=${page}&pageSize=${pageSize}`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );

  return AssessmentSubmissionResponseSchema.parse(
    response
  );
};

export type UseListAssessmentSubmission = {
  search?: string;
  page: number;
  pageSize: number;
};

export const useListAssessmentSubmission = ({
  search = '',
  page,
  pageSize,
}: UseListAssessmentSubmission) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.assessmentSubmission.all,
        search,
        page,
        pageSize,
      ],
      queryFn: () =>
        listAssessmentSubmission(search, page, pageSize),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
