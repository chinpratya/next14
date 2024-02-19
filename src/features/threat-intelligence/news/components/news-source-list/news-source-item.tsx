import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Card, Col, Row, Typography } from 'antd';

import { formatNumber, getColLayout } from '@/utils';

import { color } from '../../../shared';

import { NewsSourceFollowButton } from './news-source-follow-button';

type NewsSourceItemProps = {
  id: number;
  title: string;
  subTitle: string;
  follower: number;
  articlePerMonth: number;
  tag: string[];
};

export const NewsSourceItem = ({
  id,
  articlePerMonth,
  follower,
  subTitle,
  tag,
  title,
}: NewsSourceItemProps) => {
  return (
    <Card>
      <Flex align="center" justify="space-between">
        <Flex gap={16}>
          <span
            className={css`
              width: 40px;
              height: 40px;
              border-radius: 5px;
              background-color: ${color.list[id - 1]};
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 22px;
            `}
          >
            {title[0]}
          </span>

          <Flex direction="column">
            <Typography.Text className="font-weight-semibold">
              {title}
            </Typography.Text>
            <Typography.Text style={{ color: '#72849A' }}>
              {subTitle}
            </Typography.Text>
          </Flex>
        </Flex>

        <NewsSourceFollowButton />
      </Flex>

      <Flex
        direction="column"
        style={{
          paddingLeft: 56,
          marginTop: 17,
          color: '#72849A',
        }}
      >
        <Typography.Text style={{ color: '#72849A' }}>
          Practical Tips for Productive Living
        </Typography.Text>
        <ul className="pl-3">
          <li>
            10 Daily Habits that Often Drain 90 Percent of
            Our Joy
          </li>
          <li>
            20 Things You Need to Stop Wasting Your Time
            On
          </li>
          <li>
            30 Regrets You Don’t Want to Have in 30 Years
          </li>
        </ul>
      </Flex>

      <Row
        gutter={[16, 16]}
        className={css`
          margin-top: 8px;
          margin-left: 50px !important;

          article {
            color: #72849a;
          }
        `}
        align="middle"
      >
        <Col {...getColLayout([24, 24, 24, 6, 6, 6])}>
          <Typography>
            {formatNumber(follower)}
          </Typography>
          <Typography>Followers</Typography>
        </Col>
        <Col {...getColLayout([24, 24, 24, 6, 6, 6])}>
          <Typography>
            {formatNumber(articlePerMonth)}
          </Typography>
          <Typography>Article Per Month</Typography>
        </Col>
        <Col {...getColLayout([24, 24, 24, 12, 12, 12])}>
          <Flex gap={8} wrap="wrap">
            {tag.map((item) => (
              <Tag label={item} key={item} />
            ))}
          </Flex>
        </Col>
      </Row>
    </Card>
  );
};

const Tag = ({ label }: { label: string }) => {
  return (
    <Typography
      className={css`
        margin-left: 2px;
        font-size: 12px !important;
        height: 22px;
        padding: 0 8px;
        display: flex;
        align-items: center;
        border-radius: 2px;
        color: #704aff !important;
        background-color: #f2efff;
        width: fit-content;
      `}
    >
      {label}
    </Typography>
  );
};
