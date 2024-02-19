import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateDataCategoriesAssessment } from '../../api/create-data-categories-assessment';

type DataCategoriesRiskSituationListAddModalProps = {
  open: boolean;
  onClose: () => void;
  dataCategoriesId: string;
};
export const DataCategoriesRiskSituationListAddModal = ({
  open,
  onClose,
  dataCategoriesId,
}: DataCategoriesRiskSituationListAddModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { submit, isLoading } =
    useCreateDataCategoriesAssessment({
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.dataCategories.riskAssessment.add'
          ) as string,
        });
        form.resetFields();
        onClose();
      },
      dataCategoryID: dataCategoriesId,
    });

  const onSubmit = () => {
    form.validateFields();
    submit(form.getFieldsValue());
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <IntlMessage id="dataMapping.dataCategories.riskAssessment.add" />
      }
      onOk={form.submit}
      okButtonProps={{ loading: isLoading }}
      afterClose={() => {
        form.resetFields();
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item
          label={
            <IntlMessage id="dataMapping.dataCategories.riskAssessment.name" />
          }
          name="name"
          rules={[
            validation.required(
              t(
                'dataMapping.dataCategories.riskAssessment.nameRequired'
              )
            ),
          ]}
        >
          <Input placeholder="ข้อมูลถูกขโมยโดยบุคคลที่ไม่ได้รับอนุญาต" />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="dataMapping.dataCategories.riskAssessment.dataSubject" />
          }
          name="dataSubject"
          rules={[
            validation.required(
              t(
                'dataMapping.dataCategories.riskAssessment.dataSubjectRequired'
              )
            ),
          ]}
        >
          <Input placeholder="ผู้อำนวยการศูนย์เทคโนโลยีสารสนเทศ" />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="dataMapping.dataCategories.riskAssessment.policy" />
          }
          name="policy"
          rules={[
            validation.required(
              t(
                'dataMapping.dataCategories.riskAssessment.policyRequired'
              )
            ),
          ]}
        >
          <Input placeholder="ควบคุมการเข้าถึง" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
