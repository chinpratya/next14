import {
  DeleteOutlined,
  EditOutlined,
  CodeOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Card, Table, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import {
  useColumnFiltered,
  usePermission,
  useSearch,
  useToggle,
} from '@/hooks';
import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteWebform } from '../../api/delete-webform';
import { useListWebform } from '../../api/list-webform';
import { WebForm } from '../../types';
import { WebformGetScriptModal } from '../webform-get-script-modal';
import { WebformPreviewModal } from '../webform-preview-modal';
import { permissions } from '@/permissions';

export type WebformListProps = {
  onEdit?: (webform: WebForm) => void;
};

export const WebformList = ({
  onEdit,
}: WebformListProps) => {
  const { t } = useTranslation();
  const toggle = useToggle<WebForm>();
  const { showNotification } = useNotifications();

  const { debouncedSearch, search, onSearch } =
    useSearch();

  const { data, isLoading, isError } = useListWebform({
    search: debouncedSearch,
  });

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:webform:update'],
    ],
  });

  const deletePermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:webform:delete'],
    ],
  });

  const readPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:webform:read'],
    ],
  });

  const deleteWebform = useDeleteWebform({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.webform.notifications.delete
        ) as string,
      });
      toggle.remove();
    },
  });

  const columns: ColumnsType<WebForm> = [
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.webform.webformName}
        />
      ),
      key: 'name',
      width: 250,
      render: (webform: WebForm) => (
        <Typography.Link
          onClick={() => onEdit?.(webform)}
        >
          {webform.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.webform.captcha}
        />
      ),
      key: 'isCaptcha',
      dataIndex: 'isCaptcha',
      width: 100,
      render: (isCaptcha: boolean) =>
        isCaptcha ? (
          <IntlMessage id={tokens.common.on} />
        ) : (
          <IntlMessage id={tokens.common.off} />
        ),
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.webform.status}
        />
      ),
      key: 'status',
      dataIndex: 'status',
      width: 150,
      render: (status: string) => (
        <ShowTagStatus status={status} />
      ),
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.webform.version}
        />
      ),
      key: 'version',
      dataIndex: 'version',
      width: 100,
      render: (version: string) => (
        <Tag color="success">V.{version}</Tag>
      ),
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.webform.createdDt}
        />
      ),
      key: 'createdDt',
      dataIndex: 'createdDt',
      width: 200,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.webform.updatedDt}
        />
      ),
      key: 'updatedDt',
      dataIndex: 'updatedDt',
      width: 200,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.webform.tags}
        />
      ),
      key: 'tagName',
      dataIndex: 'tagName',
      width: 200,
      render: (tagName: string[]) =>
        tagName && tagName.length > 0
          ? tagName?.map((tagName) => (
              <Tag className="mx-1 my-1" key={tagName}>
                {tagName}
              </Tag>
            ))
          : '-',
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      fixed: 'right',
      render: (webform: WebForm) => (
        <DropdownTable items={menuItems(webform)} />
      ),
    },
  ];

  const { filteredColumns, xScroll, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });

  const menuItems = (webform: WebForm) => [
    {
      label: <IntlMessage id={tokens.common.edit} />,
      key: 'edit',
      icon: <EditOutlined />,
      onClick: () => onEdit?.(webform),
      disabled: !editPermission.isAllow,
    },
    {
      label: <IntlMessage id={tokens.common.delete} />,
      key: 'delete',
      icon: <DeleteOutlined />,
      onClick: () => toggle.remove(webform),
      disabled: !deletePermission.isAllow,
    },
    {
      key: 'divider',
      type: 'divider',
    },
    {
      label: <IntlMessage id={tokens.common.preview} />,
      key: 'preview',
      icon: <EyeOutlined />,
      onClick: () => toggle.preview(webform),
      disabled: !readPermission.isAllow,
    },

    {
      label: <IntlMessage id={tokens.common.getScript} />,
      key: 'getScripts',
      icon: <CodeOutlined />,
      onClick: () => toggle.getScript(webform),
      disabled: !readPermission.isAllow,
    },
  ];

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage
            id={tokens.dataBreach.webform.list}
          />
        }
        extra={
          <>
            <InputSearch
              search={search}
              onSearch={onSearch}
              className="mr-2"
            />
            {ColumnTransfer}
          </>
        }
      >
        <Table
          rowKey="webformID"
          columns={filteredColumns}
          dataSource={data?.data ?? []}
          tableLayout="fixed"
          scroll={{ x: xScroll }}
          loading={isLoading}
        />
        <DeleteModal
          open={toggle.openRemove}
          onCancel={() => toggle.remove()}
          identifier={toggle.data?.name}
          onDelete={() =>
            deleteWebform.submit(toggle.data?.webformID)
          }
          okButtonProps={{
            loading: deleteWebform.isLoading,
          }}
        />
        <WebformGetScriptModal
          open={toggle.openGetScript}
          onClose={() => toggle.getScript()}
          webform={toggle.data}
        />
        <WebformPreviewModal
          open={toggle.openPreview}
          onClose={() => toggle.preview()}
          webformId={toggle.data?.webformID}
        />
      </Card>
    </FallbackError>
  );
};
