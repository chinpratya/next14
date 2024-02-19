import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Alert,
  Badge,
  Button,
  Card,
  Divider,
  Menu,
  Table,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { Key, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { InnerAppLayout } from '@/layouts';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  TemplateRiskEffectTable,
  useGetTemplateOfRiskAssessment,
  usePreviewTemplateOfRiskAssessment,
} from '../../../../template-risk';
import { StepWidgetProps } from '../types';

export type RiskAssessmentEffectProps = StepWidgetProps;

export const RiskAssessmentEffect = ({
  state,
  onChangeState,
  onClose,
  onPrev,
  onNext,
}: RiskAssessmentEffectProps) => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>('');
  const [selectedEffect, setSelectedEffect] = useState<
    string | null
  >(null);

  const { data, isLoading, isError } =
    useGetTemplateOfRiskAssessment(
      state?.assessmentId ?? ''
    );

  const previewTemplateOfRiskAssessment =
    usePreviewTemplateOfRiskAssessment({
      assessmentId: state?.assessmentId ?? '',
      onSuccess: (data) => {
        onChangeState?.({
          preview: data,
        });
        onNext?.();
      },
    });

  const columns: ColumnsType<TemplateRiskEffectTable> = [
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.activity.severity}
        />
      ),
      dataIndex: 'severity',
      key: 'severity',
      width: 200,
    },
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.activity.effect}
        />
      ),
      dataIndex: 'effect',
      key: 'effect',
      width: 400,
    },
  ];

  const effects = data?.effect ?? [];

  const effectMenu = effects.map((effect) => {
    const effectValue = _.find(state?.effectValue, {
      effectID: effect.effectID,
    })?.value;
    return {
      key: effect.effectID,
      label: effect.name,
      icon: (
        <Badge color={effectValue ? 'green' : 'red'} />
      ),
    };
  });

  useEffect(() => {
    const effects = data?.effect ?? [];
    if (!selectedEffect && effects.length > 0) {
      setSelectedEffect(effects[0].effectID);
    }
  }, [data?.effect, selectedEffect]);

  const currentEffect = effects.find(
    (effect) => effect.effectID === selectedEffect
  );

  const handleSelectEffect = (key: string) => {
    setSelectedEffect(key);
  };

  const handleSelectEffectValue = (
    selectedRowKeys: Key[]
  ) => {
    setError('');
    if (!selectedRowKeys.length) {
      return;
    }
    const effectValue = {
      effectID: selectedEffect,
      value: selectedRowKeys[0] as string,
    };
    onChangeState?.({
      effectValue: [
        ...(state?.effectValue ?? []).filter(
          (effect) => effect.effectID !== selectedEffect
        ),
        effectValue,
      ],
    });
  };

  const handleNext = () => {
    let error = '';
    effects.forEach((effect) => {
      const effectValue = _.find(state?.effectValue, {
        effectID: effect.effectID,
      })?.value;
      if (!effectValue) {
        error = t(
          tokens.riskAssessment.activity.effectRequired
        );
        return;
      }
    });

    if (error) {
      setError(error);
      return;
    }

    previewTemplateOfRiskAssessment.submit({
      likelihoodValue: state?.likelihoodValue,
      effectValue: state?.effectValue,
    });
  };

  const currentEffectValue = state?.effectValue?.find(
    (effect) => effect.effectID === selectedEffect
  );

  return (
    <FallbackError isError={isError}>
      <div className="p-4">
        <Card
          loading={isLoading}
          className={css`
            .ant-card-body {
              padding: ${isLoading ? 24 : 0}px;
            }

            .inner-app-layout > .main-content {
              min-height: 50vh !important;
              padding: 0 !important;
            }
          `}
        >
          <InnerAppLayout
            sideContent={
              <Flex
                direction="column"
                gap={8}
                className="w-100 border-right"
              >
                <Typography.Title
                  level={3}
                  className="mb-2 mt-3 text-center p-0"
                >
                  <IntlMessage
                    id={
                      tokens.riskAssessment.activity
                        .effectList
                    }
                  />
                </Typography.Title>
                <Divider className="m-0" />
                <Menu
                  selectedKeys={[selectedEffect ?? '']}
                  className="border-0"
                  mode="inline"
                  items={effectMenu}
                  onSelect={({ key }) =>
                    handleSelectEffect(key as string)
                  }
                />
              </Flex>
            }
            mainContent={
              <Flex direction="column" gap={8}>
                <Typography.Title
                  level={3}
                  className="mb-2 mt-3 ml-2 p-0"
                >
                  {currentEffect?.name}
                </Typography.Title>
                <Divider className="m-0" />
                <Table
                  rowKey="tableID"
                  tableLayout="fixed"
                  scroll={{
                    x: 'max-content',
                  }}
                  columns={columns}
                  dataSource={currentEffect?.table}
                  rowSelection={{
                    type: 'radio',
                    selectedRowKeys: currentEffectValue
                      ? [currentEffectValue.value ?? '']
                      : [],
                    onChange: handleSelectEffectValue,
                  }}
                  pagination={false}
                />
              </Flex>
            }
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
        <Button
          type="primary"
          onClick={handleNext}
          loading={
            previewTemplateOfRiskAssessment.isLoading
          }
        >
          <IntlMessage id={tokens.common.next} />
        </Button>
      </Flex>
    </FallbackError>
  );
};
