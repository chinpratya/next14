import { QuestionCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Form,
  Select,
  Tooltip,
  Typography,
  Row,
  InputNumber,
  FormInstance,
} from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import validation from '@/utils/validation';

import { RuleInfo } from '../../types';

import { unitOptions } from './select-option';

type RuleCustomizeFormStep3Props = {
  data?: RuleInfo;
  form: FormInstance;
  isEditor: boolean;
};

export const RuleCustomizeFormStep3 = ({
  data,
  isEditor,
}: RuleCustomizeFormStep3Props) => {
  const { t } = useTranslation();

  const checkUnit = (unit: string) => {
    switch (unit) {
      case 'minute':
        return { min: 5, max: 59 };
      case 'hour':
        return { min: 1, max: 23 };
      default:
        return { min: 1, max: 1 };
    }
  };

  const [validate, setValidate] = useState(
    checkUnit(
      data?.components[0].trigger.every.unit as string
    )
  );

  const onChange = (value: string) => {
    setValidate(checkUnit(value));
  };

  return (
    <div className="pl-3">
      <Typography.Title
        level={3}
        className={`mb-4 ${css`
          display: flex;
          align-items: center;
          gap: 4px;
        `}`}
      >
        <IntlMessage id="siem.detectionRuleCreateAndEditRule.stepThree" />
        <Tooltip title="Step 3 Detection time">
          <QuestionCircleOutlined
            className={css`
              margin-left: 5px;
              font-size: 12px;
            `}
          />
        </Tooltip>
      </Typography.Title>

      <Row
        key="detection time"
        className={`${css`
          gap: 20px;
        `} my-4`}
        align="bottom"
      >
        <Form.Item
          label={
            <IntlMessage id="siem.detectionRuleCreateAndEditRule.detectionTime" />
          }
          name={[
            'components',
            0,
            'trigger',
            'every',
            'value',
          ]}
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
          ]}
        >
          <InputNumber
            className={css`
              width: 200px !important;
            `}
            min={
              data?.type === 'STANDARD' ? 0 : validate.min
            }
            max={validate.max}
            readOnly={!isEditor}
            placeholder={
              t('logManagement.placeholder', {
                field: t(
                  'siem.detectionRuleCreateAndEditRule.detectionTime'
                ),
              }) as string
            }
          />
        </Form.Item>

        <Form.Item
          name={[
            'components',
            0,
            'trigger',
            'every',
            'unit',
          ]}
          initialValue="hour"
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
          ]}
        >
          <Select
            className={css`
              width: 150px !important;
            `}
            options={unitOptions.map((item) => ({
              ...item,
              label: <IntlMessage id={item.key} />,
            }))}
            onChange={onChange}
            disabled={!isEditor}
          />
        </Form.Item>
      </Row>
    </div>
  );
};
