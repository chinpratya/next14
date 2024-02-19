import { Flex } from '@mantine/core';
import { Form, Input, Select, InputNumber } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { TagsFormItem } from '../../../tags';
import { useListWorkflow } from '../../../workflow';
import { useCreateWebform } from '../../api/create-webform';
import { useGetWebformMeta } from '../../api/get-webform-meta';

export type WebformCreateModalProps = {
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

  const timeTypeMeta = meta?.time_type;

  const durationTypeOptions = timeTypeMeta?.map(
    (durationType) => ({
      label: durationType?.name,
      value: durationType?.ObjectUUID,
    })
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
          tokens.dataBreach.webform.notifications.create
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
        <IntlMessage
          id={tokens.dataBreach.webform.create}
        />
      }
      onOk={onSubmit}
      okButtonProps={{ loading: createWebform.isLoading }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.webform.webformName}
            />
          }
          name="name"
          rules={[
            validation.required(
              t(
                tokens.dataBreach.webform
                  .webformNameRequired
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <TagsFormItem
          label={
            <IntlMessage
              id={tokens.dataBreach.webform.tags}
            />
          }
          name="tagID"
          rules={[
            validation.required(
              t(tokens.dataBreach.webform.tagsRequired)
            ),
          ]}
        />
        <Form.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.webform.description}
            />
          }
          name="description"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.webform.workingPeriod}
            />
          }
          className="w-50"
          required
        >
          <Flex gap={8}>
            <Form.Item
              shouldUpdate={(prevValues, nextValues) =>
                prevValues?.lifetime?.type !==
                nextValues?.lifetime?.type
              }
              className="w-100 mb-0"
            >
              {({ getFieldValue }) => {
                const timeTypeStep =
                  _.find(timeTypeMeta, {
                    ObjectUUID: getFieldValue([
                      'lifetime',
                      'type',
                    ]),
                  })?.step ?? 1;

                return (
                  <Form.Item
                    className="mb-0"
                    name={['lifetime', 'value']}
                    rules={[
                      validation.required(
                        t(
                          tokens.dataBreach.webform
                            .workingPeriodRequired
                        )
                      ),
                    ]}
                  >
                    <InputNumber
                      min={1}
                      max={99}
                      step={timeTypeStep}
                      className="w-100"
                    />
                  </Form.Item>
                );
              }}
            </Form.Item>
            <Form.Item
              className="mb-0 w-100"
              name={['lifetime', 'type']}
              rules={[
                validation.required(
                  t(
                    tokens.dataBreach.webform
                      .workingPeriodRequired
                  )
                ),
              ]}
            >
              <Select
                className="w-100"
                options={durationTypeOptions}
              />
            </Form.Item>
          </Flex>
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.webform.workflow}
            />
          }
          name="workflowID"
          rules={[
            validation.required(
              t(
                tokens.dataBreach.webform.workflowRequired
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
