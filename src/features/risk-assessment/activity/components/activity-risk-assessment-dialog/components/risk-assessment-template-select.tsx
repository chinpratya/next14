import { Flex } from '@mantine/core';
import { Alert, Button, Divider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearch } from '@/hooks';
import { tokens } from '@/lang';
import { InputSearch } from '@components/input-search';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  useListTemplateRisk,
  TemplateRisk,
} from '../../../../template-risk';
import { StepWidgetProps } from '../types';

export type RiskAssessmentTemplateSelectProps =
  StepWidgetProps;

export const RiskAssessmentTemplateSelect = ({
  state,
  onChangeState,
  onNext,
  onClose,
}: RiskAssessmentTemplateSelectProps) => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>('');

  const { debouncedSearch, search, onSearch } =
    useSearch();

  const { data, isLoading, isError } =
    useListTemplateRisk({
      search: debouncedSearch,
      status: 'active',
      pageSize: 999,
    });

  const columns: ColumnsType<TemplateRisk> = [
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.activity.name}
        />
      ),
      dataIndex: 'name',
      width: 300,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.activity.type}
        />
      ),
      dataIndex: 'type',
      width: 150,
      className: 'text-capitalize',
    },
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.activity.status}
        />
      ),
      dataIndex: 'status',
      width: 150,
      render: (status) => (
        <ShowTagStatus status={status} />
      ),
    },
  ];

  const handleNext = () => {
    if (!state?.assessmentId) {
      setError(
        t(
          tokens.riskAssessment.activity
            .selectTemplateRequired
        )
      );
      return;
    }
    onNext?.();
  };

  const handleChanged = (selectedRowKeys: Key[]) => {
    setError(null);
    onChangeState?.({
      assessmentId: selectedRowKeys?.[0] as string,
    });
  };

  return (
    <FallbackError isError={isError}>
      <div className="p-4">
        <Flex
          justify="end"
          align="center"
          style={{ marginBottom: 16 }}
        >
          <InputSearch
            search={search}
            onSearch={onSearch}
          />
        </Flex>
        <Table
          rowKey="ObjectUUID"
          tableLayout="fixed"
          scroll={{
            x: 600,
          }}
          columns={columns}
          loading={isLoading}
          dataSource={data?.data}
          pagination={false}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [state?.assessmentId ?? ''],
            onChange: handleChanged,
          }}
        />
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mt-4"
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
        <Button type="primary" onClick={handleNext}>
          <IntlMessage id={tokens.common.next} />
        </Button>
      </Flex>
    </FallbackError>
  );
};
