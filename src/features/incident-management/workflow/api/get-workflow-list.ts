/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys/incident-management';
import { Request } from '@/types';

import { WorkflowIncidentSchema } from '../schemas';
import { WorkflowIncident } from '../types';

export const getWorkflowList = async (
  // eslint-disable-next-line unused-imports/no-unused-vars
  params: Request
): Promise<WorkflowIncident> => {
  const response = await apiClient.get(`/workflow`, {
    baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    params,
  });
  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );
  return WorkflowIncidentSchema.parse(response);
};

export const useGetWorkflowList = (params: Request) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.workflow.all,
        params,
      ],
      queryFn: () => getWorkflowList(params),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
