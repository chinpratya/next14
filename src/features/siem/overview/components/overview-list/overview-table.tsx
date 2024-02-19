import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Link from 'next/link';

import { NoneProfile } from '@/components/share-components/none-profile';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import { IntlMessage } from '@/components/util-components/intl-message';

import { UnresolvedIncident } from '../../../../siem/report/types';
import {
  statusItems,
  severityItems,
} from '../../../shared/constant/incident';

type OverviewTableProps = {
  data?: UnresolvedIncident[];
  loading: boolean;
};

export const OverviewTable = ({
  data,
  loading,
}: OverviewTableProps) => {
  const columns: ColumnsType<UnresolvedIncident> = [
    {
      title: <IntlMessage id="siem.overview.incident" />,
      key: 'id',
      render: ({ id }: UnresolvedIncident) => (
        <Typography>{`SP-${id
          .slice(-4)
          .toUpperCase()}`}</Typography>
      ),
    },
    {
      title: (
        <IntlMessage id="siem.overview.incidentName" />
      ),
      dataIndex: 'rule_name',
      key: 'name',
      render: (
        name: string,
        record: UnresolvedIncident
      ) => (
        <Link
          href={`/apps/cyberfence/siem/incident-management/${record.id}`}
          target="_blank"
        >
          {name}
        </Link>
      ),
    },
    {
      title: (
        <IntlMessage id="siem.overview.createDate" />
      ),
      key: 'createdDate',
      align: 'center',
      render: ({ created_date }: UnresolvedIncident) => (
        <ShowTagDate date={created_date} />
      ),
    },
    {
      title: <IntlMessage id="siem.overview.severity" />,
      key: 'severity',
      align: 'center',
      render: ({ severity }: UnresolvedIncident) => (
        <ShowTagStatus
          items={severityItems.map((item) => ({
            ...item,
            label: item.label,
          }))}
          status={severity}
        />
      ),
    },
    {
      title: <IntlMessage id="siem.overview.assignee" />,
      key: 'assigned',
      align: 'center',
      render: ({ assignes }: UnresolvedIncident) =>
        assignes && !!assignes?.[0].email ? (
          <NoneProfile title={assignes?.[0].email} />
        ) : (
          '-'
        ),
    },
    {
      title: <IntlMessage id="siem.overview.status" />,
      dataIndex: 'assign_status',
      key: 'status',
      align: 'center',
      render: (status: string) => (
        <ShowTagStatus
          items={statusItems.map((item) => ({
            ...item,
            label: item.label,
          }))}
          status={status}
        />
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={loading}
      scroll={{ x: true }}
      pagination={false}
    />
  );
};
