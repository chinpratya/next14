import { Button, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  ActivityPreview,
  TransferData,
} from '../../types';

type ActivityPreviewDataTransferProps = {
  data?: ActivityPreview;
};

export const ActivityPreviewDataTransfer = ({
  data,
}: ActivityPreviewDataTransferProps) => {
  const columns: ColumnsType<TransferData> = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.transfer.index" />
      ),
      key: 'index',
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.transfer.purpose" />
      ),
      key: 'purpose',
      dataIndex: 'purpose',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.transfer.position" />
      ),
      key: 'position',
      dataIndex: 'position',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.transfer.country" />
      ),
      key: 'country',
      dataIndex: 'country',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.transfer.isCompanyGroup" />
      ),
      key: 'isCompanyGroup',
      dataIndex: 'isCompanyGroup',
      width: 200,
      render: (isCompanyGroup: boolean) =>
        isCompanyGroup ? 'ใช่' : 'ไม่ใช่',
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.transfer.destCountry" />
      ),
      key: 'destCountry',
      dataIndex: 'destCountry',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.transfer.destName" />
      ),
      key: 'destName',
      dataIndex: 'destName',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.transfer.transferMethod" />
      ),
      key: 'tranferMethod',
      dataIndex: 'tranferMethod',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.transfer.personalDataProtectionMeasures" />
      ),
      key: 'personalDataProtectionMeasures',
      dataIndex: 'personalDataProtectionMeasures',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.transfer.fileUrl" />
      ),
      key: 'fileUrl',
      dataIndex: 'fileUrl',
      width: 200,
      render: (fileUrl: string[]) => {
        return fileUrl?.map((value: string) => {
          const segments = value.split('/');
          const filename = segments[segments.length - 1];
          return (
            <Button
              type="link"
              key={value}
              href={value}
              target={'_blank'}
            >
              {filename.length > 10
                ? filename.substring(0, 7) +
                  '...' +
                  filename.substring(
                    filename.length - 5,
                    filename.length
                  )
                : filename}
            </Button>
          );
        });
      },
    },
  ];

  return (
    <>
      <Flex flexDirection="row" alignItems="baseline">
        <Typography.Title
          level={4}
          style={{ fontWeight: 'bold' }}
          className="mr-1"
        >
          <IntlMessage id="dataMapping.activity.preview.transfer.title" />
        </Typography.Title>
        <Typography.Text style={{ fontWeight: 'bold' }}>
          : {data?.isTranfer ? 'มี' : 'ไม่มี'}
        </Typography.Text>
      </Flex>
      {data?.isTranfer === true ? (
        <Table
          rowKey="tranferMethod"
          className="mb-4"
          columns={columns}
          scroll={{ x: 1280, y: 350 }}
          tableLayout="fixed"
          dataSource={data?.tranferData ?? []}
          pagination={false}
          bordered
        />
      ) : (
        <div className="mb-2"></div>
      )}
    </>
  );
};
