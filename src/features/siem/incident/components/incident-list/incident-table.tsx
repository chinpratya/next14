import {
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Button,
  Input,
  Space,
  Table,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { NoneProfile } from '@/components/share-components/none-profile';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import { IntlMessage } from '@/components/util-components/intl-message';
import { useSearch } from '@/hooks';

import { useListIndice } from '../../../indices/api/list-indice';
import { Option } from '../../../indices/types';
import {
  statusItems,
  severityItems,
} from '../../../shared/constant/incident';
import { Incident } from '../../types';

type IncidentTableProps = {
  dataSource?: Incident[];
  loading?: boolean;
  onEdit: (incident: Incident) => void;
  onSearchId: (id: string) => void;
  onChangeFilter?: (
    filter: Record<string, unknown>
  ) => void;
};

export const IncidentTable = ({
  dataSource,
  loading,
  onEdit,
  onSearchId,
  onChangeFilter,
}: IncidentTableProps) => {
  const route = useRouter();
  const { t } = useTranslation();
  const { search, onSearch: setSearch } = useSearch();

  const { data: listIndice, isLoading: isLoadingIndice } =
    useListIndice({
      page: 1,
      pageSize: 100,
      responseType: 'lists',
    });

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearch('');
    onSearchId('');
  };

  const columns: ColumnsType<Incident> = [
    {
      title: (
        <IntlMessage id="siem.incidentManagement.incidentId" />
      ),
      key: 'id',
      width: 100,
      dataIndex: 'code',
      filterDropdown: ({
        setSelectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div
          className="p-2"
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            placeholder={
              t('logManagement.search') as string
            }
            className="mb-2 d-block"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              setSelectedKeys(value ? [value] : []);
            }}
            onPressEnter={() => {
              confirm();
              onSearchId(search);
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => {
                confirm();
                onSearchId(search);
              }}
              className={css`
                span:last-child {
                  margin-left: 4px;
                }
              `}
              icon={<SearchOutlined className="mr-2" />}
              size="small"
            >
              <IntlMessage id="logManagement.search" />
            </Button>
            <Button
              onClick={() => {
                clearFilters && handleReset(clearFilters);
                confirm();
              }}
              size="small"
              style={{ width: 90 }}
            >
              <IntlMessage id="logManagement.reset" />
            </Button>

            <Button
              type="link"
              size="small"
              onClick={close}
            >
              <IntlMessage id="logManagement.close" />
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1677ff' : undefined,
          }}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="siem.incidentManagement.incidentName" />
      ),
      key: 'name',
      width: 300,
      render: (incident: Incident) => (
        <Typography.Link
          onClick={() => onEdit?.(incident)}
        >
          {incident.rule_name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="siem.incidentManagement.indices" />
      ),
      dataIndex: 'indices',
      key: 'indices',
      width: 160,
      render: (indice: string) => {
        return (
          (listIndice?.data as Option[])?.find(
            (item) => item.value === indice
          )?.label ?? indice
        );
      },
    },
    {
      title: (
        <IntlMessage id="siem.incidentManagement.createdDate" />
      ),
      dataIndex: 'created_date',
      key: 'created_date',
      align: 'center',
      width: 180,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="siem.incidentManagement.severity" />
      ),
      dataIndex: 'severity',
      key: 'severity',
      align: 'center',
      filters: [
        {
          text: (
            <IntlMessage id="logManagement.critical" />
          ),
          value: 'CRITICAL',
        },
        {
          text: <IntlMessage id="logManagement.high" />,
          value: 'HIGH',
        },
        {
          text: <IntlMessage id="logManagement.medium" />,
          value: 'MEDIUM',
        },
        {
          text: <IntlMessage id="logManagement.low" />,
          value: 'LOW',
        },
      ],
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
        <IntlMessage id="siem.incidentManagement.assignee" />
      ),
      key: 'assigned',
      align: 'center',
      render: ({ assignes }: Incident) =>
        assignes && !!assignes?.[0].email ? (
          <NoneProfile title={assignes?.[0].email} />
        ) : (
          '-'
        ),
    },
    {
      title: (
        <IntlMessage id="siem.incidentManagement.status" />
      ),
      dataIndex: 'assign_status',
      key: 'status',
      align: 'center',
      width: 150,
      filters: [
        {
          text: t('siem.incidentManagement.new'),
          value: 'New',
        },
        {
          text: t('siem.incidentManagement.open'),
          value: 'Open',
        },
        {
          text: t('siem.incidentManagement.pending'),
          value: 'Pending',
        },
        {
          text: t('siem.incidentManagement.inProgress'),
          value: 'In Progress',
        },
        {
          text: t('siem.incidentManagement.closed'),
          value: 'Closed',
        },
      ],
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
    {
      key: 'action',
      width: 50,
      fixed: 'right',
      render: (incident: Incident) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              icon: <EditOutlined />,
              label: (
                <IntlMessage id="siem.incidentManagement.edit" />
              ),
              onClick: () =>
                route.push(
                  `${route.pathname}/${incident.id}`
                ),
            },
          ]}
        />
      ),
    },
  ];
  return (
    <Table
      rowKey="id"
      onChange={(_, filters) => onChangeFilter?.(filters)}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: 1140 }}
      loading={loading || isLoadingIndice}
      pagination={false}
    />
  );
};
