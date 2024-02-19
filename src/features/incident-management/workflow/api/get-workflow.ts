import { useQuery } from '@tanstack/react-query';

import { incidentManagementQueryKeys } from '@/lib/queryKeys/incident-management';

import { WorkflowResponseSchema } from '../schemas';
import { WorkflowResponse } from '../types';

export const getWorkflow = async (
  workflowId: string
): Promise<WorkflowResponse> => {
  //   const { data } = await apiClient.get(
  //     `/policyNotices/${policyId}`,
  //     {
  //       baseURL:
  //         API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
  //     }
  //   );

  //   return PolicySchema.parse(data);
  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  return WorkflowResponseSchema.parse({
    data: {
      name: 'เกิดเหตุเพลิงไหม้',
      sla: {
        type: 'compliance',
        name: 'SLA 1',
      },
      stakeholders: [
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          avatar: 'https://example.com/john-doe.jpg',
        },
        {
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          avatar: 'https://example.com/jane-doe.jpg',
        },
      ],
    },
  });
};

export const useGetWorkflow = (workflowId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.workflow.detail(
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
