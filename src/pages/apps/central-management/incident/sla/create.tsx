import {
  Card,
  Typography,
  Button,
  Row,
  Col,
  Form,
  Input,
  Divider,
} from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { PageHeader } from '@/components/share-components/page-header';
import { FallbackError } from '@/components/util-components/fallback-error';
import { SlaBasicInfoForm } from '@/features/incident-management';
import { SlaSeverityTable } from '@/features/incident-management';
import { useServerityList } from '@/features/incident-management/workflow/api/get-serverity-list';
import { AppLayout } from '@/layouts';
import validation from '@/utils/validation';
import { css } from '@emotion/css';

const SlaCreatePage = () => {
  const router = useRouter();
  const { data } = useServerityList({});

  return (
    <FallbackError isError={false}>
      <PageHeader
        onBack={router.back}
        title={'SERVICE LEVEL AGREEMENT (SLA) CREATE'}
      />

      <Card
        title="รายละเอียด"
        bordered
        className={css`
          .ant-card-head {
            padding-bottom: 10px;
          }
          ,
          .ant-card-head {
            border-bottom: 1px solid #e6ebf1;
          }
        `}
      >
        <SlaBasicInfoForm
          slaData={data}
          setEdittable={true}
          setErrorState={() => {}}
          setEditState={() => {}}
        >
          <div
            style={{
              paddingTop: '10px',
            }}
          >
            <Typography.Title level={2}>
              ตั้งค่าระยะเวลาข้อตกลงระดับการให้บริการ
              (SLA)
            </Typography.Title>
            <Typography.Title level={5} type="secondary">
              <Form.Item
                label="คำอธิบาย"
                name={'detail'}
                rules={[
                  validation.required(
                    'กรุณากรอกคำอธิบาย'
                  ),
                ]}
              >
                <Input.TextArea placeholder="คำอธิบาย" />
              </Form.Item>
            </Typography.Title>
          </div>
          <SlaSeverityTable editable={true} data={data} />
          <Row style={{ padding: 0 }}>
            <Col
              span={24}
              style={{
                textAlign: 'right',
                paddingTop: '16px',
              }}
            >
              <Button
                style={{
                  margin: '16px',
                }}
                onClick={router.back}
              >
                ยกเลิก
              </Button>
              <Button type="primary" htmlType="submit">
                บันทึก
              </Button>
            </Col>
          </Row>
        </SlaBasicInfoForm>
      </Card>
    </FallbackError>
  );
};

SlaCreatePage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default SlaCreatePage;
