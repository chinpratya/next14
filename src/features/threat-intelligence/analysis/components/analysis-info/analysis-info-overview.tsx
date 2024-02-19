import { css } from '@emotion/css';
import {
  Card,
  Col,
  Descriptions,
  Row,
  Tag,
  Typography,
} from 'antd';

export const AnalysisInfoOverview = () => {
  return (
    <Card title="ภาพรวมการวิเคราะห์">
      <Descriptions
        column={2}
        layout="vertical"
        className={css`
          .ant-descriptions-item {
            padding-bottom: 11px;
          }
        `}
      >
        <Descriptions.Item
          label={
            <Typography.Title
              level={4}
              className="mb-0 font-weight-bold"
            >
              ตรวจพบข่าวสารที่มีการโจมตีประเภท
            </Typography.Title>
          }
        >
          <Row gutter={[16, 0]}>
            {[
              'SSH',
              'Honeypot',
              'Brute-Force',
              'Password Attack',
            ].map((item) => (
              <Col span={9} key={item}>
                <Tag>{item}</Tag>
              </Col>
            ))}
          </Row>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <Typography.Title
              level={4}
              className="mb-0 font-weight-bold"
            >
              ระดับความเสี่ยง
            </Typography.Title>
          }
        >
          <Tag>ต่ำ</Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <Typography.Title
              level={4}
              className="mb-0 font-weight-bold d-block mt-3"
            >
              แนะนำการป้องกัน
            </Typography.Title>
          }
        >
          <ul style={{ paddingLeft: 20 }}>
            <li>
              <Typography.Text>
                ทำการเปลี่ยนรหัสผ่านของผู้ใช้งาน
              </Typography.Text>
            </li>
            <li>
              <Typography.Text>
                ทำการกำหนด
                <span className="font-weight-bold mx-1">
                  Policy
                </span>
                ที่เกี่ยวข้องกับการ
                <span className="font-weight-bold mx-1">
                  Login Failed
                </span>
                เช่น
                <span className="font-weight-bold mx-1">
                  Login Failed 3
                </span>
                ครั้งทำการล็อคไม่ให้ใส่รหัสผ่าน 5 นาที
              </Typography.Text>
            </li>
            <li>
              <Typography.Text>
                ทำการ
                <span className="font-weight-bold mx-1">
                  Block IP address
                </span>
                ผ่าน
                <span className="font-weight-bold mx-1">
                  Firewall
                </span>
                หรือ
                <span className="font-weight-bold mx-1">
                  IPS/IDS
                </span>
              </Typography.Text>
            </li>
          </ul>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
