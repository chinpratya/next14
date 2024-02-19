import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useToggle } from '@/hooks';

import { IndicesCreateForwardingModal } from '../indices-create-forwarding-modal';

export const IndicesLogForwardingExtra = () => {
  const toggle = useToggle();
  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined className="mr-2" />}
        onClick={toggle.create}
      >
        <IntlMessage id="logManagement.create" />
      </Button>

      <IndicesCreateForwardingModal
        open={toggle.openCreate}
        onCancel={toggle.create}
      />
    </>
  );
};
