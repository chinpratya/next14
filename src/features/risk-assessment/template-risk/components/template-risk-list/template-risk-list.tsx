import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Table, Card, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import {
  useColumnFiltered,
  usePagination,
  usePermission,
  useSearch,
  useToggle,
} from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { SwitchOutlined } from '@utilComponents/icon';
import { IntlMessage } from '@utilComponents/intl-message';

import { useActivateTemplateRisk } from '../../api/activate-template-risk';
import { useDeleteTemplateRisk } from '../../api/delete-template-risk';
import { useDuplicateTemplateRisk } from '../../api/duplicate-template-risk';
import { useListTemplateRisk } from '../../api/get-list-template-risk';
import { TemplateRisk } from '../../types';

export const TemplateRiskList = () => {
  const { t } = useTranslation();
  const { debouncedSearch, onSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const router = useRouter();
  const { showNotification } = useNotifications();
  const toggle = useToggle();

  const { data, isLoading, isError } =
    useListTemplateRisk({
      page,
      pageSize,
      search: debouncedSearch,
    });

  const editPermission = usePermission({
    moduleName: 'assessment',
    policies: [
      permissions[
        'pdpakit:assessment:templaterisk:update'
      ],
    ],
  });

  const deletePermission = usePermission({
    moduleName: 'assessment',
    policies: [
      permissions[
        'pdpakit:assessment:templaterisk:delete'
      ],
    ],
  });

  const deleteTemplateRisk = useDeleteTemplateRisk({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.riskAssessment.riskTemplate.notifications
            .delete
        ) as string,
      });
      toggle.remove();
    },
  });

  const duplicateTemplateRisk = useDuplicateTemplateRisk({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.riskAssessment.riskTemplate.notifications
            .duplicate
        ) as string,
      });
    },
  });

  const activateTemplateRisk = useActivateTemplateRisk({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.riskAssessment.riskTemplate.notifications
            .activate
        ) as string,
      });
    },
  });

  const columns: ColumnsType<TemplateRisk> = [
    {
      title: (
        <IntlMessage
          id={
            tokens.riskAssessment.riskTemplate
              .assessmentId
          }
        />
      ),
      dataIndex: 'assessmentId',
      key: 'assessmentId',
      width: 100,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.riskTemplate.name}
        />
      ),
      key: 'name',
      width: 100,
      render: (templateRisk: TemplateRisk) => (
        <Typography.Link
          onClick={() =>
            router.push(
              `${router.asPath}/${templateRisk.assessmentId}`
            )
          }
        >
          {templateRisk?.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.riskTemplate.type}
        />
      ),
      dataIndex: 'type',
      key: 'type',
      width: 100,
    },
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.riskTemplate.status}
        />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.riskAssessment.riskTemplate.createdDt
          }
        />
      ),
      dataIndex: 'createdDt',
      key: 'createdDt',
      width: 100,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.riskAssessment.riskTemplate.updatedDt
          }
        />
      ),
      dataIndex: 'updateDt',
      key: 'updateDt',
      width: 100,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (templateRisk: TemplateRisk) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id={tokens.common.edit} />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () =>
                router.push(
                  `${router.asPath}/${templateRisk.assessmentId}`
                ),
              disabled: !editPermission.isAllow,
            },
            {
              label: (
                <IntlMessage id={tokens.common.delete} />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              onClick: () => toggle.remove(templateRisk),
              disabled: !deletePermission.isAllow,
            },
            {
              label: (
                <IntlMessage id={tokens.common.copy} />
              ),
              key: 'copy',
              icon: <CopyOutlined />,
              onClick: () =>
                duplicateTemplateRisk.submit(
                  templateRisk.assessmentId
                ),
              disabled: !editPermission.isAllow,
            },
            {
              label: (
                <IntlMessage
                  id={tokens.common.status.enable}
                />
              ),
              key: 'activate',
              icon: <SwitchOutlined className="mr-1" />,
              onClick: () =>
                activateTemplateRisk.submit(
                  templateRisk.assessmentId
                ),
              disabled: !editPermission.isAllow,
            },
          ]}
        />
      ),
    },
  ];

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage
            id={
              tokens.riskAssessment.riskTemplate.listTitle
            }
          />
        }
        extra={
          <>
            <InputSearch
              className="mr-2"
              onSearch={onSearch}
            />
            {ColumnTransfer}
          </>
        }
      >
        <Table
          columns={filteredColumns}
          dataSource={data?.data ?? []}
          pagination={false}
          loading={isLoading}
          tableLayout="fixed"
          scroll={{
            x: 650,
          }}
        />
        <Pagination
          total={data?.totalRecord}
          onChange={onPaginationChange}
          pageSize={pageSize}
          current={page}
        />
        <DeleteModal
          open={toggle.openRemove}
          identifier={toggle.data?.name as string}
          loading={deleteTemplateRisk.isLoading}
          data={toggle.data}
          onCancel={() => toggle.remove()}
          onDelete={(data) =>
            deleteTemplateRisk.submit(
              data?.assessmentId as string
            )
          }
        />
      </Card>
    </FallbackError>
  );
};
