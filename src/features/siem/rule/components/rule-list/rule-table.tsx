import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { IntlMessage } from '@/components/util-components/intl-message';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';
import { ShowPassTagDate } from '@components/show-pass-tag-date';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';

import { Rule } from '../../types';

import { RuleSwitchStatus } from './rule-switch-status';

type RuleTableProps = {
  dataSource?: Rule[];
  isLoading: boolean;
  onEdit?: (ruleId: string) => void;
  onDelete?: (rule: Rule) => void;
  onDuplicate?: (rule: Rule) => void;
};

export const RuleTable = ({
  dataSource,
  isLoading,
  onEdit,
  onDelete,
  onDuplicate,
}: RuleTableProps) => {
  const router = useRouter();

  const createPermission = usePermission({
    moduleName: 'siem',
    policies: [permissions['cyber:siem:rule:create']],
  });

  const editPermission = usePermission({
    moduleName: 'siem',
    policies: [permissions['cyber:siem:rule:update']],
  });

  const deletePermission = usePermission({
    moduleName: 'siem',
    policies: [permissions['cyber:siem:rule:delete']],
  });

  const severityItems = [
    {
      label: 'logManagement.critical',
      key: 'CRITICAL',
      color: '#E52917',
    },
    {
      label: 'logManagement.high',
      key: 'HIGH',
      color: '#F59729',
    },
    {
      label: 'logManagement.medium',
      key: 'MEDIUM',
      color: '#F1D43B',
    },
    {
      label: 'logManagement.low',
      key: 'LOW',
      color: '#89F746',
    },
  ];

  const menu = (rule: Rule) =>
    rule.type.toUpperCase() === 'STANDARD'
      ? [
          {
            key: 'view',
            icon: <EyeOutlined />,
            label: (
              <IntlMessage id="siem.detectionRule.view" />
            ),
            onClick: () => onEdit?.(rule.id),
          },
          {
            key: 'duplicate',
            icon: <CopyOutlined />,
            label: (
              <IntlMessage id="siem.detectionRule.duplicate" />
            ),
            disabled: !createPermission.isAllow,
            onClick: () => onDuplicate?.(rule),
          },
        ]
      : [
          {
            key: 'edit',
            icon: <EditOutlined />,
            label: (
              <IntlMessage id="siem.detectionRule.edit" />
            ),
            disabled: !editPermission.isAllow,
            onClick: () => onEdit?.(rule.id),
          },
          {
            key: 'duplicate',
            icon: <CopyOutlined />,
            label: (
              <IntlMessage id="siem.detectionRule.duplicate" />
            ),
            disabled: !createPermission.isAllow,
            onClick: () => onDuplicate?.(rule),
          },
          {
            key: 'delete',
            icon: <DeleteOutlined />,
            label: (
              <IntlMessage id="siem.detectionRule.delete" />
            ),
            disabled: !deletePermission.isAllow,
            onClick: () => {
              onDelete?.(rule);
            },
          },
        ];

  const columns: ColumnsType<Rule> = [
    {
      title: <IntlMessage id="siem.detectionRule.name" />,
      key: 'name',
      width: 200,
      fixed: 'left',
      render: (rule: Rule) => (
        <Link href={`${router.pathname}/${rule.id}`}>
          {rule.name}
        </Link>
      ),
    },
    {
      title: (
        <IntlMessage id="siem.detectionRule.description" />
      ),
      dataIndex: 'description',
      key: 'description',
      width: 270,
      render: (description: string) => {
        return (
          <Typography.Paragraph
            className="mb-0"
            ellipsis={{ rows: 3, tooltip: description }}
          >
            {!!description ? description : '-'}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: (
        <IntlMessage id="siem.detectionRule.severity" />
      ),
      dataIndex: 'components',
      key: 'severity',
      width: 150,
      render: (severity) => (
        <ShowTagStatus
          items={severityItems}
          status={
            _.get(
              severity,
              '[0].trigger.thresholds.severity[0].type'
            ) ?? '-'
          }
        />
      ),
    },
    {
      title: (
        <IntlMessage id="siem.detectionRule.createdDate" />
      ),
      key: 'createdAt',
      width: 150,
      align: 'center',
      render: ({ created_date, type }: Rule) => (
        <ShowTagDate
          date={type === 'STANDARD' ? null : created_date}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="siem.detectionRule.updatedDate" />
      ),
      key: 'updatedAt',
      width: 150,
      align: 'center',
      render: ({ updated_date, type }: Rule) => (
        <ShowPassTagDate
          date={
            type === 'STANDARD'
              ? null
              : dayjs(updated_date).year() < 2000
              ? null
              : updated_date
          }
        />
      ),
    },
    {
      title: (
        <IntlMessage id="siem.detectionRule.ruleStatus" />
      ),
      key: 'status',
      width: 120,
      render: (rule: Rule) => (
        <RuleSwitchStatus
          ruleId={rule.id}
          enabled={rule.enabled}
        />
      ),
    },
    {
      key: 'action',
      fixed: 'right',
      width: 50,
      render: (data: Rule) => (
        <DropdownTable items={menu(data)} />
      ),
    },
  ];

  return (
    <Table
      tableLayout="fixed"
      rowKey="id"
      className={css`
        td.ant-table-cell {
          vertical-align: top;
        }

        td:nth-child(6) button {
          margin-top: 3px;
        }

        td:last-child button {
          margin-top: -5px;
        }
      `}
      dataSource={dataSource}
      columns={columns}
      scroll={{ x: 900 }}
      loading={isLoading}
      pagination={false}
    />
  );
};
