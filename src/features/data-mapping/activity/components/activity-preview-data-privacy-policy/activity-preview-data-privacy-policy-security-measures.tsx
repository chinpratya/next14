import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { IntlMessage } from '@utilComponents/intl-message';

import {
  ActivityPreview,
  PrivacyPolicySecurityMeasures,
} from '../../types';

type ActivityPreviewDataPrivacyPolicySecurityMeasuresProps =
  {
    data?: ActivityPreview;
  };

export const ActivityPreviewDataPrivacyPolicySecurityMeasures =
  ({
    data,
  }: ActivityPreviewDataPrivacyPolicySecurityMeasuresProps) => {
    const columns: ColumnsType<PrivacyPolicySecurityMeasures> =
      [
        {
          title: (
            <IntlMessage id="dataMapping.activity.preview.privacyPolicy.securityMeasures.index" />
          ),
          key: 'index',
          width: 50,
          render: (_, __, index) => index + 1,
        },
        {
          title: (
            <IntlMessage id="dataMapping.activity.preview.privacyPolicy.securityMeasures.name" />
          ),
          key: 'name',
          dataIndex: 'name',
          width: 200,
        },
        {
          title: (
            <IntlMessage id="dataMapping.activity.preview.privacyPolicy.securityMeasures.management" />
          ),
          key: 'management',
          dataIndex: 'management',
          width: 200,
        },
        {
          title: (
            <IntlMessage id="dataMapping.activity.preview.privacyPolicy.securityMeasures.technical" />
          ),
          key: 'technical',
          dataIndex: 'technical',
          width: 200,
        },
        {
          title: (
            <IntlMessage id="dataMapping.activity.preview.privacyPolicy.securityMeasures.physical" />
          ),
          key: 'physical',
          dataIndex: 'physical',
          width: 200,
        },
      ];

    return (
      <>
        <Typography.Title
          level={4}
          style={{ fontWeight: 'bold' }}
        >
          <IntlMessage id="dataMapping.activity.preview.privacyPolicy.securityMeasures.title" />
        </Typography.Title>
        <Table
          className="mb-4"
          rowKey="id"
          columns={columns}
          scroll={{ x: 450, y: 270 }}
          tableLayout="fixed"
          dataSource={
            data?.privacyPolicy
              ?.securityMeasuresUnderSection37 ?? []
          }
          pagination={false}
          bordered
        />
      </>
    );
  };
