import { css } from '@emotion/css';
import { Tabs, Tag } from 'antd';

import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetCollectionPoint } from '../../api/get-collection-point';
import { CollectionPointGetScriptAPI } from '../collection-point-get-script-api';
import { CollectionPointGetScriptDirectLink } from '../collection-point-get-script-direct-link';
import { CollectionPointGetScriptEmbedCode } from '../collection-point-get-script-embed-code';
import { CollectionPointGetScriptSDK } from '../collection-point-get-script-sdk';

export type CollectionPointGetScriptProps = {
  open: boolean;
  onCancel: () => void;
  collectionPointId: string;
};

export const CollectionPointGetScript = ({
  open,
  onCancel,
  collectionPointId,
}: CollectionPointGetScriptProps) => {
  const { data } = useGetCollectionPoint(
    collectionPointId
  );

  return (
    <Modal
      title={
        <>
          <IntlMessage id="consentManagement.collectionPoint.table.getScript.title" />
          <span
            className={css`
              color: #72849a;
              font-size: 14px;
              font-weight: 400;
              margin-left: 10px;
              margin-right: 10px;
            `}
          >
            {data?.name}
          </span>
          <span>
            {data?.status === 'publish' ? (
              <Tag color="success">V.{data?.version}</Tag>
            ) : (
              <Tag color="default">
                V.{data?.version} Draft
              </Tag>
            )}
          </span>
        </>
      }
      open={open}
      onCancel={onCancel}
      width={1050}
      footer={false}
    >
      <Tabs
        items={[
          {
            label: (
              <IntlMessage id="consentManagement.collectionPoint.table.getScript.directLink" />
            ),
            key: 'direct-link',
            children: (
              <CollectionPointGetScriptDirectLink
                collectionPointId={collectionPointId}
              />
            ),
          },
          {
            label: (
              <IntlMessage id="consentManagement.collectionPoint.table.getScript.embedCode" />
            ),
            key: 'embed-code',
            children: (
              <CollectionPointGetScriptEmbedCode
                collectionPointId={collectionPointId}
              />
            ),
          },
          {
            label: (
              <IntlMessage id="consentManagement.collectionPoint.table.getScript.api" />
            ),
            key: 'api',
            children: (
              <CollectionPointGetScriptAPI
                collectionPointId={collectionPointId}
              />
            ),
          },
          {
            label: (
              <IntlMessage id="consentManagement.collectionPoint.table.getScript.sdk" />
            ),
            key: 'sdk',
            children: (
              <CollectionPointGetScriptSDK
                collectionPointId={collectionPointId}
              />
            ),
          },
        ]}
      />
    </Modal>
  );
};
