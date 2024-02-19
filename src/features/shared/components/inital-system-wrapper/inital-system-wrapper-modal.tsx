import { useToggle } from '@mantine/hooks';
import {
  Form,
  FormInstance,
  Typography,
  Modal as AntdModal,
} from 'antd';
import { t } from 'i18next';

import { Modal } from '@/components/share-components/modal';
import { IntlMessage } from '@/components/util-components/intl-message';
import { useNotifications } from '@/stores/notifications';

import { useCreateOrganization } from '../../api/create-organization';

import { InitalSystemWrapperForm } from './inital-system-wrapper-form';

type InitalSystemWrapperModalProps = {
  form: FormInstance;
  open: boolean;
  onCancel: () => void;
};

export const InitalSystemWrapperModal = ({
  open,
  onCancel,
}: InitalSystemWrapperModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useToggle();
  const { showNotification } = useNotifications();

  const createOrganization = useCreateOrganization({
    onSuccess() {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.updated'
        ) as string,
      });
      onCancel();
    },
  });

  const onCreateOrganization = async () => {
    try {
      setLoading(true);

      await form.validateFields();
      const { name, email, device, ntp, engine } =
        form.getFieldsValue();

      AntdModal.confirm({
        title: <IntlMessage id="ยินดีต้อนรับ!" />,
        content: (
          <IntlMessage id="คุณพร้อมที่จะเริ่มต้นสร้างองค์กรครั้งแรกของคุณหรือยัง?" />
        ),
        maskClosable: true,
        centered: true,
        okText: 'ตกลง',
        cancelText: 'ยกเลิก',
        onOk: () => {
          const payload = {
            name,
            email,
            engine,
            ntp: {
              ...ntp,
              hosts: device ? ntp.hosts : [],
            },
          };
          createOrganization.submit(payload);
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      title={
        <Typography.Text strong>
          <IntlMessage id="logManagement.setting.ntpConfig.title" />
        </Typography.Text>
      }
      maskStyle={{ backdropFilter: 'blur(4px)' }}
      destroyOnClose
      centered
      onOk={onCreateOrganization}
      okText={<IntlMessage id="logManagement.create" />}
      width={600}
      okButtonProps={{
        loading: createOrganization.isLoading || loading,
      }}
      closable={false}
      cancelButtonProps={{ hidden: true }}
      bodyPadding={0}
      afterClose={() => form.resetFields()}
    >
      <InitalSystemWrapperForm form={form} />
    </Modal>
  );
};
