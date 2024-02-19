import { Form, FormInstance, Input, Select } from 'antd';

import { useListActivity } from '@/features/data-mapping';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

type PreferenceCentersBasicInfoProps = {
  form: FormInstance;
};

export const PreferenceCentersBasicInfo = ({
  form,
}: PreferenceCentersBasicInfoProps) => {
  const { data } = useListActivity({});

  const options = data?.data?.map((activity) => ({
    value: activity.ObjectUUID,
    label: activity.name,
  }));

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label={
          <IntlMessage id="consentManagement.preferenceCenters.detail.basicInfo.name" />
        }
        name="name"
        rules={[validation.required('กรุณากรอก ชื่อ')]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="consentManagement.preferenceCenters.detail.basicInfo.description" />
        }
        name="description"
        rules={[
          validation.required('กรุณากรอก รายละเอียด'),
        ]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="consentManagement.preferenceCenters.detail.basicInfo.activity" />
        }
        name={'activityID'}
        rules={[
          validation.required(
            'กรุณาเลือก กิจกรรมการประมวลผล'
          ),
        ]}
      >
        <Select mode="tags" options={options} />
      </Form.Item>
    </Form>
  );
};
