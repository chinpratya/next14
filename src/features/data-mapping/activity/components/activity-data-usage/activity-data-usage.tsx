import {
  Card,
  Form,
  Radio,
  RadioChangeEvent,
  FormInstance,
} from 'antd';
import { useState, useEffect } from 'react';

import validation from '@/utils/validation';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetActivityUseAndPublishUsage } from '../../api/get-activity-use-and-publish-usage';
import { useUpdateActivityUsage } from '../../api/update-actvity-usage';
type ActivityDataUsageProps = {
  activityId: string;
  form: FormInstance;
};
export const ActivityDataUsage = ({
  activityId,
  form,
}: ActivityDataUsageProps) => {
  const [value, setValue] = useState();

  const { data, isError, isLoading } =
    useGetActivityUseAndPublishUsage({
      activityId,
    });
  const updateUsage = useUpdateActivityUsage({
    activityId,
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data, form]);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    updateUsage.submit(e.target.value as boolean);
  };
  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="dataMapping.activity.useAndPublic.usage.title" />
        }
        className="mt-3"
        loading={isLoading}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label={
              <IntlMessage id="dataMapping.activity.useAndPublic.usage.title" />
            }
            name="isUsageData"
            rules={[
              validation.required(
                'กรุณาเลือกการใช้ข้อมูล'
              ),
            ]}
          >
            <Radio.Group
              onChange={onChange}
              value={value}
            >
              <Radio value={true}>มี</Radio>
              <Radio value={false}>ไม่มี</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Card>
    </FallbackError>
  );
};
