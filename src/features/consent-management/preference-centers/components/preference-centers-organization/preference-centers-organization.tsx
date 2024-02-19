import { Form, FormInstance, Select } from 'antd';

import {
  OrganizationPicker,
  useListOrganizationUser,
} from '@/features/admin';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

type PreferenceCentersOrganizationProps = {
  form: FormInstance;
};

export const PreferenceCentersOrganization = ({
  form,
}: PreferenceCentersOrganizationProps) => {
  const { data } = useListOrganizationUser({
    departmentId: '06e4c45e-e6a2-41a5-9097-9dc08da9d1e0',
  });

  const delegateOptions = data?.data?.map((delegate) => ({
    value: delegate.userId,
    label: delegate.first_name + ' ' + delegate.last_name,
  }));

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label={
          <IntlMessage id="consentManagement.preferenceCenters.detail.organization.delegate" />
        }
        name="delegateID"
        rules={[
          validation.required(
            'กรุณาเลือก ผู้ที่รับมอบหมาย'
          ),
        ]}
      >
        <Select options={delegateOptions} />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="consentManagement.preferenceCenters.detail.organization.organization" />
        }
        name="organizationID"
        rules={[validation.required('กรุณาเลือก องค์กร')]}
      >
        <OrganizationPicker />
      </Form.Item>
    </Form>
  );
};
