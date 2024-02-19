import { css } from '@emotion/css';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Link from 'next/link';

import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import { IntlMessage } from '@/components/util-components/intl-message';

import { useListIndice } from '../../../indices/api/list-indice';
import {
  severityItems,
  statusItems,
} from '../../../shared/constant/incident';
import { Option, UnresolvedIncident } from '../../types';

type ReportUnresolvedIncidentTableProps = {
  dataSource?: UnresolvedIncident[];
  loading?: boolean;
};

export const ReportUnresolvedIncidentTable = ({
  dataSource,
  loading,
}: ReportUnresolvedIncidentTableProps) => {
  const { data: listIndice, isLoading: isLoadingIndice } =
    useListIndice({
      page: 1,
      pageSize: 100,
      responseType: 'lists',
    });

  const columns: ColumnsType<UnresolvedIncident> = [
    {
      key: 'code',
      title: (
        <IntlMessage id="siem.reportSummary.reportMainPageUnresolveID" />
      ),
      ellipsis: true,
      width: 150,
      render: (data: UnresolvedIncident) => (
        <Link
          href={`/apps/cyberfence/siem/incident-management/${data.id}`}
        >
          {data.code}
        </Link>
      ),
    },
    {
      key: 'name',
      title: (
        <IntlMessage id="siem.reportSummary.reportMainPageUnresolveName" />
      ),
      dataIndex: 'rule_name',
      ellipsis: true,
    },
    {
      key: 'indices',
      title: (
        <IntlMessage id="siem.reportSummary.reportMainPageUnresolveIndices" />
      ),
      dataIndex: 'indices',
      ellipsis: true,
      render: (indice: string) => {
        return (
          (listIndice?.data as Option[])?.find(
            (item) => item.value === indice
          )?.label ?? indice
        );
      },
    },
    {
      key: 'createdDate',
      title: (
        <IntlMessage id="siem.reportSummary.reportMainPageUnresolveCreateDate" />
      ),
      dataIndex: 'created_date',
      align: 'center',
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="siem.reportSummary.reportMainPageUnresolveSeverity" />
      ),
      dataIndex: 'severity',
      key: 'severity',
      align: 'center',
      width: 150,
      render: (severity: string) => (
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
      title: (
        <IntlMessage id="siem.reportSummary.reportMainPageUnresolveStatus" />
      ),
      dataIndex: 'assign_status',
      key: 'status',
      align: 'center',
      width: 150,
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
      bordered
      className={css`
        .ant-table-thead > tr > th {
          background-color: #f7f7f8;
          padding: 12px 16px;
        }

        .ant-table-tbody > tr > td {
          padding: 12px 16px;
        }
      `}
      dataSource={dataSource ?? []}
      columns={columns}
      loading={loading || isLoadingIndice}
      scroll={{ x: 1000 }}
    />
  );
};
