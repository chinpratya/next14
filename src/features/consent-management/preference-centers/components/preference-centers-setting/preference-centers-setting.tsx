import {
  Collapse,
  Form,
  FormInstance,
  Switch,
  Typography,
} from 'antd';

import { DescriptionBlock } from '@components/description-block';
import { IntlMessage } from '@utilComponents/intl-message';

type PreferenceCentersSettingProps = {
  form: FormInstance;
};

export const PreferenceCentersSetting = ({
  form,
}: PreferenceCentersSettingProps) => {
  return (
    <Form form={form}>
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel
          header={
            <IntlMessage id="consentManagement.preferenceCenters.detail.setting.header" />
          }
          key="1"
        >
          <DescriptionBlock
            title={
              <IntlMessage id="consentManagement.preferenceCenters.detail.setting.title" />
            }
            divider={false}
            className="pl-4"
            description={
              <Typography.Text className="text-gray-light">
                <IntlMessage id="consentManagement.preferenceCenters.detail.setting.desc" />
              </Typography.Text>
            }
            extra={
              <Form.Item
                name="isCreateNewUser"
                valuePropName="checked"
                className="mb-0"
                initialValue={false}
              >
                <Switch
                  checkedChildren={
                    <IntlMessage id="consentManagement.preferenceCenters.detail.setting.on" />
                  }
                  unCheckedChildren={
                    <IntlMessage id="consentManagement.preferenceCenters.detail.setting.off" />
                  }
                />
              </Form.Item>
            }
          />
        </Collapse.Panel>
      </Collapse>
    </Form>
  );
};
