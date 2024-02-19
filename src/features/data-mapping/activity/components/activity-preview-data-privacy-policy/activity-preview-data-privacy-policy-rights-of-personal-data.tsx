import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { IntlMessage } from '@utilComponents/intl-message';

import {
  ActivityPreview,
  PrivacyPolicyRightsOfPersonal,
} from '../../types';

type ActivityPreviewDataPrivacyPolicyRightsOfPersonalDataProps =
  {
    data?: ActivityPreview;
  };

export const ActivityPreviewDataPrivacyPolicyRightsOfPersonalData =
  ({
    data,
  }: ActivityPreviewDataPrivacyPolicyRightsOfPersonalDataProps) => {
    const checkStatus = (status: boolean) => {
      return status === true ? (
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

    const columns: ColumnsType<PrivacyPolicyRightsOfPersonal> =
      [
        {
          title: (
            <IntlMessage id="dataMapping.activity.preview.privacyPolicy.rightsOfPersonalData.index" />
          ),
          key: 'index',
          width: 50,
          render: (_, __, index) => index + 1,
        },
        {
          title: (
            <IntlMessage id="dataMapping.activity.preview.privacyPolicy.rightsOfPersonalData.name" />
          ),
          key: 'name',
          dataIndex: 'name',
          width: 200,
        },
        {
          key: 'isGrant',
          dataIndex: 'isGrant',
          width: 80,
          align: 'center',
          render: (isGrant) => checkStatus(isGrant),
        },
      ];

    return (
      <>
        <Typography.Title
          level={4}
          style={{ fontWeight: 'bold' }}
        >
          <IntlMessage id="dataMapping.activity.preview.privacyPolicy.rightsOfPersonalData.title" />
        </Typography.Title>
        <Table
          rowKey="id"
          columns={columns}
          scroll={{ x: 330, y: 550 }}
          tableLayout="fixed"
          dataSource={
            data?.privacyPolicy?.rightsOfPersonalData ??
            []
          }
          pagination={false}
          bordered
        />
      </>
    );
  };
