import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';

import { WorkflowTaskSchema } from '../schemas';
import { WorkflowTask } from '../types';

export type GetWorkflowTask = {
  workflowId: string;
  taskId: string;
  stageId: string;
};

export const getWorkflowTask = async ({
  workflowId,
  taskId,
  stageId,
}: GetWorkflowTask): Promise<WorkflowTask> => {
  const response = await apiClient.get(
    `/workflow/${workflowId}/state/${stageId}/task/${taskId}`,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );

  return WorkflowTaskSchema.parse(response.data);
};

export type UseGetWorkflowTask = {
  workflowId: string;
  taskId: string;
  stageId: string;
};

export const useGetWorkflowTask = ({
  workflowId,
  taskId,
  stageId,
}: UseGetWorkflowTask) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.workflow.taskDetail(
          workflowId,
          stageId,
          taskId
        ),
      ],
      queryFn: () =>
        getWorkflowTask({ workflowId, stageId, taskId }),
      enabled: !!taskId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
