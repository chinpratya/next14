import { CalendarOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Divider,
  Descriptions,
  Typography,
  Collapse,
  Col,
  Empty,
  Card,
} from 'antd';

import { ShowPassTagDate } from '@components/show-pass-tag-date';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetAssessmentRespondentDetail } from '../../api/get-assessment-respondents-detail';
import { STATUS_ITEMS } from '../../config/status';

const { Panel } = Collapse;

type RespondentDetailProps = {
  assessmentId: string;
  respondentId: string;
};

export const RespondentDetail = ({
  assessmentId,
  respondentId,
}: RespondentDetailProps) => {
  const { data, isLoading } =
    useGetAssessmentRespondentDetail(
      assessmentId,
      respondentId
    );

  return (
    <Card loading={isLoading} bordered={false}>
      <Typography.Title level={4}>
        <IntlMessage id="compliancePortal.result.detail.respondent.detail" />
      </Typography.Title>
      <Divider />
      <Descriptions
        layout="vertical"
        labelStyle={{ fontWeight: 'bold' }}
        className={css`
          margin: 20px 0;
        `}
      >
        <Descriptions.Item
          label={
            <IntlMessage id="compliancePortal.result.detail.respondent.name" />
          }
        >
          {data?.data?.name}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="compliancePortal.result.detail.respondent.email" />
          }
        >
          {data?.data?.email}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="compliancePortal.result.detail.respondent.status" />
          }
        >
          <ShowTagStatus
            status={data?.data?.status}
            items={STATUS_ITEMS}
          />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="compliancePortal.result.detail.respondent.deadlineDt" />
          }
        >
          <ShowPassTagDate
            date={data?.data?.deadlineDt}
          />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="compliancePortal.result.detail.respondent.isExtend" />
          }
        >
          {data?.data?.isExtend ? (
            <IntlMessage id="compliancePortal.result.detail.respondent.isExtend.true" />
          ) : (
            <IntlMessage id="compliancePortal.result.detail.respondent.isExtend.false" />
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="compliancePortal.result.detail.respondent.startDt" />
          }
        >
          <ShowTagDate date={data?.data?.startDt} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="compliancePortal.result.detail.respondent.sendDt" />
          }
        >
          <ShowTagDate date={data?.data?.sendDt} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="compliancePortal.result.detail.respondent.submitDt" />
          }
        >
          <ShowTagDate date={data?.data?.submitDt} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="compliancePortal.result.detail.respondent.endDt" />
          }
        >
          <ShowTagDate date={data?.data?.deadlineDt} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="compliancePortal.result.detail.respondent.approverName" />
          }
        >
          {data?.data?.approverName}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="compliancePortal.result.detail.respondent.approverEmail" />
          }
        >
          {data?.data?.approverEmail}
        </Descriptions.Item>
      </Descriptions>
      <Collapse ghost>
        <Panel
          header={
            <Typography.Title level={4}>
              <IntlMessage id="compliancePortal.result.detail.respondent.reason" />
            </Typography.Title>
          }
          key={1}
        >
          {data?.data.reasons &&
          data.data.reasons.length > 0 ? (
            data.data.reasons.map((value, index) => {
              return (
                <Col key={index}>
                  <Divider />

                  <Typography.Title level={4}>
                    {`${value.name} (${value.email})`}
                  </Typography.Title>
                  <Flex
                    justify="space-between"
                    align="center"
                  >
                    <Col>
                      <Flex
                        justify="start"
                        align="center"
                      >
                        <CalendarOutlined />
                        <Typography.Text
                          className={css`
                            margin-left: 10px;
                          `}
                        >
                          {value.createdDt}
                        </Typography.Text>
                      </Flex>
                      <Typography.Paragraph
                        className={css`
                          margin: 10px 0;
                        `}
                      >
                        {value.message}
                      </Typography.Paragraph>
                    </Col>
                    <Typography.Text>
                      {value.action}
                    </Typography.Text>
                  </Flex>
                </Col>
              );
            })
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Panel>
      </Collapse>
    </Card>
  );
};
