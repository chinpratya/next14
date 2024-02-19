import {
  Badge,
  Form,
  Input,
  Select,
  Typography,
} from 'antd';
import _ from 'lodash';

import { tokens } from '@/lang';
import { useTheme } from '@/stores/theme';
import { IntlMessage } from '@utilComponents/intl-message';

import { CookieCategory } from '../../../types';

export type CookiesEditFormProps = {
  language: string;
  categories?: CookieCategory[];
};

export const CookiesEditForm = ({
  language,
  categories,
}: CookiesEditFormProps) => {
  const { locale } = useTheme();

  return (
    <>
      <Form.Item
        name="name"
        label={
          <IntlMessage
            id={tokens.cookieManagement.cookies.name}
          />
        }
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="domain"
        label={
          <IntlMessage
            id={tokens.cookieManagement.cookies.domain}
          />
        }
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="durationDisplay"
        label={
          <IntlMessage
            id={tokens.cookieManagement.cookies.duration}
          />
        }
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="category"
        label={
          <IntlMessage
            id={tokens.cookieManagement.cookies.category}
          />
        }
      >
        <Select
          options={categories?.map((category) => ({
            label: (
              <>
                <Badge
                  color={category.background}
                  className="mr-2"
                />
                <Typography.Text>
                  {_.get(category.cetegory_label, locale)}
                </Typography.Text>
              </>
            ),
            value: category.cetegory_name,
          }))}
        />
      </Form.Item>
      <Form.Item
        name={['description', language]}
        label={
          <IntlMessage
            id={tokens.cookieManagement.cookies.purpose}
          />
        }
      >
        <Input.TextArea rows={4} />
      </Form.Item>
    </>
  );
};
