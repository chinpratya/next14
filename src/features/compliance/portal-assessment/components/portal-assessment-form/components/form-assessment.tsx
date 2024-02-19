import { CommentOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Badge, Card } from 'antd';

import { useAuth } from '@/stores/auth';

// eslint-disable-next-line import/no-cycle
import {
  useAssessmentAutomationStore,
  WebformBuilder,
} from '../../../../share';
// import { useCountPortalFormUnreadComment } from '../../../api/count-portal-form-unread-comment';
import { useListAssessmentFormComment } from '../../../api/list-assessment-form-comment';

export type FormAssessmentProps = {
  assessmentId: string;
  onToggleComment: () => void;
  readMode?: boolean;
  status: string | undefined;
};

export const FormAssessment = ({
  assessmentId,
  onToggleComment,
  status,
  readMode,
}: FormAssessmentProps) => {
  const { selectedFormKey } =
    useAssessmentAutomationStore();
  const { role } = useAuth();

  // const { data: countCommentNotApprove } =
  //   useCountPortalFormUnreadComment({
  //     assessmentId,
  //     formId: selectedFormKey,
  //   });
  const { data: datalistComment } =
    useListAssessmentFormComment({
      assessmentId,
      formId: selectedFormKey,
    });

  return (
    <Card
      className={css`
        .ant-card-body {
          padding: 48px 86px;
          min-height: 50vh;
          width: 100%;
        }
      `}
      extra={
        role === 'respondent' ? (
          status === 'approve' ||
          status === 'waiting_approve' ||
          status === 'waiting_update' ||
          status === 'Cancel' ? (
            <Badge>
              <div
                className={`p-2 text-center cursor-pointer`}
                style={{
                  backgroundColor:
                    datalistComment !== undefined
                      ? datalistComment?.length > 0
                        ? 'orange'
                        : '#dddddd'
                      : '#dddddd',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  pointerEvents:
                    datalistComment !== undefined
                      ? datalistComment?.length > 0
                        ? 'unset'
                        : 'none'
                      : 'none',
                }}
                onClick={() => onToggleComment()}
              >
                <CommentOutlined className="font-size-lg text-white font-weight-bold" />
              </div>
            </Badge>
          ) : null
        ) : (
          <Badge>
            <div
              className={`p-2 text-center cursor-pointer`}
              style={{
                backgroundColor:
                  datalistComment !== undefined
                    ? datalistComment?.length > 0
                      ? 'orange'
                      : '#dddddd'
                    : '#dddddd',
                borderRadius: '50%',
                width: 40,
                height: 40,
              }}
              onClick={() => onToggleComment()}
            >
              <CommentOutlined className="font-size-lg text-white font-weight-bold" />
            </div>
          </Badge>
        )
      }
    >
      <WebformBuilder readOnly={readMode} />
    </Card>
  );
};
