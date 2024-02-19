import { EyeOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { usePagination } from '@/hooks';
import { useToggle } from '@/hooks';
import { ShowTagDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetCollectionPointHistory } from '../../api/get-collection-point-history';
import { ConsentCollectionPointHistory } from '../../types';

import { CollectionPointVersionPreview } from './collection-point-version-preview';

type CollectionPointVersionProps = {
  collectionpointId: string;
};
export const CollectionPointVersion = ({
  collectionpointId,
}: CollectionPointVersionProps) => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const toggle = useToggle();

  const { data, isLoading, isError } =
    useGetCollectionPointHistory({
      collectionPiontId: collectionpointId,
      page,
      pageSize,
    });

  const columns: ColumnsType<ConsentCollectionPointHistory> =
    [
      {
        title: (
          <IntlMessage id="consentManagement.collectionPoint.version.version" />
        ),
        dataIndex: 'version',
        key: 'version',
        width: 100,
      },
      {
        title: (
          <IntlMessage id="consentManagement.collectionPoint.version.createdDt" />
        ),
        dataIndex: 'createdDt',
        key: 'createdDt',
        width: 150,
        render: (createdDt: string) => (
          <ShowTagDate date={createdDt} />
        ),
      },
      {
        title: (
          <IntlMessage id="consentManagement.collectionPoint.version.createdBy" />
        ),
        dataIndex: 'createdBy',
        key: 'createdBy',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="consentManagement.collectionPoint.version.updatedDt" />
        ),
        dataIndex: 'updatedDt',
        key: 'updatedDt',
        width: 150,
        render: (updatedDt: string) => (
          <ShowTagDate date={updatedDt} />
        ),
      },
      {
        title: (
          <IntlMessage id="consentManagement.collectionPoint.version.updatedBy" />
        ),
        dataIndex: 'updatedBy',
        key: 'updatedBy',
        width: 150,
      },
      {
        key: 'action',
        width: 50,
        align: 'center',
        render: (
          history: ConsentCollectionPointHistory
        ) => (
          <EyeOutlined
            onClick={() => toggle.preview(history)}
            className={css`
              cursor: pointer;
              :hover {
                color: #3e79f7;
              }
            `}
          />
        ),
      },
    ];

  return (
    <FallbackError isError={isError}>
      <Card>
        <Table
          columns={columns}
          tableLayout={'fixed'}
          scroll={{ x: 750 }}
          dataSource={data?.data ?? []}
          loading={isLoading}
          pagination={false}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
          showSizeChanger
        />
        <CollectionPointVersionPreview
          onClose={() => toggle.preview()}
          open={toggle.openPreview}
          data={toggle?.data}
        />
      </Card>
    </FallbackError>
  );
};
