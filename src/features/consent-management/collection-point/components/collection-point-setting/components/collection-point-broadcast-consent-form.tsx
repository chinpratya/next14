import {
  Collapse,
  Typography,
  Switch,
  Row,
  Col,
  Form,
  Input,
} from 'antd';

import { getColLayout } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

const { Panel } = Collapse;

export const CollectionPointBroadcastConsent = () => {
  return (
    <Collapse defaultActiveKey={['1']} className="my-3">
      <Panel
        header={
          <IntlMessage id="consentManagement.collectionPoint.configurationBroadcastConsent.header" />
        }
        key={'1'}
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
              <IntlMessage id="consentManagement.collectionPoint.configurationBroadcastConsent.header" />
            </Typography.Title>
            <Typography.Text>
              <IntlMessage id="consentManagement.collectionPoint.configurationBroadcastConsent.desc" />
            </Typography.Text>
          </Col>
          <Col {...getColLayout([24, 24, 3, 3, 3, 3])}>
            <Form.Item
              name="isBroadcast"
              valuePropName="checked"
              className="text-right"
            >
              <Switch
                checkedChildren={
                  <IntlMessage id="consentManagement.collectionPoint.configurationBroadcastConsent.on" />
                }
                unCheckedChildren={
                  <IntlMessage id="consentManagement.collectionPoint.configurationBroadcastConsent.off" />
                }
              />
            </Form.Item>
          </Col>
          <Col
            {...getColLayout([24, 24, 24, 24, 24, 24])}
          >
            <Form.Item
              shouldUpdate={(prevValues, currentValues) =>
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
      </Panel>
    </Collapse>
  );
};
