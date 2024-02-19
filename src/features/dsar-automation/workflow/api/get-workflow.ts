import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';

import {
  RightsStageType,
  RightsStageSchema,
} from '../../shared';
import { WorkflowSchema } from '../schemas';
import { Workflow } from '../types';

export const getWorkflow = async (
  workflowId: string
): Promise<
  Workflow & {
    stages: RightsStageType[];
  }
> => {
  const { data } = await apiClient.get(
    `/workflow/${workflowId}`,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );

  return WorkflowSchema.extend({
    stages: z.array(RightsStageSchema),
  }).parse(data);
};

export const useGetWorkflow = (workflowId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.workflow.detail(
          workflowId
        ),
      ],
      queryFn: () => getWorkflow(workflowId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
