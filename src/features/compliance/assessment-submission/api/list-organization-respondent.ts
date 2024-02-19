import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys/compliance';

import { OrganizationRespondentResponseSchema } from '../schemas';
import { OrganizationRespondentResponse } from '../types';

export const listOrganizationRespondent = async (
  assessmentId: string
): Promise<OrganizationRespondentResponse> => {
  const respondent = await apiClient.get(
    `/assignment-submission/${assessmentId}/org-respondent`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    }
  );
  return OrganizationRespondentResponseSchema.parse(
    respondent
  );
};

type UseListOrganizationRespondent = {
  assessmentId: string;
};

export const useListOrganizationRespondent = ({
  assessmentId,
}: UseListOrganizationRespondent) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.assessmentSubmission.orgRespondent(
          assessmentId
        ),
      ],
      queryFn: () =>
        listOrganizationRespondent(assessmentId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
