import {
  CommentOutlined,
  EnterOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Avatar,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Popover,
  Row,
  Select,
  Steps,
  StepsProps,
  Table,
  Tag,
  Typography,
} from 'antd';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const customDot: StepsProps['progressDot'] = (dot) => (
  <Popover content={<></>}>{dot}</Popover>
);

const DarkWebDetailPage = () => {
  const router = useRouter();

  return (
    <>
      <PageHeader
        onBack={router.back}
        title="Dark Web Incidents"
        subtitle="XVA-12345 | CloudSEK Test Alert Rule - 6690"
      />

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card
            title="Alert Rule Detail"
            className="h-100"
          >
            <Form layout="vertical">
              <Form.Item
                name="name"
                label="Alert Name"
                initialValue="CloudSEK Test Alert Rule"
              >
                <Input readOnly />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                initialValue="Test Alert Rule"
              >
                <Input.TextArea readOnly rows={3} />
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12} style={{ marginBottom: 0 }}>
          <Card>
            <Form>
              <Flex gap={8}>
                <Form.Item
                  name="priority"
                  label="Priority"
                  className="w-100"
                  style={{ marginBottom: 0 }}
                >
                  <Select
                    options={[]}
                    placeholder="Po1"
                  />
                </Form.Item>
                <Form.Item
                  name="status"
                  label="Status"
                  className="w-100"
                  style={{ marginBottom: 0 }}
                >
                  <Select
                    options={[]}
                    placeholder="Open"
                  />
                </Form.Item>
                <Form.Item
                  name="assignee"
                  label="Assignee"
                  className="w-100"
                  style={{ marginBottom: 0 }}
                >
                  <Select
                    options={[]}
                    placeholder="Unassigned"
                  />
                </Form.Item>
              </Flex>
            </Form>
          </Card>
          <Card title="Incident Detail" className="mb-0">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Flex direction="column" gap={12}>
                  <Flex align="center">
                    <Typography.Text>
                      Incident ID :{' '}
                      <Tag color="blue">XVA-12345</Tag>
                    </Typography.Text>
                  </Flex>
                  <Typography.Text>
                    Incident Marked Date :{' '}
                    <ShowTagDate date="2023-12-13T07:59:10.05Z" />
                  </Typography.Text>
                  <Typography.Text>
                    Incident Added By :{' '}
                    <Tag>Alert Rule Match</Tag>
                  </Typography.Text>
                  <Typography.Text>
                    Incident Age : 85d 10h
                  </Typography.Text>
                  <Typography.Text>
                    Matched Assets :{' '}
                    <Tag>27.123.223.225</Tag>
                    <Tag>kemlu.go.id</Tag>
                  </Typography.Text>
                </Flex>
              </Col>
              <Col span={12}>
                <Flex direction="column" gap={12}>
                  <Typography.Text>
                    Module : <Tag>Network Scanner</Tag>
                  </Typography.Text>
                  <Typography.Text>
                    Last Updated On :{' '}
                    <ShowTagDate date="2023-12-13T07:59:10.05Z" />
                  </Typography.Text>
                </Flex>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Incidents">
            <Table
              rowKey="id"
              dataSource={[
                {
                  id: 1,
                  name: '27.123.223.225, kemlu.go.id, idtoasean.kemlu.go.id',
                  subdomains: 'idtoasean.kemlu.go.id',
                  date: '2023-12-13T07:59:10.05Z',
                },
                {
                  id: 2,
                  name: '27.123.223.224, kemlu.go.id, idtoasean.kemlu.go.id',
                  subdomains: 'idtoasean.kemlu.go.id',
                  date: '2023-12-13T07:59:10.05Z',
                },
              ]}
              columns={[
                {
                  title: 'Event Summary',
                  dataIndex: 'name',
                  render: (name: string) => (
                    <Flex align="center" gap={6}>
                      <span
                        className={css`
                          display: block;
                          width: 6px;
                          height: 6px;
                          border-radius: 50%;
                          background-color: #0dd182;
                        `}
                      />
                      <Typography.Text>
                        {name}
                      </Typography.Text>
                    </Flex>
                  ),
                },
                {
                  title: 'Subdomains',
                  dataIndex: 'subdomains',
                },
                {
                  key: 'addedOn',
                  title: 'Added On',
                  dataIndex: 'date',
                  align: 'center',
                  render: (date) => (
                    <ShowTagDate date={date} />
                  ),
                },
                {
                  key: 'action',
                  title: 'Action',
                  align: 'center',
                  width: 100,
                  fixed: 'right',
                  render: () => (
                    <DropdownTable items={[]} />
                  ),
                },
              ]}
              pagination={false}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Activity And Comments">
            <Steps
              current={0}
              progressDot={customDot}
              className={css`
                .ant-steps-item-title {
                  width: 160px;
                }
              `}
              items={[
                {
                  title: 'Incident Opened',
                  description: (
                    <ShowTagDate date="2023-12-13T07:59:10.05Z" />
                  ),
                },
                {
                  title: 'Assignee Changed On',
                  description: 'Not Assigned',
                },
                {
                  title: 'Resolved On',
                  description: 'Not Resolved',
                },
              ]}
            />
            <Divider />

            <Flex
              align="center"
              gap={6}
              style={{ marginBottom: 24 }}
            >
              <CommentOutlined style={{ fontSize: 20 }} />
              <Typography.Text strong>
                Comment (1)
              </Typography.Text>
            </Flex>
            <Flex gap={12}>
              <Avatar size={32} icon={<UserOutlined />} />
              <div
                className={css`
                  flex-grow: 1;
                  background-color: #fafafb;
                  border-radius: 8px;
                  padding: 8px;
                `}
              >
                <Flex gap={8}>
                  <Typography.Text>
                    Carolyn Hanson
                  </Typography.Text>
                  <span
                    className={css`
                      display: block;
                      width: 2px;
                      background-color: #e6ebf1;
                    `}
                  />
                  <Typography.Text>
                    20 Jan 2023
                  </Typography.Text>
                </Flex>
                <p
                  style={{
                    marginTop: '4px',
                    marginBottom: 0,
                  }}
                >
                  viewed this incident
                </p>
              </div>
            </Flex>
            <Flex gap={12} style={{ marginTop: 12 }}>
              <Avatar size={32} icon={<UserOutlined />} />
              <Input
                className="w-100"
                placeholder="Comment"
                suffix={<EnterOutlined />}
              />
            </Flex>
          </Card>
        </Col>
      </Row>
    </>
  );
};

DarkWebDetailPage.getLayout = function getLayout(
  page: ReactElement
) {
  return <AppLayout>{page}</AppLayout>;
};

export default DarkWebDetailPage;
