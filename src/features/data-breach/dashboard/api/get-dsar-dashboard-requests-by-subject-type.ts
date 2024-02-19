import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { DashboardRequestsBySubjectTypeSchema } from '../schemas';
import { DashboardRequestsBySubjectType } from '../types';

export const getDsarDashboardRequestsBySubjectType =
  async (): Promise<DashboardRequestsBySubjectType[]> => {
    const { data } = await apiClient.get(
      `/dashboard/datasubject`,
      {
        baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
      }
    );

    return z
      .array(DashboardRequestsBySubjectTypeSchema)
      .parse(data);
  };

export const useGetDsarDashboardRequestsBySubjectType =
  () => {
    const { data, isFetching, isFetched, isError } =
      useQuery({
        queryKey: [
          dataBreachQueryKeys.dashboard.subjectType,
        ],
        queryFn: () =>
          getDsarDashboardRequestsBySubjectType(),
      });

    return {
      data,
      isLoading: isFetching && !isFetched,
      isError,
    };
  };
