import { PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Skeleton,
  Typography,
} from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Flex } from '@/components/share-components/flex';
import { useToggle } from '@/hooks';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { useNotifications } from '@/stores/notifications';
import { validation, getColLayout } from '@/utils';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { GroupSelect } from '../../../group';
import {
  useGetPurposeDetail,
  useUpdatePurpose,
} from '../../../purpose';
import { TagsFormItem } from '../../../tags';
import { ActivityCreateGroupModal } from '../activity-create-group-modal';

type ActivityBasisPurposeModalEditProps = {
  open: boolean;
  onClose: () => void;
  purposeId: string;
  activityId: string;
  basisId: string;
};
export const ActivityBasisPurposeModalEdit = ({
  open,
  onClose,
  purposeId,
  activityId,
  basisId,
}: ActivityBasisPurposeModalEditProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { data, isError, isLoading } =
    useGetPurposeDetail(purposeId);

  const updatePurpose = useUpdatePurpose({
    purposeId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.purpose.update'
        ) as string,
      });
      queryClient.invalidateQueries([
        dataMappingQueryKeys.activity.basisPurpose(
          activityId,
          basisId
        ),
      ]);
      onClose?.();
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const onSubmit = async () => {
    await form.validateFields();
    const value = form.getFieldsValue();
    updatePurpose.submit(value);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <>
          <IntlMessage id="dataMapping.activity.lawfulBasis.basis.editPurpose" />{' '}
          <Typography.Text type="secondary">
            {data?.name}
          </Typography.Text>
        </>
      }
      onOk={onSubmit}
      okButtonProps={{ loading: updatePurpose.isLoading }}
    >
      <FallbackError isError={isError}>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <>
            <Form layout="vertical" form={form}>
              <Form.Item
                label={
                  <IntlMessage id="dataMapping.activity.lawfulBasis.basis.name" />
                }
                name="name"
                rules={[
                  validation.required(
                    t(
                      'dataMapping.activity.lawfulBasis.basis.nameRequired'
                    )
                  ),
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <Flex
                    alignItems="center"
                    justifyContent="between"
                    className="w-100"
                  >
                    <Typography.Text>
                      <IntlMessage id="dataMapping.activity.activityDetail.group" />
                    </Typography.Text>
                    <Typography.Link
                      className="font-weight-normal"
                      onClick={toggle.create}
                    >
                      <PlusOutlined />{' '}
                      <IntlMessage id="dataMapping.activity.activityDetail.createGroup" />
                    </Typography.Link>
                  </Flex>
                }
                name="groupID"
              >
                <GroupSelect menuID="Purpose" />
              </Form.Item>

              <TagsFormItem
                label={
                  <IntlMessage id="dataMapping.activity.tags" />
                }
                name="tagID"
              />

              <Form.Item
                label={
                  <IntlMessage id="dataMapping.purpose.create.data_usage_period" />
                }
                name="isDataUsagePeriod"
                rules={[
                  validation.required(
                    t(
                      'dataMapping.purpose.create.data_usage_periodRequired'
                    )
                  ),
                ]}
              >
                <Radio.Group
                  options={[
                    {
                      label: (
                        <IntlMessage id="dataMapping.purpose.create.state_clearly" />
                      ),
                      value: true,
                    },
                    {
                      label: (
                        <IntlMessage id="dataMapping.purpose.create.not_clearly_stated" />
                      ),
                      value: false,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                shouldUpdate={(
                  prevValues,
                  currentValues
                ) =>
                  prevValues.isDataUsagePeriod !==
                  currentValues.isDataUsagePeriod
                }
                noStyle
              >
                {({ getFieldValue }) => {
                  const isDataUsagePeriod = getFieldValue(
                    'isDataUsagePeriod'
                  );
                  if (isDataUsagePeriod) {
                    return (
                      <Row
                        gutter={[10, 10]}
                        justify="space-between"
                        align="middle"
                      >
                        <Col
                          className={css`
                            width: 50%;
                          `}
                        >
                          <Form.Item
                            label={
                              <IntlMessage id="dataMapping.purpose.create.fill_in_data_usage_period" />
                            }
                            name={[
                              'dataUsagePeriod',
                              'value',
                            ]}
                            rules={[
                              validation.required(
                                t(
                                  'dataMapping.purpose.create.fill_in_data_usage_periodRequired'
                                )
                              ),
                            ]}
                          >
                            <InputNumber
                              className="w-100"
                              min={1}
                            />
                          </Form.Item>
                        </Col>
                        <Col
                          className={css`
                            width: 50%;
                            margin-top: 30px;
                          `}
                        >
                          <Form.Item
                            name={[
                              'dataUsagePeriod',
                              'type',
                            ]}
                            rules={[
                              validation.required(
                                t(
                                  'dataMapping.purpose.create.typeRequired'
                                )
                              ),
                            ]}
                          >
                            <Select
                              options={[
                                {
                                  label: (
                                    <IntlMessage id="dataMapping.purpose.create.day" />
                                  ),
                                  value: 'day',
                                },
                                {
                                  label: (
                                    <IntlMessage id="dataMapping.purpose.create.month" />
                                  ),
                                  value: 'month',
                                },
                                {
                                  label: (
                                    <IntlMessage id="dataMapping.purpose.create.year" />
                                  ),
                                  value: 'year',
                                },
                              ]}
                            />
                          </Form.Item>
                        </Col>
                        <Col {...getColLayout(24)}>
                          <Form.Item
                            label={
                              <IntlMessage id="dataMapping.activity.lawfulBasis.basis.description" />
                            }
                            name={[
                              'dataUsagePeriod',
                              'description',
                            ]}
                          >
                            <Input.TextArea rows={3} />
                          </Form.Item>
                        </Col>
                      </Row>
                    );
                  } else {
                    return (
                      <Form.Item
                        label={
                          <IntlMessage id="dataMapping.activity.lawfulBasis.basis.description" />
                        }
                        name={[
                          'dataUsagePeriod',
                          'description',
                        ]}
                      >
                        <Input.TextArea rows={4} />
                      </Form.Item>
                    );
                  }
                }}
              </Form.Item>

              <Form.Item
                label={
                  <IntlMessage id="dataMapping.purpose.detail.isConsent" />
                }
                name="isConsent"
                rules={[
                  validation.required(
                    t(
                      'dataMapping.purpose.detail.isConsentRequired'
                    )
                  ),
                ]}
              >
                <Radio.Group
                  options={[
                    {
                      label: (
                        <IntlMessage id="dataMapping.purpose.detail.have" />
                      ),
                      value: true,
                    },
                    {
                      label: (
                        <IntlMessage id="dataMapping.purpose.detail.do_not_have" />
                      ),
                      value: false,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                shouldUpdate={(
                  prevValues,
                  currentValues
                ) =>
                  prevValues.isConsent !==
                  currentValues.isConsent
                }
                noStyle
              >
                {({ getFieldValue }) => {
                  const isConsent =
                    getFieldValue('isConsent');
                  if (isConsent) {
                    return (
                      <Form.Item
                        label={
                          <IntlMessage id="dataMapping.activity.lawfulBasis.basis.description" />
                        }
                        name="consentDetail"
                      >
                        <Input.TextArea rows={4} />
                      </Form.Item>
                    );
                  }
                }}
              </Form.Item>
            </Form>
            <ActivityCreateGroupModal
              open={toggle.openCreate}
              onCancel={toggle.create}
            />
          </>
        )}
      </FallbackError>
    </Modal>
  );
};
