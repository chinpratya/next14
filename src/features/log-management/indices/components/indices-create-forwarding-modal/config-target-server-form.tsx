import {
  Button,
  Collapse,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { CYBER_DISABLED_TEXT_COLOR } from '@/config/color';
import { validation } from '@/utils';

const { Panel } = Collapse;

export const ConfigTargetServerForm = () => {
  const { t } = useTranslation();

  return (
    <>
      <Collapse activeKey="generalSetting">
        <Panel
          header={
            <Typography.Text strong>
              <IntlMessage id="logManagement.indices.forwarding.generalSetting" />
            </Typography.Text>
          }
          key="generalSetting"
          showArrow={false}
        >
          <Form.Item
            name="name"
            label={
              <IntlMessage id="logManagement.name" />
            }
            rules={[
              validation.required(
                <IntlMessage id="logManagement.required" />
              ),
              validation.trim(),
            ]}
          >
            <Input
              placeholder={
                t('logManagement.placeholder', {
                  field: t('logManagement.name'),
                }) as string
              }
            />
          </Form.Item>

          <Form.Item
            label="Remote Server Type"
            className="mb-0"
          >
            <Button
              disabled
              style={{
                color: CYBER_DISABLED_TEXT_COLOR,
              }}
            >
              Syslog
            </Button>
          </Form.Item>
        </Panel>
      </Collapse>

      <Collapse
        activeKey="serverSetting"
        className="mt-4"
      >
        <Panel
          header={
            <Typography.Text strong>
              <IntlMessage id="logManagement.indices.forwarding.targetServerSetting" />
            </Typography.Text>
          }
          key="serverSetting"
          showArrow={false}
        >
          <Form.Item
            name="host"
            label={
              <IntlMessage id="logManagement.indices.host" />
            }
            rules={[
              validation.required(
                <IntlMessage id="logManagement.required" />
              ),
            ]}
          >
            <Input
              placeholder={
                t('logManagement.placeholder', {
                  field: t('logManagement.indices.host'),
                }) as string
              }
            />
          </Form.Item>
          <Form.Item
            name="port"
            label={
              <IntlMessage id="logManagement.indices.port" />
            }
            rules={[
              validation.required(
                <IntlMessage id="logManagement.required" />
              ),
            ]}
          >
            <InputNumber
              placeholder={
                t('logManagement.placeholder', {
                  field: t('logManagement.indices.port'),
                }) as string
              }
              className="w-100"
            />
          </Form.Item>
          <Form.Item
            name="protocol"
            className="mb-0"
            label={
              <IntlMessage id="logManagement.indices.protocol" />
            }
            rules={[
              validation.required(
                <IntlMessage id="logManagement.required" />
              ),
            ]}
            initialValue="udp"
          >
            <Select
              placeholder={
                t('logManagement.selectPlaceholder', {
                  field: t(
                    'logManagement.indices.protocol'
                  ),
                }) as string
              }
              options={[
                { label: 'TCP', value: 'tcp' },
                { label: 'UDP', value: 'udp' },
                { label: 'SSL/TCP', value: 'ssl-tcp' },
              ]}
            />
          </Form.Item>
        </Panel>
      </Collapse>
    </>
  );
};
