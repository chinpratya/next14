import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { DashboardAcceptSchema } from '../schemas';
import { DashboardAccept } from '../types';

type ListDashboardAccept = {
  duration?: string;
};

export const listDashboardAccept = async ({
  duration,
}: ListDashboardAccept): Promise<DashboardAccept> => {
  const { data } = await apiClient.get(
    `/dashboard/accept`,
    {
      params: { duration },
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return DashboardAcceptSchema.parse(data);
};

type UseListDashboardAccept = ListDashboardAccept;

export const useListDashboardAccept = ({
  duration,
}: UseListDashboardAccept) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.dashboard.accept,
        duration,
      ],
      queryFn: () => listDashboardAccept({ duration }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
