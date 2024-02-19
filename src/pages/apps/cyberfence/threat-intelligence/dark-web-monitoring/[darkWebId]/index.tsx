import {
  DownOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Input,
  Row,
  Tag,
  Typography,
} from 'antd';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import {
  darkWebIncidentList,
  darkWebList,
} from '@/features/threat-intelligence';
import { getColLayout } from '@/utils';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const DarkWebDetailPage = () => {
  const router = useRouter();
  const [select, setSelect] = useState('incident-1');

  const darkWebId = router.query.darkWebId as string;

  const data =
    darkWebList.find(
      (item) => item.id === parseInt(darkWebId)
    ) ?? darkWebList[0];

  const onSelect = (id: string) => setSelect(id);

  return (
    <>
      <PageHeader
        onBack={router.back}
        title="Dark Web Incidents"
        subtitle={data.domain}
      />

      <Row gutter={[16, 16]}>
        <Col {...getColLayout([24, 24, 24, 8, 8, 8])}>
          <Card
            title="Dark Web News"
            extra={
              <Input.Search
                placeholder="Search For Alert Rules"
                enterButton
              />
            }
          >
            <Scrollbars
              autoHide
              style={{
                minHeight: '55vh',
                maxHeight: `55vh`,
              }}
            >
              <Flex direction="column">
                {data.incidents.map((item, index) => (
                  <Card
                    key={index}
                    onClick={() => onSelect(item.id)}
                    bodyStyle={{ padding: 12 }}
                    className={css`
                      cursor: pointer;

                      border: 2px solid #f1f4f7 !important;
                      border-right-color: ${select ===
                      item.id
                        ? '#3e79f7'
                        : '#f1f4f7'} !important;
                      transition: 0.3s;

                      &:hover {
                        box-shadow: rgba(
                            149,
                            157,
                            165,
                            0.2
                          )
                          0px 8px 24px;
                      }
                    `}
                  >
                    <Flex
                      align="center"
                      justify="space-between"
                    >
                      <Typography.Text strong>
                        {item.name}
                      </Typography.Text>
                      <div
                        className={css`
                          padding: 5px 12px;
                          border-radius: 20px;
                          color: #fff;
                          background-color: #3e79f7;
                        `}
                      >
                        {item.count}
                      </div>
                    </Flex>
                    <div
                      className={css`
                        margin-top: 3px;
                        padding: 2px 8px;
                        border: 1px solid #e6ebf1;
                        border-radius: 4px;
                        display: inline-block;
                      `}
                    >
                      {item.type}
                    </div>
                  </Card>
                ))}
              </Flex>
            </Scrollbars>
          </Card>
        </Col>
        <Col {...getColLayout([24, 24, 24, 16, 16, 16])}>
          <Card
            className={css`
              margin-bottom: 1px !important;
            `}
            bodyStyle={{ padding: '15px 20px' }}
          >
            <Flex align="center" justify="space-between">
              <Checkbox>Total 1500 Incidents</Checkbox>
              <Button>
                <Flex align="center" gap={3}>
                  <FilterOutlined />
                  <DownOutlined
                    style={{ color: 'rgb(208,212,215)' }}
                  />
                </Flex>
              </Button>
            </Flex>
          </Card>
          <div style={{ height: '80vh' }}>
            <Scrollbars
              autoHide
              style={{
                minHeight: '20vh',
                maxHeight: `80vh`,
              }}
            >
              <Flex direction="column">
                {darkWebIncidentList.map(
                  (item, index) => (
                    <Card
                      key={index}
                      bodyStyle={{
                        padding: '0px 0px 0px 20px',
                      }}
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        router.push(
                          `/apps/cyberfence/threat-intelligence/dark-web-monitoring/1/incident/id-23r-acsdtrt-z`
                        )
                      }
                    >
                      <Flex gap={12}>
                        <Checkbox
                          style={{ margin: '15px 0' }}
                        />

                        <Flex style={{ flexGrow: 1 }}>
                          <Flex
                            direction="column"
                            gap={4}
                            justify="center"
                            className={css`
                              flex-grow: 1;
                              padding: 15px 0;
                            `}
                          >
                            <Typography.Text strong>
                              <Tag color="blue">
                                {item.tag}
                              </Tag>

                              {item.title}
                            </Typography.Text>
                            <Flex gap={8} align="center">
                              <p
                                style={{
                                  marginBottom: 0,
                                }}
                              >
                                Tags / July 3, 2023 02:42
                                AM
                              </p>

                              <div
                                className={css`
                                  padding: 1px 8px;
                                  border-radius: 4px;
                                  border: 1px solid
                                    #e6ebf1;
                                `}
                              >
                                Network Scanner
                              </div>

                              <Tag
                                color={
                                  item.status === 'Fail'
                                    ? 'error'
                                    : item.status ===
                                      'In Progress'
                                    ? 'processing'
                                    : 'success'
                                }
                              >
                                {item.status}
                              </Tag>
                            </Flex>
                          </Flex>
                          <Flex
                            align="center"
                            justify="center"
                            direction="column"
                            className={css`
                              flex-grow: 1;
                              max-width: 200px;
                              min-width: 200px;
                              text-align: center;
                              border-left: 7px solid
                                ${item.serverity ===
                                'critical'
                                  ? '#FF6B72'
                                  : item.serverity ===
                                    'medium'
                                  ? '#FFC542'
                                  : '#0DD182'};
                              border-bottom-left-radius: 8px;
                              border-top-left-radius: 8px;
                              padding: 8px 0;
                            `}
                          >
                            <Typography.Text strong>
                              Events Matched
                            </Typography.Text>
                            <Flex
                              align="center"
                              justify="center"
                              className={css`
                                margin-top: 5px;
                                border: 1px solid #e6ebf1;
                                color: #386ddf;
                                background-color: #ebf1fe;
                                height: 33px;
                                padding: 0 12.5px;
                                border-radius: 20px;
                              `}
                            >
                              {item.matched}
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Card>
                  )
                )}
              </Flex>
            </Scrollbars>
          </div>
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
