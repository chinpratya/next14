import { Flex } from '@mantine/core';
import {
  Checkbox,
  Collapse,
  Form,
  FormInstance,
  Input,
  Typography,
} from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

import { IntlMessage } from '@/components/util-components/intl-message';

import { IndicesLogForwardingCertUpload } from '../indices-log-forwarding/indices-log-forwarding-cert-upload';

type ConfigCertificateFormProps = {
  form: FormInstance;
  collapse?: boolean;
};

export const ConfigCertificateForm = ({
  form,
  collapse = true,
}: ConfigCertificateFormProps) => {
  const FormValue = () => {
    return (
      <>
        <Form.Item
          name="ssl_cacert"
          label={
            <Flex
              align="center"
              justify="space-between"
              className="w-100"
            >
              <Typography.Text>CA Cert</Typography.Text>
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
              curValues?.ssl_cacert
            );
          }}
          noStyle
        >
          {(form) => {
            const { ssl_cacert } = form.getFieldsValue();
            return (
              <>
                <Form.Item
                  name="ssl_cert"
                  required={!ssl_cacert}
                  rules={[
                    {
                      validator: (_, value) =>
                        onValidator(value, ssl_cacert),
                    },
                  ]}
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
                  required={!ssl_cacert}
                  rules={[
                    {
                      validator: (_, value) =>
                        onValidator(value, ssl_cacert),
                    },
                  ]}
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
          className="mb-0"
        >
          <Checkbox>
            Enable That TLS Peer’s Server Ceriticate Is
            Valid
          </Checkbox>
        </Form.Item>
      </>
    );
  };

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
    <>
      {collapse ? (
        <Collapse activeKey="certificate">
          <Collapse.Panel
            header={
              <Typography.Text strong>
                <IntlMessage id="logManagement.indices.certificate" />
              </Typography.Text>
            }
            key="certificate"
            showArrow={false}
          >
            <FormValue />
          </Collapse.Panel>
        </Collapse>
      ) : (
        <FormValue />
      )}
    </>
  );
};
