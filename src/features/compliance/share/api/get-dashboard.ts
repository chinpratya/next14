import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';
import { queryString } from '@/utils';

import { DashboardResponseSchema } from '../schemas/dashboard';
import { DashboardResponse } from '../types/dashboard';

type getDashboardProps = {
  organizationID?: string[];
  branchID?: string[];
  assessmentID?: string;
  assessmentSubmissionID?: string[];
};

export const getDashboard = async ({
  organizationID,
  branchID,
  assessmentID,
  assessmentSubmissionID,
}: getDashboardProps): Promise<DashboardResponse> => {
  const params = queryString.sample({
    organizationID,
    branchID,
    assessmentID: assessmentID,
    assessmentSubmissionID,
  });

  const data = await apiClient.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/dashboard`,
    {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
      params,
    }
  );
  return DashboardResponseSchema.parse(data);
};

type UseGetDashboard = {
  organizationID?: string[];
  branchID?: string[];
  assessmentID?: string;
  assessmentSubmissionID?: string[];
};

export const useGetDashboard = ({
  organizationID = [],
  branchID = [],
  assessmentID = '',
  assessmentSubmissionID = [],
}: UseGetDashboard) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        complianceQueryKeys.dashboard.all(
          organizationID,
          branchID,
          assessmentID,
          assessmentSubmissionID
        ),
      ],
      queryFn: () =>
        getDashboard({
          organizationID,
          branchID,
          assessmentID,
          assessmentSubmissionID,
        }),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
