import { Button, Card, Typography } from 'antd';

import { usePermission } from '@/hooks';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateDataLifecycle } from '../../api/create-data-lifecycle';

export type DataLifecycleCreateProps = {
  activityId: string;
};

export const DataLifecycleCreate = ({
  activityId,
}: DataLifecycleCreateProps) => {
  const { showNotification } = useNotifications();
  const { submit, isLoading } = useCreateDataLifecycle({
    onSuccess: () => {
      queryClient.resetQueries([
        dataMappingQueryKeys.dataLifecycle.detail(
          activityId
        ),
      ]);
      showNotification({
        type: 'success',
        message: 'บันทึกข้อมูลสำเร็จ',
      });
    },
  });

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:activity:update'],
    ],
  });

  const handleCreate = () => submit(activityId);

  return (
    <Card className="mb-0">
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{
          height: 'calc(100vh - 327px)',
          minHeight: 400,
        }}
      >
        <Typography.Title level={3}>
          <IntlMessage id="dataMapping.activity.dataLifecycle.noData" />
        </Typography.Title>
        <Button
          type="link"
          onClick={handleCreate}
          loading={isLoading}
          disabled={!editPermission.isAllow}
        >
          <IntlMessage id="dataMapping.activity.dataLifecycle.draw" />
        </Button>
      </div>
    </Card>
  );
};
