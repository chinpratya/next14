import {
  Card,
  Form,
  FormInstance,
  Input,
  Select,
} from 'antd';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

import { TagsFormItem } from '../../../tags';
import { useGetPolicyTemplate } from '../../api/get-policy-template';

type PolicyBasicInfoProps = {
  form: FormInstance;
};

export const PolicyBasicInfo = ({
  form,
}: PolicyBasicInfoProps) => {
  const { t } = useTranslation();
  const { data } = useGetPolicyTemplate();

  const typeOptions = data?.type?.map((type) => ({
    value: type.th.template_id,
    label: type.th.template_name,
  }));

  return (
    <Form form={form} layout="vertical">
      <Card
        title={
          <IntlMessage id="policyManagement.policy.detail.basicInfo.title" />
        }
      >
        <Form.Item
          label={
            <IntlMessage id="policyManagement.policy.detail.basicInfo.name" />
          }
          name="name"
          rules={[
            validation.required(
              t(
                'policyManagement.policy.detail.basicInfo.nameRequired'
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="policyManagement.policy.detail.basicInfo.description" />
          }
          name="description"
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <TagsFormItem
          label={
            <IntlMessage id="policyManagement.policy.detail.basicInfo.tag" />
          }
          name="tagID"
        />
        <Form.Item
          label={
            <IntlMessage id="policyManagement.policy.detail.basicInfo.type" />
          }
          name="policy_type"
          rules={[
            validation.required(
              t(
                'policyManagement.policy.detail.basicInfo.typeRequired'
              )
            ),
          ]}
        >
          <Select options={typeOptions} />
        </Form.Item>
      </Card>
    </Form>
  );
};
