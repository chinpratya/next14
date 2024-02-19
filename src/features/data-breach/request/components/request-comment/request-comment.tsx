import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';
import {
  CommentBox,
  CommentBoxProps,
} from '@components/comment-box';

export type RequestCommentProps = Pick<
  CommentBoxProps,
  'defaultUsertype' | 'disabledChangeUsertype'
> & {
  requestId: string;
};

export const RequestComment = ({
  requestId,
  ...commentBoxProps
}: RequestCommentProps) => {
  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:request:update'],
    ],
  });
  return (
    <CommentBox
      module="dsar"
      submodule="request"
      pageidorname={requestId}
      disabled={!editPermission.isAllow}
      {...commentBoxProps}
    />
  );
};
