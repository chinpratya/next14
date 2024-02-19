import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';

import {
  WebformAdminPortal,
  WebformAdminPortalSchema,
} from '../../webform';

export type GetWebformAdminPortal = {
  webformId: string;
  identify: string;
};

export const getWebformAdminPortal = async ({
  webformId,
  identify,
}: GetWebformAdminPortal): Promise<WebformAdminPortal> => {
  const response = await apiClient.get(
    `/webfrom/${webformId}/admin?identify=${identify}`,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );

  return WebformAdminPortalSchema.parse(response);
};

export const useGetWebformAdminPortal = ({
  webformId,
  identify,
}: GetWebformAdminPortal) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.webform.admin(
          webformId,
          identify
        ),
      ],
      queryFn: () =>
        getWebformAdminPortal({ webformId, identify }),
      enabled: !!webformId && !!identify,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
