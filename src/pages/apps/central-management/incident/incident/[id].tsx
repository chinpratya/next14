// import { DownloadOutlined } from '@ant-design/icons';
import { Form, Row, Col, Tabs, Typography } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

// import { IntlMessage } from '@/components/util-components/intl-message';
import {
  RequestBasicInfo,
  useGetRequest,
  RequestDetailChangeStatus,
  RequestDetailReply,
  RequestDetailTab,
  IncidentBasicInfo,
  IncidentExpireCountdownTime,
  IncidentProgressChart,
  // IncidentStatusChart,
} from '@/features/incident-management';
import { AppLayout } from '@/layouts';
import { getColLayout } from '@/utils';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';

import { listRequest } from '../../../../../features/incident-management/incident-smart-city/api/list-request';
import { RequestResponse } from '../../../../../features/incident-management/incident-smart-city/types';
import { useGetProfile } from '../../../../../features/profile/api/getProfile';
// listRequest
const IncidentDetailPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { data: userdata } = useGetProfile();
  const { data, isLoading } = useGetRequest(
    router.query.id as string,
    userdata?.id as string
  );
  const [name, setName] = useState<string>('');
  useEffect(() => {
    const data: Promise<RequestResponse> = listRequest(
      {}
    );
    data.then((response: RequestResponse) => {
      // console.log(response);
      const name = response?.data.filter(
        (data) =>
          data.requestID === (router.query.id as string)
      );
      setName(name[0].name);
    });
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form, router.query.id]);
  if (isLoading) {
    return <Loading cover="content" />;
  }

  return (
    <>
      <PageHeader
        onBack={router.back}
        title={
          // <IntlMessage id="incidentManagement.incident.detail.title" />
          <Typography>{name}</Typography>
        }
        subtitle={data?.requestID}
        // extra={
        // <Button icon={<DownloadOutlined />}>
        //   ส่งออกรายงาน
        // </Button>
        // }
        overlap
      />
      <Tabs
        defaultActiveKey="detail"
        items={[
          {
            label: 'รายละเอียด',
            key: 'detail',
            children: (
              <>
                <Row gutter={[16, 16]}>
                  <Col {...getColLayout(16)}>
                    <IncidentBasicInfo data={data} />
                    <RequestDetailTab data={data} />
                  </Col>
                  <Col {...getColLayout(8)}>
                    {/* {data?.limitExtraDt !== '' ?? (
                      <>
                        
                      </>
                    )} */}
                    {data?.limitExtraDt ? (
                      <>
                        <IncidentExpireCountdownTime
                          data={data}
                        />
                      </>
                    ) : null}

                    <RequestDetailChangeStatus
                      data={data}
                      requestId={
                        data?.requestID as string
                      }
                    />
                    <IncidentProgressChart
                      requestId={
                        data?.requestID as string
                      }
                      stateId={userdata?.id as string}
                    />
                    {/* pie chart */}
                    {/* <IncidentStatusChart /> */}
                    {/* form */}
                    <RequestDetailReply
                      requestId={
                        data?.requestID as string
                      }
                    />
                  </Col>
                </Row>
              </>
            ),
          },
          {
            label: 'ข้อมูล',
            key: 'basic-info',
            children: (
              <RequestBasicInfo form={form} data={data} />
            ),
          },
        ]}
      />
    </>
  );
};

IncidentDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default IncidentDetailPage;
