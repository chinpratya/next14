import { Flex } from '@mantine/core';
import {
  Alert,
  Button,
  Card,
  Divider,
  Table,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  TemplateOfRiskAssessmentLikelihood,
  useGetTemplateOfRiskAssessment,
} from '../../../../template-risk';
import { StepWidgetProps } from '../types';

export type RiskAssessmentLikelihoodProps =
  StepWidgetProps;

export const RiskAssessmentLikelihood = ({
  state,
  onChangeState,
  onClose,
  onPrev,
  onNext,
}: RiskAssessmentLikelihoodProps) => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>('');

  const { data, isLoading, isError } =
    useGetTemplateOfRiskAssessment(
      state?.assessmentId ?? ''
    );

  const columns: ColumnsType<TemplateOfRiskAssessmentLikelihood> =
    [
      {
        title: (
          <IntlMessage
            id={tokens.riskAssessment.activity.likelihood}
          />
        ),
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: (
          <IntlMessage
            id={
              tokens.riskAssessment.activity.description
            }
          />
        ),
        dataIndex: 'description',
        key: 'description',
      },
    ];

  const handleNext = () => {
    if (!state?.likelihoodValue) {
      setError(
        t(
          tokens.riskAssessment.activity
            .likelihoodRequired
        )
      );
      return;
    }
    onNext?.();
  };

  const handleChanged = (selectedRowKeys: Key[]) => {
    setError(null);
    onChangeState?.({
      likelihoodValue: selectedRowKeys?.[0] as string,
    });
  };

  return (
    <FallbackError isError={isError}>
      <div className="p-4">
        <Card
          title={
            <IntlMessage
              id={
                tokens.riskAssessment.activity
                  .changeLikelihood
              }
            />
          }
        >
          <Table
            rowKey="likelihoodID"
            columns={columns}
            dataSource={data?.likelihood}
            loading={isLoading}
            rowSelection={{
              type: 'radio',
              onChange: handleChanged,
              selectedRowKeys: [
                state?.likelihoodValue ?? '',
              ],
            }}
            pagination={false}
          />
        </Card>
        {error && (
          <Alert
            type="error"
            showIcon
            className="mt-3"
            message={error}
          />
        )}
      </div>
      <Divider className="mb-0" />
      <Flex
        justify="end"
        align="center"
        gap={8}
        className="p-3"
      >
        <Button onClick={onClose}>
          <IntlMessage id={tokens.common.cancel} />
        </Button>
        <Button onClick={onPrev}>
          <IntlMessage id={tokens.common.back} />
        </Button>
        <Button type="primary" onClick={handleNext}>
          <IntlMessage id={tokens.common.next} />
        </Button>
      </Flex>
    </FallbackError>
  );
};
