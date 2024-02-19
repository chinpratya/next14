import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

export const TagInfo = () => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={
          <IntlMessage
            id={tokens.riskAssessment.tags.name}
          />
        }
        name="name"
        rules={[
          validation.required(
            t(tokens.riskAssessment.tags.nameRequired)
          ),
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
};
