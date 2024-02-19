import { css } from '@emotion/css';
import { Card, Skeleton } from 'antd';
import { produce } from 'immer';
import dynamic from 'next/dynamic';

import {
  WHITE_COLOR,
  WHITE_SECONDARY_COLOR,
} from '@/config/color';
import { usePermission } from '@/hooks';
import { tokens } from '@/lang';
import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { permissions } from '@/permissions';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetMeasureForm } from '../../api/get-measure-form';
import { MeasureFormType } from '../../types';

const CkEditor = dynamic(
  () => import('@utilComponents/ck-editor'),
  {
    ssr: false,
  }
);

export type MeasureFormProps = {
  measureId: string;
};

export const MeasureForm = ({
  measureId,
}: MeasureFormProps) => {
  const { data, isLoading, isError } =
    useGetMeasureForm(measureId);

  const editPermission = usePermission({
    moduleName: 'assessment',
    policies: [
      permissions[
        'pdpakit:assessment:assessmentrisk:update'
      ],
    ],
  });

  const onContentChange = (value: string) => {
    queryClient.setQueryData(
      [riskAssessmentQueryKeys.measured.form(measureId)],
      (oldData) =>
        produce(oldData, (draft: MeasureFormType) => {
          draft.measuredhtml = value;
        })
    );
  };

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage
            id={
              tokens.riskAssessment.riskMeasures
                .customizeTitle
            }
          />
        }
        className={css`
          .ant-card-head {
            background-color: ${WHITE_SECONDARY_COLOR};
            padding-bottom: 12px;
          }

          .ant-card-body {
            padding: 0;

            .ck-toolbar {
              background-color: ${WHITE_COLOR} !important;
              border-top: 1px solid #e8e8e8 !important;
              border-right: none !important;
              border-left: none !important;
              border-bottom: 1px solid #e8e8e8 !important;
              border-radius: 0 !important;
            }

            .ck-content {
              border: none !important;
              border-bottom-left-radius: 0.625rem !important;
              border-bottom-right-radius: 0.625rem !important;
            }
          }
        `}
      >
        <CkEditor
          value={data?.measuredhtml}
          onChange={onContentChange}
          disabled={!editPermission.isAllow}
        />
      </Card>
    </FallbackError>
  );
};
