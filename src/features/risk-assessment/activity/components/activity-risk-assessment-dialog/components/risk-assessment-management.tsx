import { Flex } from '@mantine/core';
import {
  Alert,
  Button,
  Divider,
  Input,
  Table,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { HtmlContentFrame } from '@components/html-content-frame';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  useGetMeasureForm,
  useListMeasure,
  MeasureType,
} from '../../../../measure';
import { useCreateAssessmentOfActivity } from '../../../api/create-assessment-of-activity';
import { StepWidgetProps } from '../types';

export type RiskAssessmentManagementProps =
  StepWidgetProps;

const RiskAssessmentManagementDetail = ({
  measureId,
}: {
  measureId: string;
}) => {
  const { data, isLoading, isError } =
    useGetMeasureForm(measureId);

  if (isLoading) {
    return (
      <Typography.Text type="secondary">
        Loading...
      </Typography.Text>
    );
  }

  return (
    <FallbackError isError={isError}>
      <Typography.Title level={4}>
        <IntlMessage
          id={
            tokens.riskAssessment.activity.controlCommand
          }
        />
      </Typography.Title>
      <HtmlContentFrame
        html={data?.measuredhtml || ''}
        height="300px"
      />
    </FallbackError>
  );
};

export const RiskAssessmentManagement = ({
  activityIds = [],
  state,
  onClose,
  onPrev,
  onChangeState,
}: RiskAssessmentManagementProps) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState('');

  const { showNotification } = useNotifications();

  const [error, setError] = useState<string | null>('');

  const { data, isLoading, isError } = useListMeasure({});

  const createAssessmentOfActivity =
    useCreateAssessmentOfActivity({
      activityIds,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            tokens.riskAssessment.activity.notifications
              .create
          ) as string,
        });
        onClose?.();
      },
    });

  const columns: ColumnsType<MeasureType> = [
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.activity.measure}
        />
      ),
      width: 350,
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.activity.tags}
        />
      ),
      width: 350,
      dataIndex: 'tagName',
      ellipsis: true,
    },
  ];

  const onSelectMeasures = (selectedRowKeys: Key[]) => {
    setError(null);
    onChangeState?.({
      measure: selectedRowKeys,
    });
  };

  const handleNext = () => {
    if (!state?.measure?.length) {
      setError(
        t(tokens.riskAssessment.activity.measureRequired)
      );
      return;
    }

    createAssessmentOfActivity.submit({
      riskAssessment: state?.assessmentId,
      likelihoodValue: state.likelihoodValue,
      effectValue: state.effectValue,
      measure: state.measure,
      note: description,
    });
  };

  return (
    <FallbackError isError={isError}>
      <div className="p-4">
        <Table
          loading={isLoading}
          rowKey="ObjectUUID"
          tableLayout="fixed"
          scroll={{
            x: 700,
          }}
          columns={columns}
          dataSource={data?.data}
          rowSelection={{
            type: 'checkbox',
            preserveSelectedRowKeys: true,
            selectedRowKeys: state?.measure,
            onChange: onSelectMeasures,
          }}
          expandable={{
            expandedRowRender: (record: MeasureType) => (
              <RiskAssessmentManagementDetail
                measureId={record.ObjectUUID}
              />
            ),
          }}
        />
        <Typography.Text>
          <IntlMessage
            id={tokens.riskAssessment.activity.details}
          />
        </Typography.Text>
        <Input.TextArea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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
          loading={createAssessmentOfActivity.isLoading}
        >
          <IntlMessage id={tokens.common.save} />
        </Button>
      </Flex>
    </FallbackError>
  );
};
