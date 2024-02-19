import { PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearch, useToggle } from '@/hooks';
import { tokens } from '@/lang';
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
import { useGetMetaCategoriesClassification } from '../../api/get-meta-categories-classification';
import { DataCategory } from '../../types';
import { DataCategoriesCreateDataSubjectModal } from '../data-categories-create-data-subject-modal';
import { DataCategoriesCreateGroupModal } from '../data-categories-create-group-modal';

type DataCategoriesFormProps = {
  form: FormInstance;
  data?: DataCategory;
};

export const DataCategoriesForm = ({
  form,
  data,
}: DataCategoriesFormProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { onSearch, debouncedSearch } = useSearch();
  const router = useRouter();
  const dataCategoriesId = router.query
    .dataCategoriesId as string;

  const meta = useGetMetaCategoriesClassification();

  const { organizationId } = useAuth();

  useEffect(() => {
    if (organizationId) {
      form?.setFieldValue(
        'organizationId',
        organizationId
      );
    }
  }, [organizationId, form]);

  const group = useListGroup({
    search: debouncedSearch,
    menuID: data?.meta?.categoryID ?? 'Data-Categories',
  });

  const dataSubject = useListGroup({
    search: debouncedSearch,
    menuID: data?.meta?.dataSubjectID ?? 'data-subject',
  });

  const optionCategories = _.map(
    meta.data?.data.categoryClassification,
    (v) => {
      return {
        label: v?.name,
        value: v.ObjectUUID,
      };
    }
  );

  const optionGroup = _.map(group.data?.data, (v) => {
    return {
      label: v?.name,
      value: v.groupID,
    };
  });

  const optionDataSubject = _.map(
    dataSubject.data?.data,
    (v) => {
      return {
        label: v?.name,
        value: v.groupID,
      };
    }
  );

  return (
    <>
      <Form form={form} layout="vertical">
        <Row gutter={[16, 0]}>
          <Col {...getColLayout(8)}>
            <Form.Item
              name="name"
              label={
                <IntlMessage id="dataMapping.dataCategories.name" />
              }
              rules={[
                validation.required(
                  t(
                    'dataMapping.dataCategories.nameRequired'
                  )
                ),
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          {dataCategoriesId ? (
            <Col {...getColLayout(8)}>
              <Form.Item
                name="categoryClassification"
                label={
                  <IntlMessage id="dataMapping.dataCategories.categoriesClassification" />
                }
              >
                <Select
                  disabled
                  mode="multiple"
                  allowClear
                  options={optionCategories ?? []}
                  loading={meta.isLoading}
                  placeholder={
                    <IntlMessage id="dataMapping.dataCategories.categoriesClassification" />
                  }
                />
              </Form.Item>
            </Col>
          ) : null}
          <Col {...getColLayout(8)}>
            <Form.Item
              name="organizationID"
              label={
                <IntlMessage id="dataMapping.dataCategories.organization" />
              }
              rules={[
                validation.required(
                  t(
                    'dataMapping.dataCategories.organizationRequired'
                  )
                ),
              ]}
              initialValue={organizationId}
            >
              <OrganizationPicker readonly />
            </Form.Item>
          </Col>
          <Col {...getColLayout(8)}>
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
                    {
                      <IntlMessage id="dataMapping.dataCategories.group" />
                    }
                  </Typography.Text>
                  <Typography.Link
                    className="font-weight-normal"
                    onClick={toggle.create}
                  >
                    <PlusOutlined />{' '}
                    <IntlMessage id="dataMapping.dataCategories.createGroup" />
                  </Typography.Link>
                </Flex>
              }
            >
              <Select
                showSearch
                options={optionGroup ?? []}
                loading={group.isLoading}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </Col>
          <Col {...getColLayout(8)}>
            <Form.Item
              className={css`
                label {
                  width: 100%;
                }
              `}
              name="dataSubjectID"
              label={
                <Flex
                  alignItems="center"
                  justifyContent="between"
                  className="w-100"
                >
                  <Typography.Text>
                    <IntlMessage id="dataMapping.dataCategories.dataSubjectGroup" />
                  </Typography.Text>
                  <Typography.Link
                    className="font-weight-normal"
                    onClick={toggle.edit}
                  >
                    <PlusOutlined />{' '}
                    <IntlMessage id="dataMapping.dataCategories.createDataSubjectGroup" />
                  </Typography.Link>
                </Flex>
              }
              rules={[
                validation.required(
                  t(
                    'dataMapping.dataCategories.dataSubjectGroupRequired'
                  )
                ),
              ]}
            >
              <Select
                showSearch
                mode="multiple"
                allowClear
                options={optionDataSubject ?? []}
                loading={dataSubject.isLoading}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </Col>

          {data ? (
            <Col {...getColLayout(8)}>
              <Form.Item
                name="status"
                label={
                  <IntlMessage id="dataMapping.dataCategories.status" />
                }
                rules={[
                  validation.required(
                    t(
                      'dataMapping.dataCategories.statusRequired'
                    )
                  ),
                ]}
              >
                <Select
                  options={[
                    {
                      label: (
                        <IntlMessage
                          id={tokens.common.status.active}
                        />
                      ),
                      value: 'active',
                    },
                    {
                      label: (
                        <IntlMessage
                          id={
                            tokens.common.status.inactive
                          }
                        />
                      ),
                      value: 'inactive',
                    },
                  ]}
                  placeholder={
                    t(
                      'dataMapping.dataCategories.statusPlaceholder'
                    ) as string
                  }
                />
              </Form.Item>
            </Col>
          ) : null}
          <Col {...getColLayout(8)}>
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
                    <IntlMessage id="dataMapping.activity.activityDetail.tags" />
                  </Typography.Text>
                  <Typography.Link
                    className="font-weight-normal"
                    onClick={toggle.choose}
                  >
                    <PlusOutlined />{' '}
                    <IntlMessage id="dataMapping.activity.activityDetail.createTags" />
                  </Typography.Link>
                </Flex>
              }
            >
              <TagsSelect />
            </Form.Item>
          </Col>
          <Col {...getColLayout(8)}>
            <Form.Item
              className={css`
                label {
                  width: 100%;
                }
              `}
              name="numberPerson"
              label={
                <IntlMessage id="dataMapping.activity.activityDetail.numberPerson" />
              }
            >
              <InputNumber
                className="w-100"
                addonAfter={
                  <IntlMessage id="dataMapping.activity.activityDetail.Person" />
                }
                min={0}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <DataCategoriesCreateGroupModal
        open={toggle.openCreate}
        onCancel={toggle.create}
      />
      <DataCategoriesCreateDataSubjectModal
        open={toggle.openEdit}
        onCancel={toggle.edit}
      />
      <ModalCreateTags
        open={toggle.openChoose}
        onCancel={toggle.choose}
      />
    </>
  );
};
