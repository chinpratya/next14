import { Card, Form, FormInstance, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { TagsFormItem } from '../../../tags';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';

export type WorkflowGeneralDataProps = {
  form?: FormInstance;
  permissions?: boolean;
};

export const WorkflowGeneralData = ({
  form,
  permissions = true,
}: WorkflowGeneralDataProps) => {
  const { t } = useTranslation();

  return (
    <Card
      title={
        <IntlMessage
          id={tokens.dataBreach.responsePlan.basicInfo}
        />
      }
    >
      <Form
        layout="vertical"
        form={form}
        disabled={!permissions}
      >
        <Form.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.responsePlan.name}
            />
          }
          name="name"
          rules={[
            validation.required(
              t(
                tokens.dataBreach.responsePlan
                  .nameRequired
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <TagsFormItem
          name="tagID"
          rules={[
            validation.required(
              t(
                tokens.dataBreach.responsePlan
                  .tagsRequired
              )
            ),
          ]}
          disabled={!permissions}
        />
        <Form.Item
          label={
            <IntlMessage
              id={
                tokens.dataBreach.responsePlan.description
              }
            />
          }
          name="description"
        >
          <Input.TextArea rows={2} />
        </Form.Item>
      </Form>
    </Card>
  );
};
