import { Card, Form, Input, FormInstance } from 'antd';

import { IntlMessage } from '@/components/util-components/intl-message';

import { IndicesInfoStorageSizeTotal } from './indices-info-storage-size-total';

type IndicesInfoStorageSizeProps = {
  form: FormInstance;
  currentSize: number;
};

export const IndicesInfoStorageSize = ({
  form,
  currentSize = 0,
}: IndicesInfoStorageSizeProps) => {
  return (
    <Card
      title={
        <IntlMessage id="logManagement.indices.storageSize" />
      }
    >
      <Form.Item
        label={
          <IntlMessage id="logManagement.indices.logUsage" />
        }
        name="use"
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="logManagement.indices.logStorageUse" />
        }
        name="free"
      >
        <Input disabled />
      </Form.Item>
      <IndicesInfoStorageSizeTotal
        form={form}
        currentSize={currentSize}
      />
    </Card>
  );
};
