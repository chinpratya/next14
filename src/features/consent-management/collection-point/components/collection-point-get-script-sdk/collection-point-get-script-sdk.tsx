import {
  CheckOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { useClipboard } from '@mantine/hooks';
import { Button, Card } from 'antd';
import _ from 'lodash';

import { CodePreview } from '@components/code-preview';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetCollectionPointGetScriptSDK } from '../../api/get-collection-point-get-script-sdk';

export type CollectionPointGetScriptSDKProps = {
  collectionPointId: string;
};

export const CollectionPointGetScriptSDK = ({
  collectionPointId,
}: CollectionPointGetScriptSDKProps) => {
  const clipboard = useClipboard();

  const { data, isLoading } =
    useGetCollectionPointGetScriptSDK(collectionPointId);

  const apiURL = JSON.stringify(
    _.get(data, 'apiurl', null),
    null,
    2
  );
  const authorized = JSON.stringify(
    _.get(data, 'authorized', null),
    null,
    2
  );
  const payload = JSON.stringify(
    _.get(data, 'payload', null),
    null,
    2
  );
  const payloadUUID = JSON.stringify(
    _.get(data, 'payloadUUID', null),
    null,
    2
  );

  return (
    <Card
      title={
        <IntlMessage id="consentManagement.collectionPoint.table.getScript.sdk.title" />
      }
      loading={isLoading}
    >
      <Card
        title={
          <IntlMessage id="consentManagement.collectionPoint.table.getScript.sdk.apiurl" />
        }
        extra={
          <Button onClick={() => clipboard.copy(apiURL)}>
            <IntlMessage id="consentManagement.collectionPoint.table.getScript.copy" />{' '}
            {clipboard.copied ? (
              <CheckOutlined className="text-success" />
            ) : (
              <CopyOutlined />
            )}
          </Button>
        }
      >
        <CodePreview disabledCopy={true} code={apiURL} />
      </Card>

      <Card
        title={
          <IntlMessage id="consentManagement.collectionPoint.table.getScript.sdk.authorized" />
        }
        extra={
          <Button
            onClick={() => clipboard.copy(authorized)}
          >
            <IntlMessage id="consentManagement.collectionPoint.table.getScript.copy" />{' '}
            {clipboard.copied ? (
              <CheckOutlined className="text-success" />
            ) : (
              <CopyOutlined />
            )}
          </Button>
        }
      >
        <CodePreview
          disabledCopy={true}
          code={authorized}
        />
      </Card>

      <Card
        title={
          <IntlMessage id="consentManagement.collectionPoint.table.getScript.sdk.payload" />
        }
        extra={
          <Button onClick={() => clipboard.copy(payload)}>
            <IntlMessage id="consentManagement.collectionPoint.table.getScript.copy" />{' '}
            {clipboard.copied ? (
              <CheckOutlined className="text-success" />
            ) : (
              <CopyOutlined />
            )}
          </Button>
        }
      >
        <CodePreview disabledCopy={true} code={payload} />
      </Card>

      <Card
        title={
          <IntlMessage id="consentManagement.collectionPoint.table.getScript.sdk.payloadUUID" />
        }
        extra={
          <Button
            onClick={() => clipboard.copy(payloadUUID)}
          >
            <IntlMessage id="consentManagement.collectionPoint.table.getScript.copy" />{' '}
            {clipboard.copied ? (
              <CheckOutlined className="text-success" />
            ) : (
              <CopyOutlined />
            )}
          </Button>
        }
      >
        <CodePreview
          disabledCopy={true}
          code={payloadUUID}
        />
      </Card>
    </Card>
  );
};
