import { Typography } from 'antd';

import { IntlMessage } from '@utilComponents/intl-message';

import { UploadFileCustomList } from '../../../../shared';

export type TaskWidgetAttachmentProps = {
  taskId: string;
};
export const TaskWidgetAttachment = ({
  taskId,
}: TaskWidgetAttachmentProps) => {
  return (
    <div className="mt-4 mb-4">
      <Typography.Title level={4}>
        <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo.attachment" />
      </Typography.Title>
      <UploadFileCustomList
        module="dsar"
        group={`task-${taskId}`}
        type="default"
      />
    </div>
  );
};
