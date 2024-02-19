import { CommentOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Badge, Card } from 'antd';
import { useEffect } from 'react';

import {
  useAssessmentAutomationStore,
  WebformBuilder,
} from '../../../../share';
import { AssessmentSubmissionRespondentDetailForm } from '../../../types';

export type FormAssessmentProps = {
  onToggleComment: () => void;
  readMode?: boolean;
  data: AssessmentSubmissionRespondentDetailForm;
  disable: boolean;
};

export const FormAssessment = ({
  onToggleComment,
  readMode,
  data,
  disable,
}: FormAssessmentProps) => {
  const { setFormItems } = useAssessmentAutomationStore();

  useEffect(() => {
    if (data?.webform) {
      setFormItems(data?.webform);
    }
  }, [data, setFormItems]);
  console.log('disabled', disable);

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
        <Badge>
          <div
            className={`p-2 text-center cursor-pointer`}
            style={{
              backgroundColor: !disable
                ? 'orange'
                : '#dddddd',
              borderRadius: '50%',
              width: 40,
              height: 40,
              pointerEvents: !disable ? 'unset' : 'none',
            }}
            onClick={() => onToggleComment()}
          >
            <CommentOutlined className="font-size-lg text-white font-weight-bold" />
          </div>
        </Badge>
      }
    >
      <WebformBuilder readOnly={readMode} />
    </Card>
  );
};
