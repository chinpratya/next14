import { UploadFileCustomList } from '../../../../shared';

export type RequestAttachmentsProps = {
  requestId: string;
};
export const RequestAttachments = ({
  requestId,
}: RequestAttachmentsProps) => {
  return (
    <UploadFileCustomList
      module="dsar"
      group={`request-${requestId}`}
      type="default"
      isRefresh
    />
  );
};
