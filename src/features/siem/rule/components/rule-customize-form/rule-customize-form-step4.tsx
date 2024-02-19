import { QuestionCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Form,
  Tooltip,
  Typography,
  Input,
  Select,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import validation from '@/utils/validation';

import { useListNotify } from '../../../indices';

type RuleCustomizeFormStep4Props = {
  isEditor: boolean;
};

export const RuleCustomizeFormStep4 = ({
  isEditor,
}: RuleCustomizeFormStep4Props) => {
  const { t } = useTranslation();
  const listNotify = useListNotify();

  return (
    <FallbackError isError={listNotify.isError}>
      <div className="pl-3">
        <Typography.Title
          level={3}
          className={`mb-4 ${css`
            display: flex;
            align-items: center;
            gap: 4px;
          `}`}
        >
          <IntlMessage id="siem.detectionRuleCreateAndEditRule.stepFour" />
          <Tooltip
            title={
              <IntlMessage id="siem.detectionRuleCreateAndEditRule.stepFourTooltip" />
            }
          >
            <QuestionCircleOutlined
              className={css`
                margin-left: 5px;
                font-size: 12px;
              `}
            />
          </Tooltip>
        </Typography.Title>

        <Form.Item
          label={
            <IntlMessage id="siem.detectionRuleCreateAndEditRule.stepFourDescription" />
          }
          name={['notify', 'message']}
        >
          <Input.TextArea
            rows={5}
            readOnly={!isEditor}
            placeholder={
              t('logManagement.placeholder', {
                field: t(
                  'siem.detectionRuleCreateAndEditRule.stepFourDescription'
                ),
              }) as string
            }
          />
        </Form.Item>

        <Form.Item
          label={
            <IntlMessage id="siem.detectionRuleCreateAndEditRule.recipient" />
          }
          name={['notify', 'recipients']}
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
          ]}
        >
          <Select
            mode="tags"
            options={listNotify.data?.data ?? []}
            loading={listNotify.isLoading}
            disabled={!isEditor}
            placeholder={
              t('logManagement.placeholder', {
                field: t(
                  'siem.detectionRuleCreateAndEditRule.recipient'
                ),
              }) as string
            }
          />
        </Form.Item>
      </div>
    </FallbackError>
  );
};
