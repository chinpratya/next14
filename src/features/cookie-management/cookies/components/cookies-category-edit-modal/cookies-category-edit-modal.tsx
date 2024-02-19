import { Form } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/es/interface';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useUpdateCategory } from '../../api/update-category';
import { CookieCategory } from '../../types';
import { CookiesCategoryForm } from '../cookies-category-form';

export type CookiesCategoryEditModalProps = {
  domainId: string;
  open?: boolean;
  onClose?: () => void;
  category?: CookieCategory;
};

export const CookiesCategoryEditModal = ({
  domainId,
  open,
  onClose,
  category,
}: CookiesCategoryEditModalProps) => {
  const [form] = Form.useForm();

  const { t } = useTranslation();

  const {
    showNotification,
    showValidateFailedNotification,
  } = useNotifications();

  const updateCategory = useUpdateCategory({
    domainId,
    categoryId: category?.cetegory_name ?? '',
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.cookieManagement.notification
            .updateCookieCategorySuccess
        ),
      });
      onClose?.();
    },
  });

  const handleUpdateCategory = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      updateCategory.submit({
        ...category,
        ...values,
      });
    } catch (error) {
      showValidateFailedNotification(
        error as ValidateErrorEntity<unknown>
      );
    }
  };

  useEffect(() => {
    if (category) {
      form.setFieldsValue(category);
    }
  }, [form, category]);

  return (
    <Modal
      title={
        <IntlMessage
          id={
            tokens.cookieManagement.cookies
              .editCategoryModalTitle
          }
        />
      }
      open={open}
      onCancel={onClose}
      afterClose={() => form.resetFields()}
      onOk={handleUpdateCategory}
      okButtonProps={{
        loading: updateCategory.isLoading,
      }}
    >
      <CookiesCategoryForm form={form} isEdit />
    </Modal>
  );
};
