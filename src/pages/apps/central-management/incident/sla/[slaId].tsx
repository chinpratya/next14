import {
  Card,
  Typography,
  Button,
  Row,
  Col,
  Divider,
} from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { PageHeader } from '@/components/share-components/page-header';
import { FallbackError } from '@/components/util-components/fallback-error';
import { SlaBasicInfoForm } from '@/features/incident-management';
import { SlaSeverityTable } from '@/features/incident-management';
import { useGetSlaDetail } from '@/features/incident-management/sla/api/get-sla-detail';
import { AppLayout } from '@/layouts';
import { css } from '@emotion/css';

const SlaCreatePage = () => {
  const router = useRouter();
  const { slaId } = router?.query;
  const { data, isLoading } = useGetSlaDetail(
    slaId as string
  );
  const [editState, setEditState] =
    useState<boolean>(false);
  const [errorState, setErrorState] = useState('');

  return (
    <FallbackError isError={false}>
      <PageHeader
        onBack={() =>
          router.push(
            `${router.pathname.split('/[slaId]')[0]}`
          )
        }
        title={'SERVICE LEVEL AGREEMENT (SLA) Details'}
      />
      <Card
        title="รายละเอียด"
        extra={
          <>
            {editState === false ? (
              <Button
                onClick={() => setEditState(true)}
                type="primary"
              >
                แก้ไข
              </Button>
            ) : null}
          </>
        }
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
          defalutData={data}
          isLoading={isLoading}
          slaData={data}
          setEdittable={editState}
          setErrorState={setErrorState}
          setEditState={setEditState}
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
          </div>
          <SlaSeverityTable
            editable={editState}
            detailData={data}
          />
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
                onClick={() =>
                  router.push(
                    `${
                      router.pathname.split('/[slaId]')[0]
                    }`
                  )
                }
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
