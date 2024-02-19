import { css } from '@emotion/css';
import { Typography, Divider, Table, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import { ActivityPreview } from '../../types';

type ActivityPreviewDataInfoProps = {
  data?: ActivityPreview;
};

export const ActivityPreviewDataInfo = ({
  data,
}: ActivityPreviewDataInfoProps) => {
  const columsDataController: ColumnsType<
    Record<string, unknown>
  > = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataCategory.index" />
      ),
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataInfo.fullName" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 250,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataInfo.personalType" />
      ),
      dataIndex: 'personalType',
      key: 'personalType',
      width: 100,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataInfo.address" />
      ),
      dataIndex: 'address',
      key: 'address',
      width: 250,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataInfo.country" />
      ),
      dataIndex: 'country',
      key: 'country',
      width: 150,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataInfo.tel" />
      ),
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataInfo.email" />
      ),
      dataIndex: 'email',
      key: 'email',
      width: 150,
      ellipsis: true,
    },
  ];
  const columsDataProtectionOfficer: ColumnsType<
    Record<string, unknown>
  > = [
    {
      title: 'ลำดับ',
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataInfo.fullName" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 250,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataInfo.personalType" />
      ),
      dataIndex: 'personalType',
      key: 'personalType',
      width: 100,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataInfo.address" />
      ),
      dataIndex: 'address',
      key: 'address',
      width: 250,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataInfo.country" />
      ),
      dataIndex: 'country',
      key: 'country',
      width: 150,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataInfo.tel" />
      ),
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.dataInfo.email" />
      ),
      dataIndex: 'email',
      key: 'email',
      width: 150,
      ellipsis: true,
    },
  ];
  return (
    <div>
      <Flex justifyContent="center">
        <Typography.Title
          level={3}
          style={{ fontWeight: 'bold' }}
        >
          <IntlMessage id="dataMapping.activity.preview.dataInfo.title" />
        </Typography.Title>
      </Flex>

      <Typography.Title
        style={{
          fontWeight: 'bold',
        }}
        level={4}
        className="mt-5"
      >
        <IntlMessage id="dataMapping.activity.preview.dataInfo.name" />{' '}
        : {data?.name}
      </Typography.Title>
      <Divider />
      <Card
        title={
          <IntlMessage id="dataMapping.activity.preview.dataInfo.dataController" />
        }
        bordered={false}
        className={css`
          .ant-card-head {
            padding: 0 !important;
          }
          .ant-card-body {
            padding: 20px 5px !important;
          }
        `}
      >
        <Table
          rowKey="actorID"
          columns={columsDataController}
          dataSource={data?.dataController ?? []}
          tableLayout="fixed"
          scroll={{ x: 1120, y: 270 }}
          pagination={false}
        />
      </Card>

      {data?.dataProtectionOfficer &&
      data?.dataProtectionOfficer?.length > 0 ? (
        <Card
          title={
            <IntlMessage id="dataMapping.activity.preview.dataInfo.dataProtectionOfficer" />
          }
          bordered={false}
          className={css`
            .ant-card-head {
              padding: 0 !important;
            }
            .ant-card-body {
              padding: 20px 5px !important;
            }
          `}
        >
          <Table
            rowKey="actorID"
            columns={columsDataProtectionOfficer}
            dataSource={data?.dataProtectionOfficer ?? []}
            tableLayout="fixed"
            scroll={{ x: 1120, y: 270 }}
            pagination={false}
          />
        </Card>
      ) : (
        <Typography.Title
          level={4}
          style={{ fontWeight: 'bold' }}
        >
          <IntlMessage id="dataMapping.activity.preview.dataInfo.dataProtectionOfficer" />{' '}
          : ไม่มี
        </Typography.Title>
      )}
    </div>
  );
};
