import { css } from '@emotion/css';
import { Card, Typography } from 'antd';

import data from './mock-data.json';

export const AnalysisCategory = () => {
  return (
    <Card title="หมวดหมู่">
      {data.map((item) => (
        <Card
          key={item.id}
          bodyStyle={{ padding: 14 }}
          className={css`
            margin-bottom: 8px;
            cursor: pointer;
            transition: 0.3s;

            &:hover {
              transform: translateY(-3%);
            }
          `}
        >
          <Typography.Text className="d-block font-weight-semibold">
            {item.name}
          </Typography.Text>
          <Typography.Text style={{ color: '#72849A' }}>
            {item.follower} ผู้ติดตาม
          </Typography.Text>
        </Card>
      ))}
    </Card>
  );
};
