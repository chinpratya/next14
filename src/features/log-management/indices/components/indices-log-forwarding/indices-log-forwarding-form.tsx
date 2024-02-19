import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Button,
  Checkbox,
  Divider,
  Form,
  FormInstance,
  Input,
  Select,
  Typography,
  InputNumber,
} from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { CYBER_DISABLED_TEXT_COLOR } from '@/config/color';
import { validation } from '@/utils';

import { IndicesLogForwardingCertUpload } from './indices-log-forwarding-cert-upload';

type IndicesLogForwardingProps = {
  form: FormInstance;
};

export const IndicesLogForwarding = ({
  form,
}: IndicesLogForwardingProps) => {
  const { t } = useTranslation();

  const protocolValue = Form.useWatch('protocol', form);

  const onUpload = (key: string, file: UploadFile) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      form.setFieldValue(key, content);
    };
    reader.readAsText(file.originFileObj as File);
  };

  const onValidator = (
    value: string,
    caCert?: string
  ) => {
    if (!!caCert) {
      return Promise.resolve();
    } else if (!value) {
      return Promise.reject(
        <IntlMessage id="logManagement.required" />
      );
    }
    return Promise.resolve();
  };

  return (
    <Form
      layout="vertical"
      form={form}
      className={css`
        .ant-form-item {
          margin-bottom: 16px;
        }
      `}
    >
      <div className="px-4 pt-4">
        <Form.Item
          name="name"
          label={<IntlMessage id="logManagement.name" />}
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
          className="mb-3"
        >
          <Button
            disabled
            style={{ color: CYBER_DISABLED_TEXT_COLOR }}
          >
            Syslog
          </Button>
        </Form.Item>
      </div>

      <Divider className="mt-3" />

      <div className="px-4 pb-4">
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
      </div>

      {protocolValue === 'ssl-tcp' && (
        <>
          <Divider
            className="mt-0"
            style={{ marginBottom: 31 }}
          />

          <div className="px-4 pb-4">
            <Typography.Text strong>
              <IntlMessage id="logManagement.indices.certificate" />
            </Typography.Text>
            <Form.Item
              name="ssl_cacert"
              label={
                <Flex
                  align="center"
                  justify="space-between"
                  className="w-100"
                >
                  <Typography.Text>
                    CA Cert
                  </Typography.Text>
                  <IndicesLogForwardingCertUpload
                    name="ssl_cacert"
                    onUpload={onUpload}
                  />
                </Flex>
              }
              className="mt-3"
            >
              <Input.TextArea
                rows={4}
                style={{ whiteSpace: 'pre' }}
                placeholder="CA Cert"
              />
            </Form.Item>

            <Form.Item
              shouldUpdate={(prevValues, curValues) => {
                return (
                  prevValues?.ssl_cacert !==
                    curValues?.ssl_cacert ||
                  prevValues?.ssl_verify !==
                    curValues?.ssl_verify
                );
              }}
              noStyle
            >
              {(form) => {
                const { ssl_cacert, ssl_verify } =
                  form.getFieldsValue();
                return (
                  <>
                    <Form.Item
                      name="ssl_cert"
                      required={!ssl_cacert && ssl_verify}
                      rules={
                        ssl_verify
                          ? [
                              {
                                validator: (_, value) =>
                                  onValidator(
                                    value,
                                    ssl_cacert
                                  ),
                              },
                            ]
                          : []
                      }
                      label={
                        <Flex
                          align="center"
                          justify="space-between"
                          className="w-100"
                        >
                          <Typography.Text>
                            SSL Cert
                          </Typography.Text>
                          <IndicesLogForwardingCertUpload
                            name="ssl_cert"
                            onUpload={onUpload}
                          />
                        </Flex>
                      }
                      className="mt-3"
                    >
                      <Input.TextArea
                        rows={4}
                        style={{ whiteSpace: 'pre' }}
                        placeholder="SSL Cert"
                      />
                    </Form.Item>

                    <Form.Item
                      name="ssl_key"
                      required={!ssl_cacert && ssl_verify}
                      rules={
                        ssl_verify
                          ? [
                              {
                                validator: (_, value) =>
                                  onValidator(
                                    value,
                                    ssl_cacert
                                  ),
                              },
                            ]
                          : []
                      }
                      label={
                        <Flex
                          align="center"
                          justify="space-between"
                          className="w-100"
                        >
                          <Typography.Text>
                            SSL Key
                          </Typography.Text>
                          <IndicesLogForwardingCertUpload
                            name="ssl_key"
                            onUpload={onUpload}
                          />
                        </Flex>
                      }
                      className="mt-3"
                    >
                      <Input.TextArea
                        rows={4}
                        style={{ whiteSpace: 'pre' }}
                        placeholder="SSL Key"
                      />
                    </Form.Item>
                  </>
                );
              }}
            </Form.Item>

            <Form.Item
              name="ssl_key_passphrase"
              label="Passphrase Key"
            >
              <Input placeholder="Passphrase Key" />
            </Form.Item>

            <Form.Item
              name="ssl_verify"
              label="Verify TLS"
              valuePropName="checked"
              initialValue={false}
            >
              <Checkbox>
                Enable That TLS Peer’s Server Ceriticate
                Is Valid
              </Checkbox>
            </Form.Item>
          </div>
        </>
      )}
    </Form>
  );
};
