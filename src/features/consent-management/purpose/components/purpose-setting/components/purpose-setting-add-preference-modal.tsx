import {
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {
  Form,
  Input,
  Select,
  Button,
  Typography,
} from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { Flex } from '@components/flex';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  PerferenceType,
  Preference,
} from '../../../types';

type PurposeSettingAddPreferenceModalProps = {
  open: boolean;
  onClose: () => void;
  data?: Preference;
  onFinish?: (values: Preference) => void;
  preferenceTypes: PerferenceType[];
};
export const PurposeSettingAddPreferenceModal = ({
  open,
  onClose,
  data,
  onFinish,
  preferenceTypes,
}: PurposeSettingAddPreferenceModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const options = preferenceTypes.map((value) => {
    return {
      value: value.ObjectUUID,
      label: value.name,
    };
  });

  const handleFinish = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    onFinish?.({
      ...data,
      ...values,
    });
  };

  const handleChangeValue = (value: string) => {
    if (value === 'accept') {
      form.setFieldsValue({
        choices: ['ยอมรับ', 'ไม่ยอมรับ'],
      });
    }
  };

  useEffect(() => {
    if (open && data) {
      form.setFieldsValue(data);
    }
  }, [open, data, form]);

  const isEdit = Boolean(data);

  return (
    <Modal
      title={
        !isEdit ? (
          <IntlMessage id="consentManagement.purpose.customPurpose.addPreference" />
        ) : (
          <>
            <IntlMessage id="consentManagement.purpose.customPurpose.editPreference" />{' '}
            <Typography.Text type="secondary">
              {data?.name}
            </Typography.Text>
          </>
        )
      }
      open={open}
      onCancel={() => onClose()}
      onOk={handleFinish}
      afterClose={() => form.resetFields()}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          choices: [''],
        }}
        onValuesChange={(changedValues) => {
          if (changedValues?.attributeTypeID) {
            handleChangeValue(
              changedValues?.attributeTypeID
            );
          }
        }}
      >
        <Form.Item
          label={
            <IntlMessage id="consentManagement.purpose.customPurpose.addPreference.title" />
          }
          name="name"
          rules={[
            validation.required(
              t(
                'consentManagement.purpose.customPurpose.addPreference.titleValidation'
              )
            ),
          ]}
          className="mb-3"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="consentManagement.purpose.customPurpose.addPreference.type" />
          }
          name="attributeTypeID"
          rules={[
            validation.required(
              t(
                'consentManagement.purpose.customPurpose.addPreference.typeValidation'
              )
            ),
          ]}
          className="mb-3"
        >
          <Select options={options} />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="consentManagement.purpose.customPurpose.addPreference.choice" />
          }
          shouldUpdate={(prevValues, currentValues) =>
            prevValues?.attributeTypeID !==
            currentValues?.attributeTypeID
          }
        >
          {() => {
            return (
              <Form.List name="choices">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(
                      ({ key, name, ...restField }) => (
                        <Flex
                          key={key}
                          justifyContent="center"
                          alignItems="center"
                          className="mb-3"
                        >
                          <Form.Item
                            {...restField}
                            name={[name]}
                            className="w-100 mb-0 mr-2"
                            rules={[
                              {
                                validator: async (
                                  _,
                                  value
                                ) => {
                                  if (
                                    !value ||
                                    value.length < 1
                                  ) {
                                    return Promise.reject(
                                      new Error(
                                        t(
                                          'consentManagement.purpose.customPurpose.addPreference.choiceValidationSuccess'
                                        ) as string
                                      )
                                    );
                                  } else if (
                                    form
                                      .getFieldValue(
                                        'choices'
                                      )
                                      .filter(
                                        (v: string) =>
                                          v === value
                                      ).length > 1
                                  ) {
                                    return Promise.reject(
                                      t(
                                        'consentManagement.purpose.customPurpose.addPreference.choiceValidationError'
                                      ) as string
                                    );
                                  }
                                  return Promise.resolve();
                                },
                              },
                            ]}
                          >
                            <Input
                              placeholder={
                                t(
                                  'consentManagement.purpose.customPurpose.addPreference.choicePlaceholder'
                                ) as string
                              }
                            />
                          </Form.Item>
                          {fields.length > 1 && (
                            <DeleteOutlined
                              style={{
                                fontSize: '15px',
                              }}
                              onClick={() => remove(name)}
                            />
                          )}
                        </Flex>
                      )
                    )}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={
                          <PlusCircleOutlined className="mr-1" />
                        }
                      >
                        <IntlMessage id="consentManagement.purpose.customPurpose.addPreference.addChoice" />
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            );
          }}
        </Form.Item>
      </Form>
    </Modal>
  );
};
