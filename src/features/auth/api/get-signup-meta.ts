import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { authQueryKeys } from '@/lib/queryKeys';
import { convertSnakeToCamel } from '@/utils';

import { SignupMetaSchema } from '../schemas';
import { SignupMeta } from '../types';

const getSignupMeta = async (): Promise<SignupMeta> => {
  const { data } = await apiClient.get(
    `/user/signup/meta`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );

  return SignupMetaSchema.parse(
    convertSnakeToCamel(data)
  );
};

export const useGetSignupMeta = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [authQueryKeys.signup.meta],
      queryFn: getSignupMeta,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
