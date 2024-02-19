import { Center, Flex } from '@mantine/core';
import { useCounter, useToggle } from '@mantine/hooks';
import {
  Button,
  Card,
  Divider,
  Skeleton,
  Steps,
  Typography,
} from 'antd';
import { produce } from 'immer';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  RiskAssessmentLikelihood,
  RiskAssessmentEffect,
  RiskAssessmentResult,
} from '../../../shared';
import { useGetTaskAssessment } from '../../api/get-task-assessment';
import { usePublishTaskAssessment } from '../../api/publish-task-assessment';
import { useUpdateTaskAssessment } from '../../api/update-task-assessment';

export type TaskWidgetAssessment = {
  taskId: string;
  isRisk?: boolean;
  requestId?: string;
};

export const TaskWidgetAssessment = ({
  taskId,
  isRisk,
  requestId,
}: TaskWidgetAssessment) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const { data, isLoading, isError } =
    useGetTaskAssessment(taskId);

  const updateAssessment = useUpdateTaskAssessment({
    taskId,
  });

  const publishAssessment = usePublishTaskAssessment({
    taskId,
    requestId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.task.notifications.publish
        ) as string,
      });
    },
  });

  const [showAssessment, toggleShowAssessment] =
    useToggle([false, true]);
  const [current, handler] = useCounter(0, {
    min: 0,
    max: 2,
  });

  const onChange = (values: Record<string, unknown>) =>
    queryClient.setQueryData(
      [dataBreachQueryKeys.task.assessment(taskId)],
      (oldData) =>
        produce(
          oldData,
          (draft: Record<string, unknown>) => ({
            ...draft,
            ...values,
          })
        )
    );

  const onNext = () => handler.increment();
  const onBack = () => handler.decrement();

  if (isLoading) return <Skeleton />;

  if (data?.isRiskAssessment) {
    return (
      <Card
        title={
          <IntlMessage
            id={tokens.dataBreach.task.summary}
          />
        }
      >
        <Divider className="mt-0" />
        <RiskAssessmentResult
          riskLikelihoodValue={data?.likelihoodValue}
          riskLikelihood={data?.likelihood}
          riskEffectValue={data?.effectValue}
          riskEffect={data?.effect}
        />
      </Card>
    );
  }

  if (isRisk && !showAssessment) {
    const toggle = () => toggleShowAssessment();

    return (
      <Center style={{ height: '50vh' }}>
        <Flex direction="column" gap={12} align="center">
          <svg
            width="24"
            height="28"
            viewBox="0 0 24 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.414 5.09002L12.414 0.0900197C12.2841 0.0306995 12.1429 0 12 0C11.8572 0 11.716 0.0306995 11.586 0.0900197L0.586022 5.09002C0.41132 5.16948 0.263173 5.29753 0.159264 5.45889C0.0553555 5.62024 7.50631e-05 5.8081 2.19202e-05 6.00002V8.82402C-0.00437896 11.8136 0.653939 14.767 1.92761 17.4717C3.20128 20.1764 5.05863 22.5651 7.36602 24.466L11.362 27.771C11.5413 27.9194 11.7668 28.0006 11.9995 28.0006C12.2323 28.0006 12.4577 27.9194 12.637 27.771L16.634 24.467C18.9414 22.5658 20.7987 20.1769 22.0724 17.4721C23.346 14.7672 24.0044 11.8137 24 8.82402V6.00002C24 5.8081 23.9447 5.62024 23.8408 5.45889C23.7369 5.29753 23.5887 5.16948 23.414 5.09002ZM12 23C10.897 23 10 22.103 10 21C10 19.897 10.897 19 12 19C13.103 19 14 19.897 14 21C14 22.103 13.103 23 12 23ZM12.98 17.196C12.9341 17.4221 12.8115 17.6253 12.6329 17.7713C12.4543 17.9173 12.2307 17.997 12 17.997C11.7694 17.997 11.5458 17.9173 11.3672 17.7713C11.1886 17.6253 11.0659 17.4221 11.02 17.196L9.02002 7.19602C8.99141 7.05104 8.99522 6.90153 9.03118 6.75819C9.06714 6.61486 9.13436 6.48125 9.22802 6.36695C9.32168 6.25264 9.43946 6.16047 9.57293 6.09703C9.7064 6.0336 9.85225 6.00047 10 6.00002H14C14.1479 6.00011 14.2939 6.033 14.4276 6.09632C14.5612 6.15965 14.6792 6.25183 14.7729 6.36622C14.8666 6.48061 14.9338 6.61437 14.9697 6.75786C15.0055 6.90135 15.009 7.051 14.98 7.19602L12.98 17.196Z"
              fill="black"
              fillOpacity="0.29"
            />
          </svg>
          <Typography.Text>
            <IntlMessage
              id={
                tokens.dataBreach.task
                  .assessmentNotComplete
              }
            />
          </Typography.Text>
          <Button type="primary" onClick={toggle}>
            <IntlMessage
              id={
                tokens.dataBreach.task.clickRiskAssessment
              }
            />
          </Button>
        </Flex>
      </Center>
    );
  }

  const stepRender = (current: number) =>
    ({
      0: (
        <RiskAssessmentLikelihood
          value={data?.likelihoodValue}
          dataSource={data?.likelihood}
          isLoading={updateAssessment.isLoading}
          onChange={(value) => {
            updateAssessment.submit({
              effectValue: data?.effectValue,
              likelihoodValue: value,
            });
            onChange({ likelihoodValue: value });
          }}
        />
      ),
      1: (
        <RiskAssessmentEffect
          isLoading={updateAssessment.isLoading}
          value={data?.effectValue}
          dataSource={data?.effect}
          onChange={(value) => {
            updateAssessment.submit({
              likelihoodValue: data?.likelihoodValue,
              effectValue: value,
            });
            onChange({ effectValue: value });
          }}
        />
      ),
      2: (
        <Card
          title={
            <IntlMessage
              id={tokens.dataBreach.task.summary}
            />
          }
        >
          <Divider className="mt-0" />
          <RiskAssessmentResult
            riskLikelihoodValue={data?.likelihoodValue}
            riskLikelihood={data?.likelihood}
            riskEffectValue={data?.effectValue}
            riskEffect={data?.effect}
          />
          <Button
            type="primary"
            block
            className="mt-4"
            onClick={() => publishAssessment.submit()}
            loading={publishAssessment.isLoading}
          >
            <IntlMessage
              id={tokens.dataBreach.task.confirmButton}
            />
          </Button>
        </Card>
      ),
    }[current]);

  return (
    <FallbackError isError={isError}>
      <Flex justify="center">
        <Steps
          current={current}
          className="w-75 p-2"
          items={[
            {
              title: (
                <IntlMessage
                  id={
                    tokens.dataBreach.riskMatrix
                      .chanceTitle
                  }
                />
              ),
            },
            {
              title: (
                <IntlMessage
                  id={
                    tokens.dataBreach.riskMatrix
                      .effectTitle
                  }
                />
              ),
            },
            {
              title: (
                <IntlMessage
                  id={tokens.dataBreach.task.summary}
                />
              ),
            },
          ]}
        />
      </Flex>
      <Divider />
      {stepRender(current)}
      <Flex gap={8} hidden={updateAssessment.isLoading}>
        <Button
          hidden={current === 2}
          type="primary"
          onClick={onNext}
        >
          <IntlMessage id={tokens.common.next} />
        </Button>
        <Button
          hidden={current === 0 || current === 2}
          onClick={onBack}
        >
          <IntlMessage id={tokens.common.back} />
        </Button>
      </Flex>
    </FallbackError>
  );
};
