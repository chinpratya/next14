import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { IntlMessage } from '@utilComponents/intl-message';

import { ActivityPreview, Purposes } from '../../types';

type ActivityPreviewDataPurposeProps = {
  data?: ActivityPreview;
};

export const ActivityPreviewDataPurpose = ({
  data,
}: ActivityPreviewDataPurposeProps) => {
  const checkStatus = (status: boolean) => {
    return status ? (
      <CheckCircleOutlined
        className={css`
          font-size: 2rem;
          color: green;
        `}
      />
    ) : (
      <CloseCircleOutlined
        className={css`
          font-size: 2rem;
          color: red;
        `}
      />
    );
  };

  const columns: ColumnsType<Purposes> = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.purpose.index" />
      ),
      key: 'index',
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.purpose.name" />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.purpose.time" />
      ),
      key: 'DataRetentionPeriod',
      dataIndex: 'DataRetentionPeriod',
      width: 200,
      render: (dataUsagePeriod) => {
        const label = (
          <>
            {dataUsagePeriod?.day > 0 ? (
              <span>
                {`${dataUsagePeriod?.day}`}
                <IntlMessage id="dataMapping.activity.preview.purpose.time.day" />
              </span>
            ) : null}
            {dataUsagePeriod?.month > 0 ? (
              <span>
                {`${dataUsagePeriod?.month}`}
                <IntlMessage id="dataMapping.activity.preview.purpose.time.month" />
              </span>
            ) : null}
            {dataUsagePeriod?.year > 0 ? (
              <span>
                {`${dataUsagePeriod?.year}`}
                <IntlMessage id="dataMapping.activity.preview.purpose.time.year" />
              </span>
            ) : null}
            {dataUsagePeriod?.day === 0 &&
            dataUsagePeriod?.month === 0 &&
            dataUsagePeriod?.year === 0
              ? dataUsagePeriod?.description
              : null}
          </>
        );

        return label;
      },
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.purpose.DataUsingPeriod" />
      ),
      key: 'DataUsingPeriod',
      dataIndex: 'DataUsingPeriod',
      width: 200,
      render: (dataUsagePeriod) => {
        const label = (
          <>
            {dataUsagePeriod?.day > 0 ? (
              <span>
                {`${dataUsagePeriod?.day}`}
                <IntlMessage id="dataMapping.activity.preview.purpose.DataUsingPeriod.day" />
              </span>
            ) : null}
            {dataUsagePeriod?.month > 0 ? (
              <span>
                {`${dataUsagePeriod?.month}`}
                <IntlMessage id="dataMapping.activity.preview.purpose.DataUsingPeriod.month" />
              </span>
            ) : null}
            {dataUsagePeriod?.year > 0 ? (
              <span>
                {`${dataUsagePeriod?.year}`}
                <IntlMessage id="dataMapping.activity.preview.purpose.DataUsingPeriod.year" />
              </span>
            ) : null}
            {dataUsagePeriod?.day === 0 &&
            dataUsagePeriod?.month === 0 &&
            dataUsagePeriod?.year === 0
              ? dataUsagePeriod?.description
              : null}
          </>
        );

        return label;
      },
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.purpose.legalBasis" />
      ),
      key: 'legalBasis',
      dataIndex: 'legalBasis',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.purpose.dataRetention" />
      ),
      key: 'dataRetention',
      dataIndex: 'dataRetention',
      width: 300,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.purpose.consent" />
      ),
      children: [
        {
          title: (
            <IntlMessage id="dataMapping.activity.preview.purpose.consent.isConsent" />
          ),
          dataIndex: ['consent', 'isConsent'],
          key: 'isConsent',
          width: 150,
          align: 'center',
          render: (isConsent) => checkStatus(isConsent),
        },
      ],
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.purpose.transfer" />
      ),
      key: 'isTransfer',
      dataIndex: 'isTransfer',
      width: 300,
      align: 'center',
      render: (tranfer) => checkStatus(tranfer),
    },
  ];

  return (
    <>
      <Typography.Title
        level={4}
        style={{ fontWeight: 'bold' }}
      >
        <IntlMessage id="dataMapping.activity.preview.purpose.title" />
      </Typography.Title>
      <Table
        className="mb-4"
        rowKey="_id"
        columns={columns}
        scroll={{ x: 1280, y: 522 }}
        tableLayout="fixed"
        dataSource={data?.purposes ?? []}
        pagination={false}
        bordered
      />
    </>
  );
};
