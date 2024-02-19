import {
  Card,
  Divider,
  Pagination,
  Typography,
} from 'antd';

import { ConsentForm } from '@/shared';
import { Flex } from '@components/flex';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetRequestForm } from '../../api/get-request-form';

type RequestDetailReplyProps = {
  requestId: string;
};

export const RequestDetailReply = ({
  requestId,
}: RequestDetailReplyProps) => {
  const { data, isLoading, isError } =
    useGetRequestForm(requestId);

  return (
    <FallbackError isError={isError}>
      <Card title="ข้อมูลเพิ่มเติม" loading={isLoading}>
        <Flex justifyContent="center">
          <Typography.Title level={3}>
            {data?.formTemplate?.formItems[0].name}
          </Typography.Title>
        </Flex>
        <Divider />
        <Flex justifyContent="end">
          <Pagination
            current={1}
            total={
              data?.formTemplate?.formItems
                ? data?.formTemplate?.formItems.length
                : 1
            }
            pageSize={1}
            simple
          />
        </Flex>
        <ConsentForm
          formItems={data?.formTemplate?.formItems}
          formSettings={data?.formTemplate?.formSetting}
          viewOnly
        />
      </Card>
    </FallbackError>
  );
};
