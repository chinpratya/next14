import { Flex } from '@mantine/core';
import { Form, Select, Skeleton, Typography } from 'antd';

import { useListWorkflow } from '@/features/dsar-automation';
import { FallbackError } from '@utilComponents/fallback-error';

export const WorkflowAction = () => {
  const { data, isLoading, isError } = useListWorkflow({
    status: 'publish',
    pageSize: 9999,
  });

  if (isLoading) {
    return <Skeleton />;
  }

  const workflowOptions = data?.data?.map((workflow) => ({
    value: workflow.workflowID,
    label: workflow.name,
  }));

  return (
    <FallbackError isError={isError}>
      <Form.Item
        label={
          <Typography.Title level={4} className="mb-0">
            การการทำ
          </Typography.Title>
        }
        tooltip={`เลือกฟิลด์ที่ต้องการแสดงหรือซ่อนเมื่อเงื่อนไขถูกต้อง`}
      >
        <Flex
          justify="start"
          align="start"
          className="w-100"
          gap={10}
          direction="column"
        >
          <Form.Item
            className="w-50 mb-0"
            name="isVisibility"
          >
            <Select
              options={[
                {
                  value: 'TO',
                  label: 'Go to',
                },
              ]}
            />
          </Form.Item>
          <Form.Item className="w-100" name="target">
            <Select options={workflowOptions} />
          </Form.Item>
        </Flex>
      </Form.Item>
    </FallbackError>
  );
};
