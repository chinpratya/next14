import { Card, Form, FormInstance, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { TagsFormItem } from '../../../tags';

export type WorkflowGeneralDataProps = {
  form?: FormInstance;
};

export const WorkflowGeneralData = ({
  form,
}: WorkflowGeneralDataProps) => {
  const { t } = useTranslation();

  return (
    <Card
      title={
        <IntlMessage id="dsarAutomation.setting.workflow.basicInfo.general" />
      }
      bordered={false}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label={
            <IntlMessage id="dsarAutomation.setting.workflow.basicInfo.name" />
          }
          name="name"
          rules={[
            validation.required(
              t(
                'dsarAutomation.setting.workflow.basicInfo.nameRequired'
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
                'dsarAutomation.setting.workflow.basicInfo.tagsRequired'
              )
            ),
          ]}
        />
        <Form.Item
          label={
            <IntlMessage id="dsarAutomation.setting.workflow.basicInfo.description" />
          }
          name="description"
        >
          <Input.TextArea rows={2} />
        </Form.Item>
      </Form>
    </Card>
  );
};
