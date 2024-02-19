import { PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Form,
  Input,
  Radio,
  Col,
  Row,
  InputNumber,
  FormInstance,
  Select,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearch, useToggle } from '@/hooks';
import { useAuth } from '@/stores/auth';
import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListGroup } from '../../../group/api/list-group';
import {
  OrganizationPicker,
  TagsSelect,
  ModalCreateTags,
} from '../../../shared';
import { PurposeCreateGroupModal } from '../purpose-create-group-modal';

type PurposeCreateFormProps = {
  form: FormInstance;
};

export const PurposeCreateForm = ({
  form,
}: PurposeCreateFormProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { onSearch, debouncedSearch } = useSearch();
  const [isDataUsagePeriod, setIsDataUsagePeriod] =
    useState(true);
  const { organizationId } = useAuth();

  useEffect(() => {
    if (organizationId) {
      form.setFieldValue(
        'organizationID',
        organizationId
      );
    }
  }, [organizationId, form]);

  const { data } = useListGroup({
    search: debouncedSearch,
    menuID: 'Purpose',
  });

  const GroupOptions = data?.data.map((item) => ({
    value: item.groupID,
    label: item.name,
  }));

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          dataUsagePeriod: {
            description: '',
          },
          isDataUsagePeriod: true,
          isConsent: false,
          consentDetail: '',
        }}
      >
        <Form.Item
          label={
            <IntlMessage id="dataMapping.purpose.create.name" />
          }
          name="name"
          rules={[
            validation.required(
              t('dataMapping.purpose.create.nameRequired')
            ),
          ]}
        >
          <Input />
        </Form.Item>

        <Col {...getColLayout(24)} className="mb-2">
          <Form.Item
            label={
              <IntlMessage id="dataMapping.purpose.create.organization" />
            }
            name="organizationID"
            rules={[
              validation.required(
                t(
                  'dataMapping.purpose.create.organizationRequired'
                )
              ),
            ]}
          >
            <OrganizationPicker readonly={true} />
          </Form.Item>
        </Col>
        <Form.Item
          className={css`
            label {
              width: 100%;
            }
          `}
          name="groupID"
          label={
            <Flex
              alignItems="center"
              justifyContent="between"
              className="w-100"
            >
              <Typography.Text>
                <IntlMessage id="dataMapping.purpose.create.group" />
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
          rules={[
            validation.required(
              t(
                'dataMapping.purpose.create.groupRequired'
              )
            ),
          ]}
        >
          <Select
            showSearch
            placeholder={
              t(
                'dataMapping.purpose.create.groupPlaceholder'
              ) as string
            }
            onSearch={onSearch}
            options={GroupOptions ?? []}
            filterOption={(input, option) =>
              (option?.label ?? '')
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          className={css`
            label {
              width: 100%;
            }
          `}
          name="tagID"
          label={
            <Flex
              alignItems="center"
              justifyContent="between"
              className="w-100"
            >
              <Typography.Text>
                <IntlMessage id="dataMapping.purpose.create.tags" />
              </Typography.Text>
              <Typography.Link
                className="font-weight-normal"
                onClick={toggle.edit}
              >
                <PlusOutlined />{' '}
                <IntlMessage id="dataMapping.activity.activityDetail.createTags" />
              </Typography.Link>
            </Flex>
          }
        >
          <TagsSelect />
        </Form.Item>
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
            value={isDataUsagePeriod}
            onChange={(e) =>
              setIsDataUsagePeriod(e.target.value)
            }
          >
            <Radio value={true}>
              <IntlMessage id="dataMapping.purpose.create.state_clearly" />
            </Radio>
            <Radio value={false}>
              <IntlMessage id="dataMapping.purpose.create.not_clearly_stated" />
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Row justify="start" align="middle">
          {isDataUsagePeriod === true ? (
            <>
              <Col
                {...getColLayout([
                  24, 24, 12, 12, 12, 12,
                ])}
              >
                <Form.Item
                  label={
                    <IntlMessage id="dataMapping.purpose.create.fill_in_data_usage_period" />
                  }
                  name={['dataUsagePeriod', 'value']}
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
                {...getColLayout([
                  24, 24, 12, 12, 12, 12,
                ])}
              >
                <Form.Item
                  name={['dataUsagePeriod', 'type']}
                  rules={[
                    validation.required(
                      t(
                        'dataMapping.purpose.create.typeRequired'
                      )
                    ),
                  ]}
                  className={css`
                    margin-top: 29px;
                    margin-left: 10px;
                  `}
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
                    <IntlMessage id="dataMapping.purpose.detail" />
                  }
                  name={[
                    'dataUsagePeriod',
                    'description',
                  ]}
                >
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
            </>
          ) : (
            <Col {...getColLayout(24)}>
              <Form.Item
                label={
                  <IntlMessage id="dataMapping.purpose.detail" />
                }
                name={['dataUsagePeriod', 'description']}
              >
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
          )}
          <Col {...getColLayout(24)}>
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
              <Radio.Group>
                <Radio value={true}>
                  <IntlMessage id="dataMapping.purpose.detail.have" />
                </Radio>
                <Radio value={false}>
                  <IntlMessage id="dataMapping.purpose.detail.do_not_have" />
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col {...getColLayout(24)}>
            <Form.Item
              shouldUpdate={(prevValues, currentValues) =>
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
                    <Form.Item name="consentDetail">
                      <Input.TextArea rows={5} />
                    </Form.Item>
                  );
                }
                return null;
              }}
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <PurposeCreateGroupModal
        open={toggle.openCreate}
        onCancel={toggle.create}
      />
      <ModalCreateTags
        open={toggle.openEdit}
        onCancel={toggle.edit}
      />
    </>
  );
};
