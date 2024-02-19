import { useToggle } from '@mantine/hooks';
import {
  FormInstance,
  Form,
  Skeleton,
  Collapse,
  Col,
  Row,
  Typography,
  Switch,
  Input,
  Button,
  InputNumber,
} from 'antd';
import { useEffect } from 'react';

import { tokens } from '@/lang';
import { getColLayout } from '@/utils';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetCollectionPointPrivacyNotice } from '../../api/get-collection-point-privacy-notice';

import { CollectionPointReConsentModal } from './components/collection-point-re-consent-modal';

export type CollectionPointSettingProps = {
  collectionPointsId: string;
  form: FormInstance;
};

export const CollectionPointSetting = ({
  collectionPointsId,
  form,
}: CollectionPointSettingProps) => {
  const [openReConsent, toggleReConsent] = useToggle();

  const { data, isLoading, isError } =
    useGetCollectionPointPrivacyNotice(
      collectionPointsId
    );

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <FallbackError isError={isError}>
      <Form form={form} layout="vertical">
        <Collapse
          defaultActiveKey={[1, 2, 3, 4]}
          className="my-3"
        >
          <Collapse.Panel
            header={
              <IntlMessage id="consentManagement.collectionPoint.configurationInformation.header" />
            }
            key={1}
          >
            <Row
              gutter={[16, 0]}
              justify="space-between"
              align="middle"
            >
              <Col
                {...getColLayout([
                  24, 24, 15, 15, 15, 15,
                ])}
                style={{ wordWrap: 'break-word' }}
              >
                <Typography.Text>
                  <IntlMessage id="consentManagement.collectionPoint.configurationInformation.desc" />
                </Typography.Text>
              </Col>
              <Col
                {...getColLayout([24, 24, 3, 3, 3, 3])}
              >
                <Form.Item
                  name="isSentLink"
                  valuePropName="checked"
                  className="text-right"
                >
                  <Switch
                    checkedChildren={
                      <IntlMessage
                        id={tokens.common.on}
                      />
                    }
                    unCheckedChildren={
                      <IntlMessage
                        id={tokens.common.off}
                      />
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </Collapse.Panel>
          <Collapse.Panel
            header={
              <IntlMessage id="consentManagement.collectionPoint.configurationInformation.header" />
            }
            key={2}
          >
            <Row
              gutter={[16, 0]}
              justify="space-between"
              align="middle"
            >
              <Col
                {...getColLayout([
                  24, 24, 15, 15, 15, 15,
                ])}
                style={{ wordWrap: 'break-word' }}
              >
                <Typography.Title level={4}>
                  <IntlMessage id="consentManagement.collectionPoint.configurationDoubleOptIn.header" />
                </Typography.Title>
                <Typography.Text>
                  <IntlMessage id="consentManagement.collectionPoint.configurationDoubleOptIn.desc" />
                </Typography.Text>
              </Col>
              <Col
                {...getColLayout([24, 24, 3, 3, 3, 3])}
              >
                <Form.Item
                  name="doubleOptIn"
                  valuePropName="checked"
                  className="text-right"
                >
                  <Switch
                    checkedChildren={
                      <IntlMessage
                        id={tokens.common.on}
                      />
                    }
                    unCheckedChildren={
                      <IntlMessage
                        id={tokens.common.off}
                      />
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </Collapse.Panel>
          <Collapse.Panel
            header={
              <IntlMessage id="consentManagement.collectionPoint.configurationInformation.header" />
            }
            key={3}
          >
            <Row
              gutter={[16, 0]}
              justify="space-between"
              align="middle"
            >
              <Col
                {...getColLayout([
                  24, 24, 15, 15, 15, 15,
                ])}
                style={{ wordWrap: 'break-word' }}
              >
                <Typography.Title level={4}>
                  <IntlMessage id="consentManagement.collectionPoint.configurationReConsent.header" />
                </Typography.Title>
                <Typography.Text>
                  <IntlMessage id="consentManagement.collectionPoint.configurationReConsent.desc" />
                </Typography.Text>
              </Col>
              <Col
                {...getColLayout([24, 24, 3, 3, 3, 3])}
                style={{
                  position: 'relative',
                }}
              >
                <Button
                  onClick={() => toggleReConsent()}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: -20,
                  }}
                >
                  <IntlMessage id="consentManagement.collectionPoint.configurationReConsent.button" />
                </Button>
              </Col>
            </Row>
            <Row
              gutter={[16, 0]}
              justify="space-between"
              align="middle"
            >
              <Col
                {...getColLayout([
                  24, 24, 15, 15, 15, 15,
                ])}
                style={{ wordWrap: 'break-word' }}
              >
                <Typography.Title level={4}>
                  <IntlMessage id="consentManagement.collectionPoint.configurationReConsent.setConsentPeriod" />
                </Typography.Title>
                <Typography.Text>
                  <IntlMessage id="consentManagement.collectionPoint.configurationReConsent.setConsentPeriod.des" />
                </Typography.Text>
              </Col>
              <Col
                {...getColLayout([24, 24, 3, 3, 3, 3])}
              >
                <Form.Item
                  name="isReconsent"
                  valuePropName="checked"
                  className="text-right"
                >
                  <Switch
                    checkedChildren={
                      <IntlMessage
                        id={tokens.common.on}
                      />
                    }
                    unCheckedChildren={
                      <IntlMessage
                        id={tokens.common.off}
                      />
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              shouldUpdate={(prevValues, currentValues) =>
                prevValues?.isReconsent !==
                currentValues?.isReconsent
              }
              noStyle
            >
              {({ getFieldValue }) => {
                const isReconsent =
                  getFieldValue('isReconsent');
                if (isReconsent) {
                  return (
                    <Form.Item
                      name="reconsentDate"
                      label={
                        <IntlMessage id="consentManagement.collectionPoint.configurationReConsent.setConsentPeriod.request" />
                      }
                      className="mt-2"
                    >
                      <InputNumber addonAfter={'วัน'} />
                    </Form.Item>
                  );
                }
              }}
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel
            header={
              <IntlMessage id="consentManagement.collectionPoint.configurationInformation.header" />
            }
            key={4}
          >
            <Row
              gutter={[16, 0]}
              justify="space-between"
              align="middle"
            >
              <Col
                {...getColLayout([
                  24, 24, 15, 15, 15, 15,
                ])}
                style={{ wordWrap: 'break-word' }}
              >
                <Typography.Title level={4}>
                  <IntlMessage id="consentManagement.collectionPoint.configurationBroadcastConsent.header" />
                </Typography.Title>
                <Typography.Text>
                  <IntlMessage id="consentManagement.collectionPoint.configurationBroadcastConsent.desc" />
                </Typography.Text>
              </Col>
              <Col
                {...getColLayout([24, 24, 3, 3, 3, 3])}
              >
                <Form.Item
                  name="isBroadcast"
                  valuePropName="checked"
                  className="text-right"
                >
                  <Switch
                    checkedChildren={
                      <IntlMessage
                        id={tokens.common.on}
                      />
                    }
                    unCheckedChildren={
                      <IntlMessage
                        id={tokens.common.off}
                      />
                    }
                  />
                </Form.Item>
              </Col>
              <Col
                {...getColLayout([
                  24, 24, 24, 24, 24, 24,
                ])}
              >
                <Form.Item
                  shouldUpdate={(
                    prevValues,
                    currentValues
                  ) =>
                    prevValues.isBroadcast !==
                    currentValues.isBroadcast
                  }
                  noStyle
                >
                  {({ getFieldValue }) => {
                    if (!getFieldValue('isBroadcast')) {
                      return null;
                    }

                    return (
                      <Form.Item
                        label={
                          <IntlMessage id="consentManagement.collectionPoint.configurationBroadcastConsent.broadcastURL" />
                        }
                        name="broadcastURL"
                      >
                        <Input placeholder="กรุณากรอกลิงก์ API" />
                      </Form.Item>
                    );
                  }}
                </Form.Item>
              </Col>
            </Row>
          </Collapse.Panel>
        </Collapse>
      </Form>
      <CollectionPointReConsentModal
        open={openReConsent}
        onClose={() => toggleReConsent()}
        collectionPointId={collectionPointsId}
      />
    </FallbackError>
  );
};
