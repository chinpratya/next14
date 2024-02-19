import { CodeOutlined } from '@ant-design/icons';
import { Card, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import {
  useSearch,
  usePagination,
  useColumnFiltered,
  useToggle,
} from '@/hooks';
import { DropdownTable } from '@components/dropdown-table';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListPreferenceCenters } from '../../api/list-preference-centers';
import { PreferenceCenters } from '../../types';
import { PreferenceCentersGetScript } from '../preference-centers-get-script';

export const PreferenceCentersList = () => {
  const toggle = useToggle();
  const { debouncedSearch, search, onSearch } =
    useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } =
    useListPreferenceCenters({
      page,
      pageSize,
      search: debouncedSearch,
    });

  const columns: ColumnsType<PreferenceCenters> = [
    {
      title: (
        <IntlMessage id="consentManagement.preferenceCenters.table.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="consentManagement.preferenceCenters.table.status" />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: string) => (
        <ShowTagStatus status={status} />
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.preferenceCenters.table.version" />
      ),
      dataIndex: 'version',
      key: 'version',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="consentManagement.preferenceCenters.table.createdDt" />
      ),
      dataIndex: 'createdDt',
      key: 'createdDt',
      width: 200,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.preferenceCenters.table.publishedDt" />
      ),
      dataIndex: 'published_dt',
      key: 'published_dt',
      width: 200,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.preferenceCenters.table.updatedDt" />
      ),
      dataIndex: 'updatedDt',
      key: 'updatedDt',
      width: 200,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.preferenceCenters.table.tags" />
      ),
      dataIndex: 'tagName',
      key: 'tagName',
      width: 150,
      render: (tags) =>
        tags?.map((tag: string) => (
          <Tag key={tag}>{tag}</Tag>
        )) ?? '-',
    },
    {
      key: 'action',
      width: 50,
      render: (preference: PreferenceCenters) => (
        <DropdownTable
          items={[
            {
              key: 'getScript',
              icon: <CodeOutlined />,
              label: (
                <IntlMessage id="consentManagement.preferenceCenters.table.getScript" />
              ),
              onClick: () => toggle.getScript(preference),
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
          <IntlMessage id="consentManagement.preferenceCenters.table.title" />
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
          rowKey="preferenceID"
          tableLayout="fixed"
          scroll={{
            x: 1050,
          }}
          columns={filteredColumns}
          dataSource={data?.data}
          pagination={false}
          loading={isLoading}
        />
        <Pagination
          current={page}
          total={10}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <PreferenceCentersGetScript
          open={toggle.openGetScript}
          onCancel={() => toggle.getScript()}
          preferenceId={
            (toggle.data?.preferenceID as string) ?? ''
          }
        />
      </Card>
    </FallbackError>
  );
};
