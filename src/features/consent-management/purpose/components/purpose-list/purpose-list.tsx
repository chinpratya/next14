import { Card, Table, Typography, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';

import {
  Purpose,
  useListGroup,
  useListPurpose,
} from '@/features/data-mapping';
import {
  useSearch,
  usePagination,
  useColumnFiltered,
} from '@/hooks';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

export const PurposeList = () => {
  const router = useRouter();
  const { onSearch, search, debouncedSearch } =
    useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isError, isLoading } = useListPurpose({
    search: debouncedSearch,
    page,
    pageSize,
    consent: true,
  });

  const listGroup = useListGroup({
    menuID: 'Purpose',
  });

  const columns: ColumnsType<Purpose> = [
    {
      title: (
        <IntlMessage id="consentManagement.purpose.purposeList.id" />
      ),
      dataIndex: 'purposeID',
      key: 'purposeID',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="consentManagement.purpose.purposeList.purpose" />
      ),
      key: 'name',
      width: 150,
      render: (purpose: Purpose) => (
        <Typography.Link
          onClick={() =>
            router.push(
              `${router.asPath}/${purpose.purposeID}`
            )
          }
        >
          {purpose.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.purpose.purposeList.group" />
      ),
      key: 'groups',
      width: 150,
      filters:
        listGroup?.data?.data?.map((group) => ({
          value: group.name,
          text: group.name,
        })) ?? [],
      onFilter: (value, record) => record.group === value,
      render: (purpose: Purpose) => {
        return (
          <Tag className="mx-1 my-1">{purpose.group}</Tag>
        );
      },
    },
    {
      title: (
        <IntlMessage id="consentManagement.purpose.purposeList.status" />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 150,
      filters: [
        {
          text: 'ใช้งาน',
          value: 'active',
        },
        {
          text: 'ไม่ใช้งาน',
          value: 'inactive',
        },
      ],
      onFilter: (value, record) =>
        record.status === value,
      render: (status: string) => (
        <ShowTagStatus status={status} />
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.purpose.purposeList.createDate" />
      ),
      dataIndex: 'created_dt',
      key: 'created_dt',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.purpose.purposeList.lastUpdate" />
      ),
      dataIndex: 'updated_dt',
      key: 'updated_dt',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
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
          <IntlMessage id="consentManagement.purpose.purposeList" />
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
          columns={filteredColumns}
          dataSource={data?.data ?? []}
          pagination={false}
          scroll={{ x: 950 }}
          tableLayout="fixed"
          loading={isLoading}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
    </FallbackError>
  );
};
