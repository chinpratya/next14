import { Drawer } from 'antd';

import { ConsentForm } from '@/shared';
import { IntlMessage } from '@utilComponents/intl-message';

import { ConsentCollectionPointHistory } from '../../types';

export type CollectionPointVersionPreviewProps = {
  open: boolean;
  onClose: () => void;
  data?: ConsentCollectionPointHistory;
};

export const CollectionPointVersionPreview = ({
  open,
  onClose,
  data,
}: CollectionPointVersionPreviewProps) => {
  return (
    <Drawer
      title={
        <IntlMessage id="consentManagement.collectionPoint.table.preview" />
      }
      placement="right"
      open={open}
      onClose={onClose}
      width={1200}
    >
      <ConsentForm
        formItems={
          data?.Template
            ? data?.Template[0]?.template?.formItems
            : []
        }
        isFullHeight
        viewOnly
        formSettings={
          data?.Template
            ? data?.Template[0]?.template?.formSetting
            : undefined
        }
      />
    </Drawer>
  );
};
