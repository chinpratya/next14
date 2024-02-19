import { Card, Col, Row, Space, Typography } from 'antd';

import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import { SpParagraph } from '@/components/share-components/sp-paragraph';
import { type RequestDetail } from '@/features/incident-management';
import { getColLayout } from '@/utils';

type IncidentBasicInfoProps = {
  data?: RequestDetail;
  currentState?: number;
};

export const IncidentBasicInfo = ({
  data,
}: IncidentBasicInfoProps) => {
  return (
    <Card title="รายละเอียด">
      <Row gutter={[16, 16]} className="flex-row">
        <Col {...getColLayout(8)}>
          <SpParagraph title="ชื่อแผนการตอบสนอง">
            <Typography.Text type="secondary">
              {data?.webfromName || ''}
            </Typography.Text>
          </SpParagraph>
        </Col>
        <Col {...getColLayout(8)}>
          <SpParagraph title="ระดับความรุนแรง">
            <Space>
              <ShowTagStatus
                status={data?.severity}
                items={[
                  {
                    label: 'สูง',
                    key: 'high',
                    color: '#ee4c3f',
                  },
                  {
                    label: 'ปานกลาง',
                    key: 'medium',
                    color: '#FFCA3A',
                  },
                  {
                    label: 'ต่ำ',
                    key: 'low',
                    color: '#06AED4',
                  },
                ]}
              />
            </Space>
          </SpParagraph>
        </Col>
        <Col {...getColLayout(8)}>
          <SpParagraph title="วันที่สร้าง">
            <ShowTagDate date={data?.createDt} />
          </SpParagraph>
        </Col>
        <Col {...getColLayout(8)}>
          <SpParagraph title="กลุ่มเหตุการณ์">
            <Typography.Text
              type="secondary"
              style={{
                textTransform: 'capitalize',
              }}
            >
              {data?.requestType?.event_cateogry.replace(
                /_/g,
                ' '
              ) || 'Physical Security'}
            </Typography.Text>
          </SpParagraph>
        </Col>
        <Col {...getColLayout(8)}>
          <SpParagraph title="กลุ่มย่อยของเหตุการณ์">
            <Typography.Text
              type="secondary"
              style={{
                textTransform: 'capitalize',
              }}
            >
              {data?.requestType?.sub_event_cateogry.replace(
                /_/g,
                ' '
              ) || 'Emergency Response'}
            </Typography.Text>
          </SpParagraph>
        </Col>
        <Col {...getColLayout(8)}>
          <SpParagraph title="ประเภทเหตุการณ์">
            <Typography.Text
              type="secondary"
              style={{
                textTransform: 'capitalize',
              }}
            >
              {data?.requestType?.event_cateogry_type.replace(
                /_/g,
                ' '
              ) || 'Intrusion'}
            </Typography.Text>
          </SpParagraph>
        </Col>
        <Col {...getColLayout(24)}>
          <SpParagraph title="รายละเอียด">
            <Typography.Text type="secondary">
              {data?.workflow}
            </Typography.Text>
          </SpParagraph>
        </Col>
        {/* ผู้เกี่ยวข้อง */}
        <Col {...getColLayout(24)}>
          <SpParagraph title="รายละเอียด">
            <Typography.Text type="secondary">
              {data?.approved}
            </Typography.Text>
          </SpParagraph>
        </Col>
      </Row>
    </Card>
  );
};
