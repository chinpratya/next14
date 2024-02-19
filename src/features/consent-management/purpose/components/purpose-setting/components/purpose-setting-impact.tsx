import {
  Card,
  Form,
  Input,
  Radio,
  FormInstance,
} from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

type PurposeSettingImpactProps = {
  form: FormInstance;
  dataIsEffect?: boolean;
};

export const PurposeSettingImpact = ({
  form,
  dataIsEffect,
}: PurposeSettingImpactProps) => {
  const { t } = useTranslation();
  const [isEffect, setIsEffect] = useState(
    dataIsEffect as boolean
  );

  return (
    <Card
      title={
        <IntlMessage id="consentManagement.purpose.customPurpose.effect" />
      }
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          effect_description: '',
        }}
      >
        <Form.Item
          label={
            <IntlMessage id="consentManagement.purpose.customPurpose.effectOrNot" />
          }
          name="isEffect"
          rules={[
            validation.required(
              t(
                'consentManagement.purpose.customPurpose.effectOrNotRequired'
              )
            ),
          ]}
        >
          <Radio.Group
            value={isEffect}
            onChange={(e) => setIsEffect(e.target.value)}
          >
            <Radio
              value={true}
              className="text-capitalize"
            >
              {' '}
              <IntlMessage id="consentManagement.purpose.customPurpose.affect" />
            </Radio>
            <Radio
              value={false}
              className="text-capitalize"
            >
              {' '}
              <IntlMessage id="consentManagement.purpose.customPurpose.doesNotAffect" />
            </Radio>
          </Radio.Group>
        </Form.Item>
        {isEffect === true && (
          <Form.Item
            label={
              <IntlMessage id="consentManagement.purpose.customPurpose.identifyEffects" />
            }
            name="effectDescription"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        )}
      </Form>
    </Card>
  );
};
