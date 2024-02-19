import { useQuery } from '@tanstack/react-query';

import { incidentManagementQueryKeys } from '@/lib/queryKeys/incident-management';
import { Request } from '@/types';

import { WorkflowTaskListResponseSchema } from '../schemas';
import { WorkflowTaskListResponse } from '../types';

export type GetWorkflowTaskList = Request & {
  workflowId: string;
  [key: string]: unknown;
};

export const getWorkflowTaskList = async ({
  ...params
}: GetWorkflowTaskList): Promise<WorkflowTaskListResponse> => {
  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  return WorkflowTaskListResponseSchema.parse({
    data: [
      {
        object_uuid:
          'c44180ca-72ca-466b-8799-632c41944ca5',
        name: '#00001',
      },
      {
        object_uuid:
          '648ad0b5-7bba-4e5c-bfd5-f595ccba8b6b',
        name: '#00002',
      },
    ],
  });
};

export const useGetWorkflowTaskList = ({
  workflowId,
  ...params
}: GetWorkflowTaskList) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.workflow.task(
          workflowId
        ),
        params,
      ],
      queryFn: () =>
        getWorkflowTaskList({ workflowId, ...params }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
