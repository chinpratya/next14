import {
  CloseOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Avatar,
  Divider,
  Empty,
  Spin,
  Typography,
} from 'antd';
import dayjs from 'dayjs';

import { Flex } from '@components/flex';
import { FallbackError } from '@utilComponents/fallback-error';

import { useAssessmentAutomationStore } from '../../../../share';
import { useListAssessmentSubmissionRespondentComment } from '../../../api/lis-assessment-submission-respondents-comment';

export type FormCommentProps = {
  assessmentId: string;
  onToggleComment: () => void;
};

export type CommentItemProps = {
  message: string;
  createdBy: string;
  createdDt: string;
};

export const CommentItem = ({
  message,
  createdBy,
  createdDt,
}: CommentItemProps) => {
  return (
    <>
      <div className="pl-3 pr-2 pt-3">
        <Flex
          alignItems="center"
          justifyContent="between"
        >
          <Flex>
            <Avatar icon={<UserOutlined />} />
            <div>
              <Typography.Title
                level={4}
                className={css`
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  margin-bottom: 20px;
                  margin-left: 10px;
                  width: 80%;
                `}
                type="secondary"
              >
                {createdBy}
              </Typography.Title>
              <Typography.Text
                className="ml-2"
                type="secondary"
              >
                {dayjs(createdDt).format(
                  'DD/MM/YYYY HH:mm'
                )}
              </Typography.Text>
            </div>
          </Flex>
        </Flex>
        <Typography.Paragraph
          className="mt-3"
          type="secondary"
        >
          {message}
        </Typography.Paragraph>
      </div>
      <Divider className="mt-0 mb-0" />
    </>
  );
};

export const FormComment = ({
  assessmentId,
  onToggleComment,
}: FormCommentProps) => {
  const { selectedFormKey } =
    useAssessmentAutomationStore();

  const { data, isLoading, isError } =
    useListAssessmentSubmissionRespondentComment(
      assessmentId,
      selectedFormKey
    );

  return (
    <>
      <FallbackError isError={isError} borderLess>
        <div className="pt-3 pb-3 pl-3 pr-2 border-bottom">
          <Flex justifyContent="end" alignItems="center">
            <CloseOutlined
              className="font-size-md"
              onClick={() => onToggleComment()}
            />
          </Flex>
        </div>
        {isLoading ? (
          <Spin
            size={'large'}
            className={css`
              width: 100%;
              height: 100px;
              margin-top: 5rem;
            `}
          />
        ) : data?.length === 0 ? (
          <>
            <Empty
              className="p-3"
              description="ไม่มีความคิดเห็น"
            />
            <Divider className="mb-0" />
          </>
        ) : (
          <>
            <Typography.Title
              level={3}
              className="p-2 mb-0"
            >
              แสดงความคิดเห็น ({data?.length})
            </Typography.Title>
            {data?.map((comment) => (
              <CommentItem
                key={comment.ObjectUUID}
                {...comment}
                message={comment.message}
                createdBy={comment.createdBy}
                createdDt={comment.createdDt ?? ''}
              />
            ))}
          </>
        )}
      </FallbackError>
    </>
  );
};
