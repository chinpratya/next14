import { Flex } from '@mantine/core';
import {
  Form,
  FormInstance,
  Input,
  Select,
  Typography,
} from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { validation } from '@/utils';
import { ColorPicker } from '@components/color-picker';
import { IntlMessage } from '@utilComponents/intl-message';

export type CookiesCategoryForm = {
  form?: FormInstance;
  isEdit?: boolean;
};

export const CookiesCategoryForm = ({
  form,
  isEdit,
}: CookiesCategoryForm) => {
  const { t } = useTranslation();

  const [locale, setLocale] = useState<string>('th');

  const onChangeLocal = (locale: string) =>
    setLocale(locale);

  return (
    <div>
      <Flex justify="end" align="center" gap={8}>
        <Typography.Text>ภาษา :</Typography.Text>
        <Select
          style={{
            minWidth: 150,
          }}
          value={locale}
          onChange={onChangeLocal}
          options={[
            {
              label: 'ภาษาไทย',
              value: 'th',
            },
            {
              label: 'English',
              value: 'en',
            },
          ]}
        />
      </Flex>
      <Form
        layout="vertical"
        form={form}
        onValuesChange={console.log}
      >
        <Form.Item
          label={
            <IntlMessage
              id={
                tokens.cookieManagement.cookies
                  .categoryName
              }
            />
          }
          name="cetegory_name"
          rules={[
            validation.required(
              `${t(
                tokens.cookieManagement.cookies
                  .categoryNameRequired
              )}`
            ),
          ]}
        >
          <Input disabled={isEdit} />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage
              id={
                tokens.cookieManagement.cookies
                  .categoryDisplayName
              }
            />
          }
          hidden={locale !== 'th'}
          name={['cetegory_label', 'th']}
          rules={[
            validation.required(
              `${t(
                tokens.cookieManagement.cookies
                  .categoryDisplayNameRequired
              )}`
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage
              id={
                tokens.cookieManagement.cookies
                  .categoryDisplayName
              }
            />
          }
          hidden={locale !== 'en'}
          name={['cetegory_label', 'en']}
          rules={[
            validation.required(
              `${t(
                tokens.cookieManagement.cookies
                  .categoryDisplayNameRequired
              )}`
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage
              id={
                tokens.cookieManagement.cookies
                  .categoryColor
              }
            />
          }
          name="background"
          rules={[
            validation.required(
              `${t(
                tokens.cookieManagement.cookies
                  .categoryColorRequired
              )}`
            ),
          ]}
          valuePropName="color"
        >
          <ColorPicker placement="bottomRight" />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage
              id={
                tokens.cookieManagement.cookies
                  .categoryDescription
              }
            />
          }
          hidden={locale !== 'th'}
          name={['description', 'th']}
          rules={[
            validation.required(
              `${t(
                tokens.cookieManagement.cookies
                  .categoryDescriptionRequired
              )}`
            ),
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage
              id={
                tokens.cookieManagement.cookies
                  .categoryDescription
              }
            />
          }
          hidden={locale !== 'en'}
          name={['description', 'en']}
          rules={[
            validation.required(
              `${t(
                tokens.cookieManagement.cookies
                  .categoryDescriptionRequired
              )}`
            ),
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </div>
  );
};
