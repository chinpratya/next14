import { Row, Col, Card, Form, Input } from 'antd';

import { getColLayout } from '@/utils';

import { AnalysisInfoAttackList } from './analysis-info-attack-list';
import { AnalysisInfoAttackType } from './analysis-info-attack-type';
import { AnalysisInfoCountry } from './analysis-info-country';
import { AnalysisInfoDetail } from './analysis-info-detail';
import { AnalysisInfoOverview } from './analysis-info-overview';

export const AnalysisInfo = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col {...getColLayout(12)}>
        <Card title="ข้อมูลทั่วไป" className="h-100">
          <Form layout="vertical">
            <Form.Item
              name="name"
              label="ชื่อข่าว"
              initialValue="SSH Bruteforce IPs feed"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="รายละเอียด"
              initialValue="Description."
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Form>
        </Card>
      </Col>

      <Col {...getColLayout(12)}>
        <AnalysisInfoDetail />
      </Col>

      <Col {...getColLayout([24, 24, 24, 12, 12, 12])}>
        <AnalysisInfoAttackType />
      </Col>
      <Col {...getColLayout([24, 24, 24, 12, 12, 12])}>
        <AnalysisInfoCountry />
      </Col>
      <Col span={24}>
        <AnalysisInfoAttackList />
      </Col>
      <Col span={24}>
        <AnalysisInfoOverview />
      </Col>
    </Row>
  );
};
