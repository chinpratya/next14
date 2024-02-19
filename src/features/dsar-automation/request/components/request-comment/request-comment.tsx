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
  return (
    <CommentBox
      module="dsar"
      submodule="request"
      pageidorname={requestId}
      {...commentBoxProps}
    />
  );
};
