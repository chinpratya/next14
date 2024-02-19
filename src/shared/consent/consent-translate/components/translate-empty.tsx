import { Empty, Typography } from 'antd';

import { IntlMessage } from '@utilComponents/intl-message';

export const TranslateEmpty = () => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    className="p-4"
    description={
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginTop: '20px',
          height: '60px',
        }}
      >
        <Typography.Title
          level={4}
          className="text-gray-lighter"
        >
          <IntlMessage id="consentManagement.collectionPoint.translate.noData" />
        </Typography.Title>
        <Typography.Text className="text-gray-lighter">
          <IntlMessage id="consentManagement.collectionPoint.translate.noData.desc" />
        </Typography.Text>
      </div>
    }
  />
);
