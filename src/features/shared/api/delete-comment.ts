import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_ONEFENCE_COMMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { shareQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type DeleteComment = {
  module: string;
  submodule: string;
  pageidorname: string;
  commentId: string;
};

export const deleteComment = async ({
  module,
  submodule,
  pageidorname,
  commentId,
}: DeleteComment) => {
  return apiClient.delete(
    `/discuss/${module}/${submodule}/${pageidorname}/${commentId}`,
    {
      baseURL: API_ENDPOINT_ONEFENCE_COMMENT_BASE_URL,
    }
  );
};

export type UseDeleteComment = {
  module: string;
  submodule: string;
  pageidorname: string;
  onSuccess?: (fileName: string) => void;
};

export const useDeleteComment = ({
  module,
  submodule,
  pageidorname,
}: UseDeleteComment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (commentId: string) =>
      deleteComment({
        module,
        submodule,
        pageidorname,
        commentId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([
        shareQueryKeys.comment.all(
          module,
          submodule,
          pageidorname
        ),
      ]);
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
