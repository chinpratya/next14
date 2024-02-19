import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { WorkflowTaskResponseSchema } from '../schemas';
import { WorkflowTaskResponse } from '../types';

export type ListWorkflowTask = Request & {
  workflowId: string;
  stageId: string;
};

export const listWorkflowTask = async ({
  workflowId,
  stageId,
  ...params
}: ListWorkflowTask): Promise<WorkflowTaskResponse> => {
  const response = await apiClient.get(
    `/workflow/:${workflowId}/state/${stageId}/task`,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
      params,
    }
  );

  return WorkflowTaskResponseSchema.parse(response);
};

export const useListWorkflowTask = ({
  workflowId,
  stageId,
  ...params
}: ListWorkflowTask) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.workflow.tasks(
          workflowId,
          stageId
        ),
        params,
      ],
      queryFn: () =>
        listWorkflowTask({
          workflowId,
          stageId,
          ...params,
        }),
      enabled: !!stageId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
