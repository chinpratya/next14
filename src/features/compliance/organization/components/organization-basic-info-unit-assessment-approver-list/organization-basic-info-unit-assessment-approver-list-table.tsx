import {
  DeleteOutlined,
  FileTextOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { Button, Table, Typography } from 'antd';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { useColumnFiltered } from '@/hooks';
import { IntlMessage } from '@utilComponents/intl-message';

import { OrganizationUnitApprover } from '../../types';

type OrganizationBasicInfoUnitAssessmentApproverTableProps =
  {
    dataSource?: OrganizationUnitApprover[];
    loading: boolean;
    onEdit?: (approver: OrganizationUnitApprover) => void;
    onDelete?: (
      approver: OrganizationUnitApprover
    ) => void;
    onChoose?: (
      approver: OrganizationUnitApprover
    ) => void;
    onAddRespondent?: () => void;
  };

export const OrganizationBasicInfoUnitAssessmentApproverTable =
  ({
    dataSource,
    loading,
    onEdit,
    onDelete,
    onChoose,
    onAddRespondent,
  }: OrganizationBasicInfoUnitAssessmentApproverTableProps) => {
    const columns = [
      {
        title: (
          <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.name" />
        ),
        key: 'name',
        render: (approver: OrganizationUnitApprover) => (
          <Typography.Link
            onClick={() => onEdit?.(approver)}
          >
            {approver.name}
          </Typography.Link>
        ),
      },
      {
        title: (
          <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.department" />
        ),
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: (
          <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.position" />
        ),
        dataIndex: 'position',
        key: 'position',
      },
      {
        title: (
          <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.email" />
        ),
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: (
          <IntlMessage id="compliance.organization.detail.branch.assessmentApprover.tel" />
        ),
        dataIndex: 'tel',
        key: 'tel',
      },
      {
        key: 'action',
        width: 50,
        render: (approver: OrganizationUnitApprover) => (
          <DropdownTable
            items={[
              {
                key: 'edit',
                label: (
                  <IntlMessage id="compliance.organization.edit" />
                ),
                icon: <FileTextOutlined />,
                onClick: () => onEdit?.(approver),
              },
              {
                key: 'delete',
                label: (
                  <IntlMessage id="compliance.organization.delete" />
                ),
                icon: <DeleteOutlined />,
                onClick: () => onDelete?.(approver),
              },
              {
                key: 'choose',
                label: (
                  <IntlMessage id="compliance.organization.choose" />
                ),
                icon: <PlusCircleOutlined />,
                onClick: () => onChoose?.(approver),
              },
            ]}
          />
        ),
      },
    ];

    const { filteredColumns, ColumnTransfer } =
      useColumnFiltered({
        id: 'organization-basic-info-unit-assessment-approver-list-table',
        columns,
      });

    return (
      <>
        <Flex justify="end" className="mb-4" gap="sm">
          {ColumnTransfer}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => onAddRespondent?.()}
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
        />
      </>
    );
  };
