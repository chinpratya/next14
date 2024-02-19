import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ONEFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';

import { SmtpSchema } from '../schemas';
import { SMTP } from '../types';

export const getSmtpConfig = async (): Promise<SMTP> => {
  const response = await apiClient.get(
    `/mailsender/SMTP`,
    {
      baseURL: API_ENDPOINT_ONEFENCE_BASE_URL,
    }
  );

  return SmtpSchema.parse(response.data);
};

export const useGetSmtpConfig = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [adminQueryKeys.config.smtp],
      queryFn: () => getSmtpConfig(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
