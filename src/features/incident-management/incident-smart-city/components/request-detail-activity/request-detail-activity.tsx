import { CommentBox } from '@components/comment-box';

type RequestDetailActivityProps = {
  requestId: string;
};
export const RequestDetailActivity = ({
  requestId,
}: RequestDetailActivityProps) => {
  return (
    <>
      <CommentBox
        module="dsar"
        submodule="request"
        pageidorname={requestId}
      />
    </>
  );
};
