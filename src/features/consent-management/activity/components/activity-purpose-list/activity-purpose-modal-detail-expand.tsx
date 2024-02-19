import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import {
  DataElementOfCategories,
  useListDataElementOfDataCategories,
} from '@/features/data-mapping';
import { usePagination } from '@/hooks';
import { FallbackError } from '@utilComponents/fallback-error';

type ActivityPurposeModalDetailType = {
  dataCategoryID: string;
};

export const ActivityPurposeModalDetailExpand = ({
  dataCategoryID,
}: ActivityPurposeModalDetailType) => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { data, isLoading, isError } =
    useListDataElementOfDataCategories({
      dataCategoryID,
    });

  const columns: ColumnsType<DataElementOfCategories> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Data Classification',
      dataIndex: 'dataClassification',
      key: 'dataClassification',
      width: 150,
    },
  ];

  return (
    <FallbackError isError={isError}>
      <Table
        dataSource={data?.data ?? []}
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: 600 }}
        loading={isLoading}
        pagination={false}
      />
      <Pagination
        current={page}
        total={data?.totalRecord}
        pageSize={pageSize}
        onChange={onPaginationChange}
      />
    </FallbackError>
  );
};
