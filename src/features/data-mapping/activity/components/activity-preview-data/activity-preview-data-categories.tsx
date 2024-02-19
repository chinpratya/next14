import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';

import { IntlMessage } from '@utilComponents/intl-message';

import {
  ActivityPreview,
  DataCategories,
} from '../../types';

type ActivityPreviewDataCategoriesProps = {
  data?: ActivityPreview;
};

export const ActivityPreviewDataCategories = ({
  data,
}: ActivityPreviewDataCategoriesProps) => {
  const onCell = (dataCategory: DataCategories) => {
    const parentPurpose = _.find(data?.dataCategories, {
      purposeID: dataCategory.purposeID,
    });
    const duplicatePurpose = _.filter(
      data?.dataCategories,
      {
        purposeID: dataCategory.purposeID,
      }
    );

    const rowSpan = _.size(duplicatePurpose);

    if (parentPurpose?._id !== dataCategory._id) {
      return {
        rowSpan: 0,
      };
    }

    return {
      rowSpan,
    };
  };

  const columns: ColumnsType<DataCategories> = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataCategory.index" />
      ),
      key: 'index',
      width: 50,
      align: 'center',
      onCell: onCell,
      render: (dataCategory: DataCategories) => {
        const rowIndex = Array.from(
          new Set(
            data?.dataCategories.map(
              (dataCategory) => dataCategory.purposeID
            )
          )
        ).findIndex(
          (purposeID) =>
            purposeID === dataCategory.purposeID
        );

        return rowIndex + 1;
      },
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataCategory.purpose" />
      ),
      key: 'purposeName',
      width: 200,
      onCell: onCell,
      render: (dataCategory: DataCategories) =>
        dataCategory.purposeName,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataCategory.categoryClassification" />
      ),
      key: 'DataCategory',
      dataIndex: 'DataCategory',
      width: 100,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataCategory.dataElement" />
      ),
      key: 'dataElement',
      dataIndex: 'dataElement',
      width: 200,
      render: (dataElement: string[]) =>
        dataElement?.join(','),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataCategory.dataCategory" />
      ),
      key: 'dataClassification',
      dataIndex: 'dataClassification',
      width: 100,
      render: (dataClassification: string[]) =>
        dataClassification?.join(' / '),
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataCategory.dataSubject" />
      ),
      key: 'dataSubject',
      dataIndex: 'dataSubject',
      width: 100,
      render: (dataSubject: string[]) =>
        dataSubject?.join(','),
    },
  ];

  return (
    <>
      <Typography.Title
        level={4}
        style={{ fontWeight: 'bold' }}
      >
        <IntlMessage id="dataMapping.activity.preview.dataCategory.title" />
      </Typography.Title>
      <Table
        rowKey="_id"
        columns={columns}
        scroll={{ x: 750, y: 350 }}
        tableLayout="fixed"
        dataSource={data?.dataCategories ?? []}
        pagination={false}
        bordered
        className="mb-4"
      />
    </>
  );
};
