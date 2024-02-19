import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ONEFENCE_COMMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { shareQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type payloadType = {
  comment: string;
  email: string;
  userid: string;
  usertype: string;
  name: string;
};

export type CreateComment = {
  payload: payloadType;
  module: string;
  submodule: string;
  pageidorname: string;
};

export const createComment = async ({
  module,
  submodule,
  pageidorname,
  payload,
}: CreateComment): Promise<void> => {
  await apiClient.post(
    `/discuss/${module}/${submodule}/${pageidorname}`,
    payload,
    {
      baseURL: API_ENDPOINT_ONEFENCE_COMMENT_BASE_URL,
    }
  );
};

export type UseCreateComment = {
  module: string;
  submodule: string;
  pageidorname: string;
  onSuccess?: () => void;
};

export const useCreateComment = ({
  module,
  submodule,
  pageidorname,
  onSuccess,
}: UseCreateComment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: payloadType) =>
      createComment({
        module,
        submodule,
        pageidorname,
        payload,
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries([
        shareQueryKeys.comment.all(
          module,
          submodule,
          pageidorname
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
