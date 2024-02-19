import { css } from '@emotion/css';
import {
  Form,
  DatePicker,
  Col,
  Row,
  Typography,
  Switch,
  Divider,
  Card,
} from 'antd';
import moment from 'moment';

import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetSetting } from '../../api/get-assessment-setting';

export type AssessmentSettingProps = {
  assessmentID: string;
};

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

export const AssessmentSetting = ({
  assessmentID,
}: AssessmentSettingProps) => {
  const [form] = Form.useForm();
  const { data, isLoading, isError } = useGetSetting({
    assessmentId: assessmentID,
  });

  return (
    <FallbackError isError={isError}>
      <Card bordered={false} loading={isLoading}>
        <Col>
          <Typography.Title level={4}>
            <IntlMessage id="compliancePortal.result.detail.setting.isSchedule" />
          </Typography.Title>
          <Row justify="space-between">
            <Typography.Paragraph>
              <IntlMessage id="compliancePortal.result.detail.setting.isSchedule" />
            </Typography.Paragraph>
            <Switch
              checkedChildren={
                <IntlMessage id="compliancePortal.result.detail.setting.isSchedule.true" />
              }
              unCheckedChildren={
                <IntlMessage id="compliancePortal.result.detail.setting.isSchedule.false" />
              }
              disabled
              checked={data?.isSchedule}
            />
          </Row>

          <Divider />
          {data?.isSchedule ? (
            <Form layout="vertical" form={form}>
              <Form.Item
                label={
                  <IntlMessage id="compliancePortal.result.detail.setting.setTime" />
                }
                name="name"
              >
                <RangePicker
                  className={css`
                    width: 100%;

                    .ant-picker-input > input[disabled] {
                      background-color: #f7f7f8 !important;
                    }
                  `}
                  defaultValue={[
                    moment(data?.startDt, dateFormat),
                    moment(data?.endDt, dateFormat),
                  ]}
                  disabled
                />
              </Form.Item>
            </Form>
          ) : null}
        </Col>
      </Card>
    </FallbackError>
  );
};
