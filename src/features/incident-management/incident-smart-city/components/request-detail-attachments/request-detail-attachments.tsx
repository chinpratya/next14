import { UploadFileCustomList } from '../../../../shared';

type RequestDetailAttachmentsProps = {
  requestId: string;
};
export const RequestDetailAttachments = ({
  requestId,
}: RequestDetailAttachmentsProps) => {
  return (
    <UploadFileCustomList
      module="dsar"
      group={`request-${requestId}`}
      type={'default'}
    />
  );
};
