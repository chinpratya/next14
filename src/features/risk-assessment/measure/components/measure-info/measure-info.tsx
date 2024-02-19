import { Card, Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { TagsFormItem } from '../../../tags';

export type MeasureInfoProps = {
  form?: FormInstance;
};

export const MeasureInfo = ({
  form,
}: MeasureInfoProps) => {
  const { t } = useTranslation();

  const editPermission = usePermission({
    moduleName: 'assessment',
    policies: [
      permissions[
        'pdpakit:assessment:assessmentrisk:update'
      ],
    ],
  });
  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        disabled={!editPermission.isAllow}
      >
        <Form.Item
          label={
            <IntlMessage
              id={tokens.riskAssessment.riskMeasures.name}
            />
          }
          name="name"
          rules={[
            validation.required(
              t(
                tokens.riskAssessment.riskMeasures
                  .nameRequired
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <TagsFormItem
          name="tagID"
          disabled={!editPermission.isAllow}
        />
      </Form>
    </Card>
  );
};
