import { Form } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/es/interface';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateCategory } from '../../api/create-category';
import { CookiesCategoryForm } from '../cookies-category-form';

export type CookiesCategoryCreateModalProps = {
  domainId: string;
  open?: boolean;
  onClose?: () => void;
};

export const CookiesCategoryCreateModal = ({
  domainId,
  open,
  onClose,
}: CookiesCategoryCreateModalProps) => {
  const [form] = Form.useForm();

  const { t } = useTranslation();

  const {
    showNotification,
    showValidateFailedNotification,
  } = useNotifications();

  const createCategory = useCreateCategory({
    domainId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.cookieManagement.notification
            .createCookieCategorySuccess
        ),
      });
      onClose?.();
    },
  });

  const handleCreateCategory = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      createCategory.submit({
        necessary: false,
        ...values,
      });
    } catch (error) {
      showValidateFailedNotification(
        error as ValidateErrorEntity<unknown>
      );
    }
  };

  return (
    <Modal
      title={
        <IntlMessage
          id={
            tokens.cookieManagement.cookies
              .createCategoryModalTitle
          }
        />
      }
      open={open}
      onCancel={onClose}
      afterClose={() => form.resetFields()}
      onOk={handleCreateCategory}
      okButtonProps={{
        loading: createCategory.isLoading,
      }}
    >
      <CookiesCategoryForm form={form} />
    </Modal>
  );
};
