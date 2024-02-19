import { useToggle } from '@mantine/hooks';
import {
  Collapse,
  Typography,
  Row,
  Col,
  Button,
  Form,
  Switch,
  InputNumber,
} from 'antd';

import { getColLayout } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { CollectionPointReConsentModal } from './collection-point-re-consent-modal';

const { Panel } = Collapse;

export type CollectionPointReConsentProps = {
  collectionPointId: string;
};

export const CollectionPointReConsent = ({
  collectionPointId,
}: CollectionPointReConsentProps) => {
  const [openReConsent, toggleReConsent] = useToggle();

  return (
    <>
      <Collapse
        defaultActiveKey={['re-consent']}
        className="my-3"
      >
        <Panel
          header={
            <IntlMessage id="consentManagement.collectionPoint.configurationReConsent.header" />
          }
          key="re-consent"
        >
          <Row
            justify={'space-between'}
            align={'middle'}
            gutter={[10, 10]}
          >
            <Col
              {...getColLayout([24, 24, 15, 15, 15, 15])}
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
            justify={'space-between'}
            align={'middle'}
            gutter={[10, 10]}
          >
            <Col
              {...getColLayout([24, 24, 15, 15, 15, 15])}
              style={{
                wordWrap: 'break-word',
                marginTop: '10px',
              }}
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
              style={{
                marginTop: '10px',
              }}
            >
              <Form.Item
                name="isReconsent"
                valuePropName="checked"
                className="text-right"
              >
                <Switch
                  checkedChildren={
                    <IntlMessage id="consentManagement.collectionPoint.configurationDoubleOptIn.on" />
                  }
                  unCheckedChildren={
                    <IntlMessage id="consentManagement.collectionPoint.configurationDoubleOptIn.off" />
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
        </Panel>
      </Collapse>
      <CollectionPointReConsentModal
        open={openReConsent}
        onClose={() => toggleReConsent()}
        collectionPointId={collectionPointId}
      />
    </>
  );
};
