import { Card, Form, FormInstance, Select } from 'antd';

import { useNotifications } from '@/stores/notifications';

import { useGetRequestMeta } from '../../api/get-request-meta';
import { useUpdateRequestLanguage } from '../../api/update-request-language';

type RequestBasicInfoProps = {
  form: FormInstance;
  requestId: string;
};

export const RequestBasicInfoLanguage = ({
  form,
  requestId,
}: RequestBasicInfoProps) => {
  const { data: meta } = useGetRequestMeta();
  const { showNotification } = useNotifications();

  const languageOptions = meta?.language.map((value) => ({
    value: value.languageID,
    label: value.languageName,
  }));

  const updateLanguage = useUpdateRequestLanguage({
    requestId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Update language successfully.',
      });
      form.resetFields();
    },
  });

  const handlerUpdateLanguage = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    updateLanguage.submit(values);
  };

  return (
    <Card title="ภาษา">
      <Form form={form} layout="vertical">
        <Form.Item label="ภาษาที่ต้องการ" name="language">
          <Select
            options={languageOptions}
            onChange={handlerUpdateLanguage}
          />
        </Form.Item>
      </Form>
    </Card>
  );
};
