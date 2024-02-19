import { css } from '@emotion/css';
import { Col, Form, FormInstance, Row } from 'antd';

import { CYBER_DISABLED_TEXT_COLOR } from '@/config/color';
import { getColLayout } from '@/utils';

import { NotificationDetail } from './notification-detail';
import { NotificationSetting } from './notification-setting';

type NotificationSettingFormProps = {
  form: FormInstance;
  isEditor?: boolean;
  isDefault?: boolean;
};

export const NotificationSettingForm = ({
  form,
  isDefault,
  isEditor,
}: NotificationSettingFormProps) => {
  const type = Form.useWatch('provider', form);

  const getColLayoutNotificationSetting = () => {
    if (type === 'EMAIL')
      return {
        ...getColLayout([24, 24, 24, 12, 12, 12]),
      };
    return { ...getColLayout([24, 24, 24, 24, 24, 24]) };
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className={css`
        .ant-input-disabled,
        .ant-input-number-disabled,
        .ant-select-disabled.ant-select:not(
            .ant-select-customize-input
          )
          .ant-select-selector {
          color: ${CYBER_DISABLED_TEXT_COLOR};
        }
      `}
    >
      <Row gutter={[16, 16]}>
        <Col
          {...getColLayoutNotificationSetting()}
          className={css`
            .ant-form-item {
              width: ${type === 'EMAIL' ? '100%' : '50%'};
            }

            @media only screen and (max-width: 992px) {
              .ant-form-item {
                width: 100% !important;
              }
            }
          `}
        >
          <NotificationSetting
            type={type}
            isEditor={isEditor}
            isDefault={isDefault}
          />
        </Col>
        {type === 'EMAIL' && (
          <Col
            {...getColLayout([24, 24, 24, 12, 12, 12])}
          >
            <NotificationDetail form={form} />
          </Col>
        )}
      </Row>
    </Form>
  );
};
