import { Form, Input, Modal, Select } from 'antd';
import { t } from 'i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';

import { Option, useListNotify } from '../../../indices';
import { useListIndice } from '../../../indices/api/list-indice';
import { useDuplicateRule } from '../../api/duplicate-rule';
import { Rule } from '../../types';

type RuleDuplicateModalProps = {
  open: boolean;
  rule: Rule;
  onCancel: () => void;
};

export const RuleDuplicateModal = ({
  open,
  rule,
  onCancel,
}: RuleDuplicateModalProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { data: listIndice, isLoading: isLoadingIndice } =
    useListIndice({
      page: 1,
      pageSize: 100,
      responseType: 'lists',
    });

  const listNotify = useListNotify();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'logManagement.notification.created'
      ) as string,
    });
    onCancel();
    form.resetFields();
  };

  const { submit, isLoading } = useDuplicateRule({
    onSuccess,
  });

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    submit({ ...values, id: rule.id });
  };

  return (
    <Modal
      title="Duplicate"
      open={open}
      onOk={onSubmit}
      onCancel={onCancel}
      okButtonProps={{ loading: isLoading }}
      centered
      afterClose={() => form.resetFields()}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label={
            <IntlMessage id="siem.detectionRuleCreateAndEditRule.nameRule" />
          }
          initialValue={rule?.name}
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
            validation.trim(),
          ]}
        >
          <Input
            placeholder={
              t('logManagement.placeholder', {
                field: t(
                  'siem.detectionRuleCreateAndEditRule.nameRule'
                ),
              }) as string
            }
          />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="siem.detectionRuleCreateAndEditRule.indices" />
          }
          name="indices"
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
          ]}
        >
          <Select
            loading={isLoadingIndice}
            options={(listIndice?.data as Option[]) ?? []}
            placeholder={
              t('logManagement.selectPlaceholder', {
                field: t(
                  'siem.detectionRuleCreateAndEditRule.indices'
                ),
              }) as string
            }
          />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="siem.detectionRuleCreateAndEditRule.recipient" />
          }
          name="recipients"
          rules={[
            validation.required(
              <IntlMessage id="logManagement.required" />
            ),
          ]}
        >
          <Select
            options={listNotify.data?.data ?? []}
            loading={listNotify.isLoading}
            placeholder={
              t('logManagement.selectPlaceholder', {
                field: t(
                  'siem.detectionRuleCreateAndEditRule.recipient'
                ),
              }) as string
            }
          />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="siem.detectionRuleCreateAndEditRule.stepFourDescription" />
          }
          name="message"
        >
          <Input.TextArea
            rows={5}
            placeholder={
              t('logManagement.placeholder', {
                field: t(
                  'siem.detectionRuleCreateAndEditRule.stepFourDescription'
                ),
              }) as string
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
