import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import {
  ERROR_COLOR,
  SUCCESS_COLOR,
} from '@/config/color';

type BackupDataSeverityTagProps = {
  status: string;
};

export const BackupDataSeverityTag = ({
  status,
}: BackupDataSeverityTagProps) => {
  return (
    <ShowTagStatus
      status={status}
      items={[
        {
          label: 'logManagement.success',
          icon: <CheckCircleOutlined />,
          key: 'SUCCESS',
          color: SUCCESS_COLOR,
        },
        {
          label: 'logManagement.inProgress',
          icon: <ClockCircleOutlined />,
          key: 'RUNNING',
          color: '#17BCFF',
        },
        {
          label: 'logManagement.fail',
          icon: <CloseCircleOutlined />,
          key: 'ERROR',
          color: ERROR_COLOR,
        },
      ]}
    />
  );
};
