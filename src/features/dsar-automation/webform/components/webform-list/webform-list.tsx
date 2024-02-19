import {
  DeleteOutlined,
  EditOutlined,
  CodeOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Card,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import {
  useColumnFiltered,
  usePermission,
  useSearch,
  useToggle,
} from '@/hooks';
import { permissions } from '@/permissions';
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
    moduleName: 'dsar',
    policies: [
      permissions['pdpakit:dsar:webform:update'],
    ],
  });

  const deletePermission = usePermission({
    moduleName: 'dsar',
    policies: [
      permissions['pdpakit:dsar:webform:delete'],
    ],
  });

  const deleteWebform = useDeleteWebform({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.webForm.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const columns: ColumnsType<WebForm> = [
    {
      title: (
        <IntlMessage id="dsarAutomation.setting.webForm.webFormName" />
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
        <IntlMessage id="dsarAutomation.setting.webForm.identifyType" />
      ),
      key: 'identifyType',
      dataIndex: 'identifyType',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.setting.webForm.activity" />
      ),
      key: 'activityName',
      dataIndex: 'activityName',
      width: 300,
      render: (activityName: string[]) =>
        activityName && activityName.length > 0
          ? activityName?.map((activityName) => (
              <Tooltip
                key={activityName}
                placement="topLeft"
                title={activityName}
              >
                <Tag
                  key={activityName}
                  className={css`
                    max-width: 290px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  `}
                >
                  {activityName}
                </Tag>
              </Tooltip>
            ))
          : '-',
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.setting.webForm.group" />
      ),
      key: 'groupName',
      dataIndex: 'groupName',
      width: 250,
      render: (activityGroup: string[]) =>
        activityGroup && activityGroup.length > 0
          ? activityGroup?.map((activityGroup) => (
              <Tag
                className="mx-1 my-1"
                key={activityGroup}
              >
                {activityGroup}
              </Tag>
            ))
          : '-',
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.setting.webForm.captcha" />
      ),
      key: 'isCaptcha',
      dataIndex: 'isCaptcha',
      width: 100,
      render: (isCaptcha: boolean) =>
        isCaptcha ? (
          <IntlMessage id="dsarAutomation.setting.webForm.on" />
        ) : (
          <IntlMessage id="dsarAutomation.setting.webForm.off" />
        ),
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.setting.webForm.status" />
      ),
      key: 'status',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => (
        <ShowTagStatus status={status} />
      ),
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.setting.webForm.version" />
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
        <IntlMessage id="dsarAutomation.setting.webForm.createdDt" />
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
        <IntlMessage id="dsarAutomation.setting.webForm.updatedDt" />
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
        <IntlMessage id="dsarAutomation.setting.webForm.tag" />
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

  const { filteredColumns, xScroll } = useColumnFiltered({
    columns,
  });

  const menuItems = (webform: WebForm) => [
    {
      label: (
        <IntlMessage id="dsarAutomation.setting.webForm.edit" />
      ),
      key: 'edit',
      icon: <EditOutlined />,
      onClick: () => onEdit?.(webform),
      disabled: !editPermission.isAllow,
    },
    {
      label: (
        <IntlMessage id="dsarAutomation.setting.webForm.delete" />
      ),
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
      label: (
        <IntlMessage id="dsarAutomation.setting.webForm.preview" />
      ),
      key: 'preview',
      icon: <EyeOutlined />,
      onClick: () => toggle.preview(webform),
    },

    {
      label: (
        <IntlMessage id="dsarAutomation.setting.webForm.getScript" />
      ),
      key: 'getScripts',
      icon: <CodeOutlined />,
      onClick: () => toggle.getScript(webform),
    },
  ];

  return (
    <FallbackError isError={isError}>
      <Card
        extra={
          <InputSearch
            search={search}
            onSearch={onSearch}
          />
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
