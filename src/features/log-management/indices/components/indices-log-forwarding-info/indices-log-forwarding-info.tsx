import { css } from '@emotion/css';
import {
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { getColLayout, validation } from '@/utils';

import { AddFilterForm } from '../indices-create-forwarding-modal/add-filter-form';
import { ConfigCertificateForm } from '../indices-create-forwarding-modal/config-certificate-form';

type IndicesLogForwardingInfoProps = {
  form: FormInstance;
  isEditor?: boolean;
};

export const IndicesLogForwardingInfo = ({
  form,
  isEditor,
}: IndicesLogForwardingInfoProps) => {
  const { t } = useTranslation();

  const protocolValue = Form.useWatch('protocol', form);

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={!isEditor}
      className={css`
        label {
          width: 100%;
        }
      `}
    >
      <Row gutter={[16, 0]}>
        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage id="logManagement.indices.dataGeneral" />
            }
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
              name="type"
              label="Remote Server Type"
              className="mb-3"
              initialValue="Syslog"
            >
              <Input
                placeholder="ระบุ Remote Server Type"
                disabled
              />
            </Form.Item>
          </Card>

          <Card
            title={
              <IntlMessage id="logManagement.indices.forwarding.condition" />
            }
          >
            <AddFilterForm form={form} collapse={false} />
          </Card>
        </Col>

        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage id="logManagement.indices.forwarding.targetServer" />
            }
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
                    field: t(
                      'logManagement.indices.host'
                    ),
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
                    field: t(
                      'logManagement.indices.port'
                    ),
                  }) as string
                }
                className="w-100"
              />
            </Form.Item>
            <Form.Item
              name="protocol"
              label={
                <IntlMessage id="logManagement.indices.protocol" />
              }
              rules={[
                validation.required(
                  <IntlMessage id="logManagement.required" />
                ),
              ]}
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
          </Card>

          {protocolValue === 'ssl-tcp' && (
            <Card
              title={
                <IntlMessage id="logManagement.indices.certificate" />
              }
            >
              <ConfigCertificateForm
                form={form}
                collapse={false}
              />
            </Card>
          )}
        </Col>
      </Row>
    </Form>
  );
};
