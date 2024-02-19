import { Form, FormInstance, Input } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/stores/auth';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

type TagsCreateFormProps = {
  form: FormInstance;
  tagId?: string;
};
export const TagsCreateForm = ({
  form,
  tagId,
}: TagsCreateFormProps) => {
  const { t } = useTranslation();
  const { organizationName } = useAuth();

  useEffect(() => {
    if (!tagId && organizationName) {
      form.setFieldValue(
        'organization',
        organizationName
      );
    }
  }, [organizationName, form, tagId]);

  return (
    <>
      <Form form={form} layout={'vertical'}>
        <Form.Item
          label={
            <IntlMessage id="dataMapping.tags.name" />
          }
          name="name"
          rules={[
            validation.required(
              t('dataMapping.tags.nameRequired')
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="dataMapping.tags.organization" />
          }
          name="organization"
        >
          <Input disabled />
        </Form.Item>
      </Form>
    </>
  );
};
