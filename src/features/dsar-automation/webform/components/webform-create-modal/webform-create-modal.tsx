import { Form, Input, Select, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { TagsFormItem } from '../../../tags';
import { useListWorkflow } from '../../../workflow';
import { useCreateWebform } from '../../api/create-webform';
import { useGetWebformMeta } from '../../api/get-webform-meta';

type WebformCreateModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const WebformCreateModal = ({
  open,
  onCancel,
}: WebformCreateModalProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const [form] = Form.useForm();
  const { data: meta, isLoading: loadingMeta } =
    useGetWebformMeta();
  const { data: workflow, isLoading: loadingWorkflow } =
    useListWorkflow({ status: 'publish' });

  const optionsIdentify = meta?.identifyType?.map(
    (identify) => {
      return {
        label: identify.name,
        value: identify.ObjectUUID,
      };
    }
  );

  const optionsWorkflow = workflow?.data?.map(
    (workflow) => {
      return {
        label: workflow.name,
        value: workflow.workflowID,
      };
    }
  );

  const createWebform = useCreateWebform({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.webForm.create'
        ) as string,
      });
      onCancel();
    },
  });

  const onSubmit = async () => {
    await form.validateFields();
    const value = form.getFieldsValue();
    createWebform.submit(value);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={
        <IntlMessage id="dsarAutomation.setting.webForm.basicInfo" />
      }
      onOk={onSubmit}
      okButtonProps={{ loading: createWebform.isLoading }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage id="dsarAutomation.setting.webForm.name" />
          }
          name="name"
          rules={[
            validation.required(
              t(
                'dsarAutomation.setting.webForm.nameRequired'
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>

        <TagsFormItem
          label={
            <IntlMessage id="dsarAutomation.setting.webForm.tag" />
          }
          name="tagID"
          rules={[
            validation.required(
              t(
                'dsarAutomation.setting.webForm.tagRequired'
              )
            ),
          ]}
        />
        <Form.Item
          label={
            <IntlMessage id="dsarAutomation.setting.webForm.description" />
          }
          name="description"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="dsarAutomation.setting.webForm.identifyType" />
          }
          name="identifyType"
          rules={[
            validation.required(
              t(
                'dsarAutomation.setting.webForm.identifyTypeRequired'
              )
            ),
          ]}
        >
          <Select
            options={optionsIdentify}
            loading={loadingMeta}
          />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="dsarAutomation.setting.webForm.lifetime" />
          }
          name="lifetime"
          rules={[
            validation.required(
              t(
                'dsarAutomation.setting.webForm.lifetimeRequired'
              )
            ),
          ]}
        >
          <InputNumber
            addonAfter={
              <IntlMessage id="dsarAutomation.setting.webForm.day" />
            }
            min={0}
          />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="dsarAutomation.setting.webForm.workflow" />
          }
          name="workflowID"
          rules={[
            validation.required(
              t(
                'dsarAutomation.setting.webForm.workflowRequired'
              )
            ),
          ]}
        >
          <Select
            options={optionsWorkflow}
            loading={loadingWorkflow}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
