import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';

import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  ActivityPreview,
  PrivacyPolicyPurpose,
} from '../../types';

type ActivityPreviewDataPrivacyPolicyStorageProps = {
  data?: ActivityPreview;
};

export const ActivityPreviewDataPrivacyPolicyStorage = ({
  data,
}: ActivityPreviewDataPrivacyPolicyStorageProps) => {
  const columns: ColumnsType<PrivacyPolicyPurpose> = [
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.privacyPolicy.storage.index" />
      ),
      key: 'index',
      width: 50,
      render: (_, __, index) => index + 1,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.privacyPolicy.storage.name" />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.activity.preview.privacyPolicy.storage.purpose" />
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
        <IntlMessage id="dataMapping.activity.preview.privacyPolicy.storage.title" />
      </Typography.Title>
      <Table
        rowKey="id"
        className="mb-4"
        columns={columns}
        scroll={{ x: 450, y: 270 }}
        tableLayout="fixed"
        dataSource={data?.privacyPolicy?.storage ?? []}
        pagination={false}
        bordered
      />
    </>
  );
};
