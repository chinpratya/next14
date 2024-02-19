import {
  Collapse,
  Typography,
  Switch,
  Row,
  Col,
  Form,
} from 'antd';

import { getColLayout } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

const { Panel } = Collapse;

export const CollectionPointDoubleOptIn = () => {
  return (
    <Collapse defaultActiveKey={['1']} className="my-3">
      <Panel
        header={
          <IntlMessage id="consentManagement.collectionPoint.configurationDoubleOptIn.header" />
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
              <IntlMessage id="consentManagement.collectionPoint.configurationDoubleOptIn.header" />
            </Typography.Title>
            <Typography.Text>
              <IntlMessage id="consentManagement.collectionPoint.configurationDoubleOptIn.desc" />
            </Typography.Text>
          </Col>
          <Col {...getColLayout([24, 24, 3, 3, 3, 3])}>
            <Form.Item
              name="doubleOptIn"
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
      </Panel>
    </Collapse>
  );
};
