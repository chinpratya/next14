import { Form, FormInstance, Input } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

import { Role } from '../../types';

export type RoleInfoProps = {
  form?: FormInstance;
  data?: Role;
};

export const RoleInfo = ({
  form,
  data,
}: RoleInfoProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (data && form) {
      form.setFieldsValue({
        name: data.name,
        name_en: data.name_en,
        status: data.status,
        description: data.description,
      });
    }

    return () => {
      form?.resetFields();
    };
  }, [data, form]);

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label={
          <IntlMessage id="admin.businessSetting.role.create.th" />
        }
        name="name"
        rules={[
          validation.required(
            t(
              'admin.businessSetting.role.create.thValidation'
            )
          ),
        ]}
      >
        <Input
          placeholder={
            t(
              'admin.businessSetting.role.create.thPlaceholder'
            ) as string
          }
        />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="admin.businessSetting.role.create.en" />
        }
        name="name_en"
        // rules={[
        //   validation.required(
        //     t(
        //       'admin.businessSetting.role.create.enValidation'
        //     )
        //   ),
        // ]}
      >
        <Input
          placeholder={
            t(
              'admin.businessSetting.role.create.enPlaceholder'
            ) as string
          }
        />
      </Form.Item>
      {/* <Form.Item
        label={
          <IntlMessage id="admin.businessSetting.role.create.status" />
        }
        name="status"
        rules={[
          validation.required(
            t(
              'admin.businessSetting.role.create.statusValidation'
            )
          ),
        ]}
      >
        <Select
          placeholder={
            t(
              'admin.businessSetting.role.create.statusPlaceholder'
            ) as string
          }
          options={[
            {
              label: (
                <IntlMessage id="admin.businessSetting.role.create.status.active" />
              ),
              value: 'active',
            },
            {
              label: (
                <IntlMessage id="admin.businessSetting.role.create.status.inactive" />
              ),
              value: 'inactive',
            },
          ]}
        />
      </Form.Item> */}
      <Form.Item
        label={
          <IntlMessage id="admin.businessSetting.role.create.description" />
        }
        name="description"
      >
        <Input.TextArea rows={5} />
      </Form.Item>
    </Form>
  );
};
