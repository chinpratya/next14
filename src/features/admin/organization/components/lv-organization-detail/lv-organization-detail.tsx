import { Form, FormInstance, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

export type LvOrganizationDetailProps = {
  form?: FormInstance;
};

export const LvOrganizationDetail = ({
  form,
}: LvOrganizationDetailProps) => {
  const { t } = useTranslation();

  return (
    <Form layout="vertical" form={form}>
      <Form.Item
        label={
          <IntlMessage id="admin.businessSetting.organizationDetail.lvOrganization.detail.level" />
        }
        name="level"
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="admin.businessSetting.organizationDetail.lvOrganization.detail.label" />
        }
        name="label_th"
        rules={[
          validation.required(
            t(
              'admin.businessSetting.organizationDetail.lvOrganization.detail.labelRequired'
            )
          ),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="admin.businessSetting.organizationDetail.lvOrganization.detail.labelEn" />
        }
        name="label_en"
        rules={[
          validation.required(
            t(
              'admin.businessSetting.organizationDetail.lvOrganization.detail.labelEnRequired'
            )
          ),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="admin.businessSetting.organizationDetail.lvOrganization.detail.under" />
        }
        name="underName"
      >
        <Input disabled />
      </Form.Item>
    </Form>
  );
};
