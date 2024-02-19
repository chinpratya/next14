import { usePermission } from '@/hooks';
import { UploadFileCustomList } from '../../../../shared';
import { permissions } from '@/permissions';

export type RequestAttachmentsProps = {
  requestId: string;
};
export const RequestAttachments = ({
  requestId,
}: RequestAttachmentsProps) => {
  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:request:update'],
    ],
  });
  return (
    <UploadFileCustomList
      module="dsar"
      group={`request-${requestId}`}
      type="default"
      isRefresh
      disabled={!editPermission.isAllow}
    />
  );
};
