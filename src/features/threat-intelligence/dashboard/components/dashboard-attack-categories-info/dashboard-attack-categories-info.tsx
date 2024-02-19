import { Card, Col, Row } from 'antd';

import { color } from '../../../shared';

import { DashboardAttackCategoriesInfoItem } from './dashboard-attack-categories-info-item';
import data from './mock-data.json';

export const DashboardAttackCategoriesInfo = () => {
  return (
    <Card
      title="Top Attack Categories (1 Months)"
      className="h-100"
    >
      <Row gutter={[16, 16]}>
        {data.map((item, index) => (
          <Col span={12} key={index}>
            <DashboardAttackCategoriesInfoItem
              color={color.list[index]}
              {...item}
            />
          </Col>
        ))}
      </Row>
    </Card>
  );
};
