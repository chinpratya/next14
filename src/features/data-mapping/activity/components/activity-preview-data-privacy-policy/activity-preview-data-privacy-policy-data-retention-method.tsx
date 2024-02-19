import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';

import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  ActivityPreview,
  PrivacyPolicyPurpose,
} from '../../types';

type ActivityPreviewDataPrivacyPolicyDataRetentionMethodProps =
  {
    data?: ActivityPreview;
  };

export const ActivityPreviewDataPrivacyPolicyDataRetentionMethod =
  ({
    data,
  }: ActivityPreviewDataPrivacyPolicyDataRetentionMethodProps) => {
    const columns: ColumnsType<PrivacyPolicyPurpose> = [
      {
        title: (
          <IntlMessage id="dataMapping.activity.preview.privacyPolicy.purpose.index" />
        ),
        key: 'index',
        width: 50,
        render: (_, __, index) => index + 1,
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.preview.privacyPolicy.purpose.name" />
        ),
        key: 'name',
        dataIndex: 'name',
        width: 200,
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.preview.privacyPolicy.purpose.purpose" />
        ),
        key: 'purposes',
        dataIndex: 'purposes',
        width: 200,
        render: (purposes: string[]) =>
          _.map(purposes, (purpose, index) => (
            <Flex key={index}>
              {`${index + 1}.`}
              {purpose}
            </Flex>
          )),
      },
    ];

    return (
      <>
        <Typography.Title
          level={4}
          style={{ fontWeight: 'bold' }}
        >
          <IntlMessage id="dataMapping.activity.preview.privacyPolicy.purpose.title" />
        </Typography.Title>
        <Table
          className="mb-4"
          rowKey="id"
          columns={columns}
          scroll={{ x: 450, y: 270 }}
          tableLayout="fixed"
          dataSource={
            data?.privacyPolicy?.dataRetentionMethod ?? []
          }
          pagination={false}
          bordered
        />
      </>
    );
  };
