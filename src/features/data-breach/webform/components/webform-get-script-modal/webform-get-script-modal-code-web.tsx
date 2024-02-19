import {
  CheckOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { useClipboard } from '@mantine/hooks';
import { Button, Card, Col, Row } from 'antd';

import { CodePreview } from '@components/code-preview';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

export type WebFormGetScriptModalCodeWebProps = {
  webformId: string;
};

export const WebformGetScriptModalCodeWeb = ({
  webformId,
}: WebFormGetScriptModalCodeWebProps) => {
  const clipboard = useClipboard();

  const url = `https://portal.beta.onefence.co/data-breach/web-form/${webformId}`;
  const code = `<iframe 
  src='${url}'
  width='100%'
  height='100vh'
  title='onefence'
></iframe>`;

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Card.Meta
            title={
              <IntlMessage id="dsarAutomation.setting.webForm.getScript.web.title" />
            }
            description={
              <IntlMessage id="dsarAutomation.setting.webForm.getScript.web.desc" />
            }
          />
        </Col>
        <Col span={6}>
          <Flex justifyContent="end">
            <Button onClick={() => clipboard.copy(code)}>
              <IntlMessage id="dsarAutomation.setting.webForm.getScript.copy" />{' '}
              {clipboard.copied ? (
                <CheckOutlined className="text-success" />
              ) : (
                <CopyOutlined />
              )}
            </Button>
          </Flex>
        </Col>
        <Col span={24}>
          <CodePreview disabledCopy={true} code={code} />
        </Col>
      </Row>
    </Card>
  );
};
