import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { settingQueryKeys } from '@/lib/queryKeys/setting';
import { queryString } from '@/utils';

import { AssessmentSubmissionAllRespondentResponseSchema } from '../schemas';
import { AssessmentSubmissionAllRespondent } from '../types';

type ListAssessmentSubmissionAllRespondents = {
  organizationID?: string;
  haveApprover?: boolean;
};

export const listAssessmentSubmissionAllRespondents =
  async ({
    organizationID,
    haveApprover,
  }: ListAssessmentSubmissionAllRespondents): Promise<
    AssessmentSubmissionAllRespondent[]
  > => {
    const params = queryString.sample({
      organizationID,
    });

    const { data } = await apiClient.get(
      `/setting/all-organization`,
      {
        baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
        params: {
          ...params,
          haveApprover,
        },
      }
    );
    return AssessmentSubmissionAllRespondentResponseSchema.parse(
      data
    );
  };

type UseListAssessmentSubmissionAllRespondents = {
  organizationID?: string;
  haveApprover?: boolean;
};

export const useListAssessmentSubmissionAllRespondents =
  ({
    organizationID,
    haveApprover,
  }: UseListAssessmentSubmissionAllRespondents) => {
    const { data, isFetching, isFetched, isError } =
      useQuery({
        queryKey: [
          settingQueryKeys.organization.all,
          organizationID,
          haveApprover,
        ],
        queryFn: () =>
          listAssessmentSubmissionAllRespondents({
            organizationID,
            haveApprover,
          }),
      });
    return {
      data,
      isLoading: isFetching && !isFetched,
      isError,
    };
  };
