import { Flex } from '@mantine/core';
import { Col, Divider, Row, Typography } from 'antd';
import dayjs from 'dayjs';

import { CommentType } from '@/features/shared';
import { getColLayout } from '@/utils';
import { NoneProfile } from '@components/none-profile';

export type CommentBoxItemProps = {
  comment: CommentType;
};

export const CommentBoxItem = ({
  comment,
}: CommentBoxItemProps) => {
  const themeColor =
    comment?.usertype === 'internal' || !comment?.isadmin
      ? '#FFC542'
      : '#0052B4';

  return (
    <Row
      key={comment.ObjectUUID}
      justify="space-between"
      align="top"
      className="mb-3"
      gutter={[0, 10]}
    >
      <Col {...getColLayout(1)} className="text-left">
        <NoneProfile color={themeColor} />
      </Col>
      <Col {...getColLayout(23)} className="pl-1">
        <div
          style={{
            background: '#F5F5F5',
            padding: '5px 10px',
            borderRadius: '5px',
            borderLeft: `4px solid ${themeColor}`,
          }}
        >
          <Flex align="center" gap={8} className="mb-4">
            <Typography.Title level={4} className="mb-0">
              {comment?.name}
            </Typography.Title>
            <Divider
              type="vertical"
              style={{
                height: '15px',
                width: '3px',
                background: '#72849a',
              }}
              className="border-left"
            />
            <Typography.Text type="secondary">
              {dayjs(comment.created_dt).format(
                'D MMM YYYY'
              )}
            </Typography.Text>
          </Flex>
          <Typography.Paragraph
            type="secondary"
            style={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {comment?.comment}
          </Typography.Paragraph>
        </div>
      </Col>
    </Row>
  );
};
