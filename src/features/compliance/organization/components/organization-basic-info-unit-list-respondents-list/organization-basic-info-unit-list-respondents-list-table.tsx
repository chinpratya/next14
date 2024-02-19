import {
  DeleteOutlined,
  DownloadOutlined,
  FileTextOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import {
  Button,
  Dropdown,
  MenuProps,
  Table,
  Typography,
} from 'antd';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { useColumnFiltered, useCsv } from '@/hooks';
import { FileManageOutlined } from '@utilComponents/icon';
import { IntlMessage } from '@utilComponents/intl-message';

import { OrganizationUnitRespondent } from '../../types';

type OrganizationBasicInfoUnitListRespondentsTableProps =
  {
    dataSource?: OrganizationUnitRespondent[];
    loading: boolean;
    onAddRespondents?: () => void;
    onImportRespondents?: () => void;
    onEdit?: (unit: OrganizationUnitRespondent) => void;
    onDelete?: (unit: OrganizationUnitRespondent) => void;
  };

export const OrganizationBasicInfoUnitListRespondentsTable =
  ({
    dataSource,
    loading,
    onEdit,
    onDelete,
    onAddRespondents,
    onImportRespondents,
  }: OrganizationBasicInfoUnitListRespondentsTableProps) => {
    const columns = [
      {
        title: (
          <IntlMessage id="compliance.organization.detail.branch.listRespondents.name" />
        ),
        key: 'name',
        render: (
          respondent: OrganizationUnitRespondent
        ) => (
          <Typography.Link
            onClick={() => onEdit?.(respondent)}
          >
            {respondent.name}
          </Typography.Link>
        ),
        width: 250,
      },
      {
        title: (
          <IntlMessage id="compliance.organization.detail.branch.listRespondents.department" />
        ),
        dataIndex: 'department',
        key: 'department',
        width: 100,
      },
      {
        title: (
          <IntlMessage id="compliance.organization.detail.branch.listRespondents.position" />
        ),
        dataIndex: 'position',
        key: 'position',
        width: 100,
      },
      {
        title: (
          <IntlMessage id="compliance.organization.detail.branch.listRespondents.emailRespondent" />
        ),
        dataIndex: 'email',
        key: 'email',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="compliance.organization.detail.branch.listRespondents.tel" />
        ),
        dataIndex: 'tel',
        key: 'tel',
        width: 100,
      },
      {
        title: (
          <IntlMessage id="compliance.organization.detail.branch.listRespondents.approver" />
        ),
        dataIndex: 'approverName',
        key: 'approverName',
        width: 150,
      },
      {
        key: 'action',
        width: 50,
        render: (
          respondent: OrganizationUnitRespondent
        ) => (
          <DropdownTable
            items={[
              {
                key: 'edit',
                label: (
                  <IntlMessage id="compliance.organization.edit" />
                ),
                icon: <FileTextOutlined />,
                onClick: () => onEdit?.(respondent),
              },
              {
                key: 'delete',
                label: (
                  <IntlMessage id="compliance.organization.delete" />
                ),
                icon: <DeleteOutlined />,
                onClick: () => onDelete?.(respondent),
              },
            ]}
          />
        ),
      },
    ];

    const { ExportCsv } = useCsv({
      data: dataSource,
      columns,
      fileName: 'ListRespondents.csv',
      renderType: 'link',
    });

    const items: MenuProps['items'] = [
      {
        label: (
          <IntlMessage id="compliance.organization.import" />
        ),
        key: '1',
        icon: <DownloadOutlined />,
        onClick: () => onImportRespondents?.(),
      },
      {
        label: ExportCsv,
        key: '2',
        icon: <UploadOutlined />,
      },
    ];

    const { filteredColumns, ColumnTransfer } =
      useColumnFiltered({
        id: 'organization-basic-info-unit-list-respondents-table',
        columns,
      });

    return (
      <>
        <Flex justify="end" gap="sm" className="mb-4">
          <Dropdown menu={{ items }}>
            <Button icon={<FileManageOutlined />}>
              <IntlMessage id="compliance.organization.manage" />
            </Button>
          </Dropdown>
          {ColumnTransfer}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => onAddRespondents?.()}
          >
            <IntlMessage id="compliance.organization.detail.branch.listRespondents.add" />
          </Button>
        </Flex>
        <Table
          rowKey="ObjectUUID"
          columns={filteredColumns}
          dataSource={dataSource}
          loading={loading}
          pagination={false}
          scroll={{ x: 900 }}
          tableLayout="fixed"
        />
      </>
    );
  };
