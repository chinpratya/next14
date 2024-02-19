import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { TaskAssessmentSchema } from '../schemas';
import { TaskAssessment } from '../types';

export const getTaskAssessment = async (
  taskId: string
): Promise<TaskAssessment> => {
  const response = await apiClient.get(
    `/work/${taskId}/assessment`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return TaskAssessmentSchema.parse(response.data);
};

export const useGetTaskAssessment = (taskId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.task.assessment(taskId),
      ],
      queryFn: () => getTaskAssessment(taskId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
