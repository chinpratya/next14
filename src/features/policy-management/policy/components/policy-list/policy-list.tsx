import {
  CodeOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Card, Tag, Typography } from 'antd';
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
import { DescriptionBlock } from '@components/description-block';
import { InputSearch } from '@components/input-search';
import { RowBoxTable } from '@components/row-box-table';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeletePolicy } from '../../api/delete-policy';
import { useListPolicy } from '../../api/list-policy';
import { Policy } from '../../types';
import { PolicyGetScript } from '../policy-get-script';
import { PolicyPreview } from '../policy-preview';

type PolicyListProps = {
  onEdit?: (policy: Policy) => void;
};

export const PolicyList = ({
  onEdit,
}: PolicyListProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { showNotification } = useNotifications();
  const { debouncedSearch, search, onSearch } =
    useSearch();

  const { data, isLoading, isError } = useListPolicy({
    search: debouncedSearch,
  });

  const deletePermission = usePermission({
    moduleName: 'policy',
    policies: [
      permissions['pdpakit:policy:document:delete'],
    ],
  });

  const editPermission = usePermission({
    moduleName: 'policy',
    policies: [
      permissions['pdpakit:policy:document:update'],
    ],
  });

  const readPermission = usePermission({
    moduleName: 'policy',
    policies: [
      permissions['pdpakit:policy:document:read'],
    ],
  });

  const deletePolicy = useDeletePolicy({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'policyManagement.notification.policy.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const columns = [
    {
      title: (
        <IntlMessage id="policyManagement.policy.name" />
      ),
      key: 'name',
      width: 4,
      render: (policy: Policy) => (
        <DescriptionBlock
          title={
            <Typography.Link
              onClick={() => onEdit?.(policy)}
              disabled={!readPermission.isAllow}
            >
              {policy.name}
            </Typography.Link>
          }
          description={
            <Typography.Text type="secondary">
              <IntlMessage id="policyManagement.policy.description" />
              : {policy.description}
            </Typography.Text>
          }
          divider={false}
          bottomClassName="mb-0"
        />
      ),
    },
    {
      title: (
        <IntlMessage id="policyManagement.policy.type" />
      ),
      key: 'policy_type_name',
      dataIndex: 'policy_type_name',
      width: 4,
      render: (policy_type_name: string) => {
        return policy_type_name ? policy_type_name : '-';
      },
    },
    {
      title: (
        <IntlMessage id="policyManagement.policy.version" />
      ),
      key: 'version',
      width: 2,
      render: (data: Policy) =>
        data.version !== '0' ? (
          <Tag color="success">V.{data.version}</Tag>
        ) : (
          <Tag color="warning">
            <IntlMessage id="policyManagement.policy.version.draft" />
          </Tag>
        ),
    },
    {
      title: (
        <IntlMessage id="policyManagement.policy.language" />
      ),
      key: 'language',
      dataIndex: 'language',
      width: 2,
      render: (languages: string[]) =>
        languages?.map((language: string) => (
          <Tag className="my-1" key={language}>
            {language}
          </Tag>
        )),
    },
    {
      title: (
        <IntlMessage id="policyManagement.policy.status" />
      ),
      key: 'status',
      dataIndex: 'status',
      width: 2,
      render: (status: string) => (
        <ShowTagStatus status={status} />
      ),
    },
    {
      title: (
        <IntlMessage id="policyManagement.policy.createdAt" />
      ),
      key: 'created_at',
      dataIndex: 'created_at',
      width: 3,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="policyManagement.policy.updatedAt" />
      ),
      key: 'updated_at',
      dataIndex: 'updated_at',
      width: 3,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="policyManagement.policy.tagName" />
      ),
      key: 'tagName',
      width: 150,
      ellipsis: true,
      dataIndex: 'tagName',
      render: (tagName: string[]) =>
        tagName?.map((tag: string) => (
          <Tag className="mx-1 my-1" key={tag}>
            {tag}
          </Tag>
        )),
    },
  ];

  const menuItems = (policy: Policy) => [
    {
      label: (
        <IntlMessage id="policyManagement.policy.edit" />
      ),
      key: 'edit',
      icon: <EditOutlined />,
      onClick: () => onEdit?.(policy),
      // disabled: !editPermission.isAllow,
    },
    {
      label: (
        <IntlMessage id="policyManagement.policy.delete" />
      ),
      key: 'delete',
      icon: <DeleteOutlined />,
      onClick: () => toggle.remove(policy),
      // disabled: !deletePermission.isAllow,
    },
    {
      key: 'divider',
      type: 'divider',
    },
    {
      label: (
        <IntlMessage id="policyManagement.policy.preview" />
      ),
      key: 'preview',
      icon: <EyeOutlined />,
      onClick: () => toggle.preview(policy),
    },
    {
      label: (
        <IntlMessage id="policyManagement.policy.getScript" />
      ),
      key: 'getScript',
      icon: <CodeOutlined />,
      onClick: () => toggle.getScript(policy),
    },
  ];

  const { filteredColumnsKeys, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });

  const filteredColumns = columns.filter((column) =>
    filteredColumnsKeys.includes(column.key)
  );

  return (
    <FallbackError isError={isError}>
      <Card
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
        <RowBoxTable
          columns={filteredColumns}
          dataSource={data?.data ?? []}
          menuItems={menuItems}
          loading={isLoading}
          itemBoxBorderColor="#faad14"
        />
        <DeleteModal
          open={toggle.openRemove}
          onCancel={() => toggle.remove()}
          identifier={toggle.data?.name}
          onDelete={() =>
            deletePolicy.submit(toggle.data?.ObjectUUID)
          }
          okButtonProps={{
            loading: deletePolicy.isLoading,
          }}
        />
        <PolicyPreview
          open={toggle.openPreview}
          onClose={() => toggle.preview()}
          policyId={
            (toggle.data?.ObjectUUID as string) ?? ''
          }
        />
        <PolicyGetScript
          open={toggle.openGetScript}
          onCancel={() => toggle.getScript()}
          policyId={
            (toggle.data?.ObjectUUID as string) ?? ''
          }
        />
      </Card>
    </FallbackError>
  );
};
