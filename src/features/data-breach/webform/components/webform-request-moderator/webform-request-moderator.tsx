import {
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import { usePermission, useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { TagTooltipListChild } from '@components/tag-tooltip-list-child';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteWebformUser } from '../../api/delete-webform-user';
import { useListWebformUser } from '../../api/list-webform-user';
import { WebFormUser } from '../../types';

import { ModalAddWebformRequestModerator } from './modal-add-webform-request-moderator';
import { permissions } from '@/permissions';

export type WebformRequestModeratorProps = {
  webformId: string;
};
export const WebformRequestModerator = ({
  webformId,
}: WebformRequestModeratorProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { showNotification } = useNotifications();

  const { data, isError, isLoading } = useListWebformUser(
    { webformId }
  );

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:webform:update'],
    ],
  });

  const deleteUser = useDeleteWebformUser({
    webformId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.webform.notifications
            .deleteRequestModerator
        ) as string,
      });
      toggle.remove();
    },
  });

  const columns: ColumnsType<WebFormUser> = [
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.webform.name}
        />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.webform.position}
        />
      ),
      key: 'position',
      dataIndex: 'position',
      width: 100,
      render: (position: string[]) => (
        <TagTooltipListChild list={position ?? []} />
      ),
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.webform.organization}
        />
      ),
      key: 'organization',
      dataIndex: 'organization',
      width: 100,
      render: (organization: string[]) => (
        <TagTooltipListChild list={organization ?? []} />
      ),
    },
    {
      key: 'action',
      width: 50,
      render: (data: WebFormUser) => (
        <DeleteOutlined
          className="cursor-pointer"
          onClick={() =>
            editPermission.isAllow
              ? toggle.remove(data)
              : null
          }
          style={{
            color: editPermission.isAllow
              ? 'black'
              : '#C4C4C4',
            cursor: editPermission.isAllow
              ? 'pointer'
              : 'not-allowed',
          }}
        />
      ),
    },
  ];
  const disableKey =
    data?.data.map((data) => data.ObjectUUID) ?? [];

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage
            id={tokens.dataBreach.webform.requestTitle}
          />
        }
        style={{ height: '400px' }}
        extra={
          <Button
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={() => toggle.create()}
            disabled={!editPermission.isAllow}
          >
            <IntlMessage
              id={tokens.dataBreach.webform.requestSelect}
            />
          </Button>
        }
      >
        <Table
          columns={columns}
          tableLayout="fixed"
          scroll={{ x: 300 }}
          dataSource={data?.data ?? []}
          loading={isLoading}
        />
        <ModalAddWebformRequestModerator
          open={toggle.openCreate}
          onCancel={() => toggle.create()}
          webformId={webformId}
          disableKey={disableKey}
        />
        <DeleteModal
          open={toggle.openRemove}
          identifier={toggle.data?.name as string}
          loading={deleteUser.isLoading}
          onCancel={() => toggle.remove()}
          onDelete={() =>
            deleteUser.submit(
              toggle.data?.ObjectUUID as string
            )
          }
        />
      </Card>
    </FallbackError>
  );
};
