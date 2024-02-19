import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { organizationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';

import { HCodeSchema } from '../schemas';
import { HCode } from '../types';

export const getHCode = async (
  hcode: string
): Promise<HCode> => {
  const { data } = await apiClient.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/ha/${hcode}`
  );
  return HCodeSchema.parse(data);
};

type UseGetHCode = {
  hcode?: string;
  onSuccess?: (data?: HCode) => void;
  onError?: () => void;
};

export const useGetHCode = ({
  hcode = '',
  onError,
  onSuccess,
}: UseGetHCode) => {
  const { showNotification } = useNotifications();
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: () => getHCode(hcode),
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        organizationQueryKeys.hcode.detail(hcode),
      ]);
      onSuccess?.(data);
    },
    onError(error: AxiosError<Record<string, unknown>>) {
      showNotification({
        type: 'error',
        message: error.response?.data
          .errorMessage as string,
      });
      onError?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
    isError,
  };
};
