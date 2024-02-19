import { Form } from 'antd';
import { useEffect } from 'react';

import { Modal } from '@components/modal';

import { HCode, OrganizationUnit } from '../../types';
import { OrganizationAddUpdateForm } from '../organization-add-update-form';

type OrganizationBasicInfoUnitUpdateModalProps = {
  open: boolean;
  data: OrganizationUnit;
  onOk?: (values: HCode) => void;
  onCancel: () => void;
};

export const OrganizationBasicInfoUnitUpdateModal = ({
  open,
  data,
  onOk,
  onCancel,
}: OrganizationBasicInfoUnitUpdateModalProps) => {
  const [form] = Form.useForm();

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    onOk?.(values);
    onCancel();
  };

  useEffect(() => {
    if (data)
      form.setFieldsValue({
        ...data,
        hcodeSearch: data.hcode,
      });
  }, [data, form]);

  return (
    <Modal
      title="รายละเอียดโรงพยาบาล"
      open={open}
      onCancel={onCancel}
      onOk={onSubmit}
      destroyOnClose
    >
      <OrganizationAddUpdateForm form={form} isEditor />
    </Modal>
  );
};
