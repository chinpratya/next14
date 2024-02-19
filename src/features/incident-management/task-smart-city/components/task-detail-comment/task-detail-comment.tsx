import { UserOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Row,
  Col,
  Typography,
  Divider,
  Avatar,
} from 'antd';

import { TaskComment } from '../../types';

type TaskDetailCommentProps = {
  data: TaskComment[];
};
export const TaskDetailComment = ({
  data,
}: TaskDetailCommentProps) => {
  return (
    <>
      {data?.map((v: TaskComment) => {
        return (
          <Row
            justify={'space-between'}
            align={'top'}
            key={v.ObjectUUID}
          >
            <Avatar icon={<UserOutlined />} />
            <Col
              className={css`
                width: 92%;
              `}
            >
              <Row>
                <Typography.Title
                  level={4}
                  style={{ fontWeight: 'bold' }}
                >
                  {v.name}
                </Typography.Title>
                <Divider
                  type="vertical"
                  style={{ height: '25px' }}
                />
                <Typography.Text
                  style={{ fontSize: '15px' }}
                >
                  {v.commentDt}
                </Typography.Text>
              </Row>
              <Typography.Text>
                {v.comment}
              </Typography.Text>
            </Col>
          </Row>
        );
      })}
    </>
  );
};
