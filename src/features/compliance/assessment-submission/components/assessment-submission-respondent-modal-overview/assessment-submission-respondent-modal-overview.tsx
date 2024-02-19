import { CalendarOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Collapse,
  Descriptions,
  Divider,
  Empty,
  List,
  Typography,
} from 'antd';
import dayjs from 'dayjs';

import { ShowPassTagDate } from '@components/show-pass-tag-date';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { IntlMessage } from '@utilComponents/intl-message';

import { AssessmentSubmissionRespondentDetail } from '../../types';

type AssessmentSubmissionRespondentModalOverviewProps = {
  data?: AssessmentSubmissionRespondentDetail;
};

const actionStatus: {
  [key: string]: Record<string, string>;
} = {
  extend_time: {
    label: 'ขยายเวลา',
    color: '#FF8B03',
  },
  change_approver: {
    label: 'เปลี่ยนผู้อนุมัติ',
    color: '#35BC73',
  },
  cancel: {
    label: 'ยกเลิกการประเมิน',
    color: '#FF6B72',
  },
};

export const AssessmentSubmissionRespondentModalOverview =
  ({
    data,
  }: AssessmentSubmissionRespondentModalOverviewProps) => {
    return (
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Collapse.Panel
          header={
            <IntlMessage id="compliance.assessmentSubmission.detail.respondent.detail.overview.detail" />
          }
          key="1"
        >
          <Divider className="mt-0" />
          <Descriptions
            layout="vertical"
            className={css`
              .ant-descriptions-item-label {
                font-weight: 700;
              }
            `}
          >
            <Descriptions.Item
              label={
                <IntlMessage id="compliance.assessmentSubmission.detail.respondent.name" />
              }
            >
              {data?.name}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="compliance.assessmentSubmission.detail.respondent.email" />
              }
            >
              {data?.email}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="compliance.assessmentSubmission.detail.respondent.status" />
              }
            >
              <ShowTagStatus
                items={[
                  {
                    label: 'แบบร่าง',
                    key: 'draft',
                    color: '#323A45',
                  },
                  {
                    label: 'รอส่ง',
                    key: 'waiting_send',
                    color: '#47B2FF',
                  },
                  {
                    label: 'รอดําเนินการ',
                    key: 'waiting_progress',
                    color: '#F0853E',
                  },
                  {
                    label: 'กําลังดําเนินการ',
                    key: 'in_progress',
                    color: '#FFC542',
                  },
                  {
                    label: 'กําลังดําเนินการ',
                    key: 'in_progress',
                    color: '#FFC542',
                  },
                  {
                    label: 'อนุมัติ',
                    key: 'approve',
                    color: '#407BFF',
                  },
                  {
                    label: 'ปฏิเสธ',
                    key: 'reject',
                    color: '#EC155B',
                  },
                  {
                    label: 'รออนุมัติ',
                    key: 'waiting_approve',
                    color: '#EF5DA8',
                  },
                  {
                    label: 'รอการแก้ไข',
                    key: 'waiting_update',
                    color: '#466D1E',
                  },
                  {
                    label: 'พร้อมส่ง',
                    key: 'ready_to_send',
                    color: '#A461D8',
                  },
                  {
                    label: 'เลยระยะเวลา',
                    key: 'overdue',
                    color: '#9E0E03',
                  },
                  {
                    label: 'ยกเลิก',
                    key: 'cancel',
                    color: '#EE0D0D',
                  },
                ]}
                status={data?.status}
              />
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="compliance.assessmentSubmission.detail.respondent.dueDate" />
              }
            >
              <ShowPassTagDate date={data?.dueDate} />
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="compliance.assessmentSubmission.detail.respondent.isExtendTime" />
              }
            >
              {data?.isExtendTime ? (
                <IntlMessage id="compliance.assessmentSubmission.detail.respondent.isExtendTime.true" />
              ) : (
                <IntlMessage id="compliance.assessmentSubmission.detail.respondent.isExtendTime.false" />
              )}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="compliance.assessmentSubmission.detail.respondent.startDt" />
              }
            >
              <ShowTagDate date={data?.startDt} />
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="compliance.assessmentSubmission.detail.respondent.sendDt" />
              }
            >
              <ShowTagDate date={data?.sendDt} />
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="compliance.assessmentSubmission.detail.respondent.submitDt" />
              }
            >
              <ShowTagDate date={data?.submitDt} />
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="compliance.assessmentSubmission.detail.respondent.endDt" />
              }
            >
              <ShowTagDate date={data?.endDt} />
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="compliance.assessmentSubmission.detail.respondent.approver" />
              }
            >
              {data?.approverName}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="compliance.assessmentSubmission.detail.respondent.approverEmail" />
              }
            >
              {data?.approverEmail}
            </Descriptions.Item>
          </Descriptions>
        </Collapse.Panel>

        <Collapse.Panel header="เหตุผล" key="2">
          <Divider className="m-0" />
          {!data?.reasons || data.reasons.length < 1 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={data?.reasons}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <>
                        <Typography.Text>
                          {item.name}
                        </Typography.Text>
                        <Typography.Text
                          className={css`
                            margin-left: 4px;
                            color: #32436b;
                          `}
                        >
                          ({item.email})
                        </Typography.Text>
                      </>
                    }
                    description={
                      <Flex
                        direction="column"
                        className={css`
                          margin-top: 10px;
                          color: #586670;
                          max-width: 80% !important;
                        `}
                      >
                        <Typography.Paragraph className="mb-0 d-flex align-items-center">
                          <CalendarOutlined
                            className={css`
                              margin-right: 6px;
                              margin-bottom: 2px;
                            `}
                          />
                          {dayjs(item.createdDt).format(
                            'DD-MM-YYYY HH:mm:ss'
                          )}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                          {item.message}
                        </Typography.Paragraph>
                      </Flex>
                    }
                  />
                  {actionStatus[
                    item.action as string
                  ] && (
                    <Typography.Text
                      style={{
                        color:
                          actionStatus[
                            item.action as string
                          ].color,
                      }}
                    >
                      {
                        actionStatus[
                          item.action as string
                        ]?.label
                      }
                    </Typography.Text>
                  )}
                </List.Item>
              )}
            />
          )}
        </Collapse.Panel>
      </Collapse>
    );
  };
