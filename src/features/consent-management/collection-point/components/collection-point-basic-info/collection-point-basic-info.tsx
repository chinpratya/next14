import { PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Form,
  FormInstance,
  Input,
  Select,
  Row,
  Col,
  Card,
  Skeleton,
  Typography,
} from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import {
  useListOrganizationOfUser,
  useListOrganizationUser,
} from '@/features/admin';
import {
  TagsSelect,
  useListActivity,
} from '@/features/data-mapping';
import { usePermission, useToggle } from '@/hooks';
import { permissions } from '@/permissions';
import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { Flex } from '@components/flex';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListCollectionPointPolicy } from '../../api/list-collection-point-policy';
import { CollectionPointPolicyInclude } from '../collection-point-policy-include';

type CollectionPointBasicInfoProps = {
  form: FormInstance;
  loading?: boolean;
  isEdit?: boolean;
};

export const CollectionPointBasicInfo = ({
  form,
  loading = false,
  isEdit = true,
}: CollectionPointBasicInfoProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();

  const { data: policyList } =
    useListCollectionPointPolicy();

  const { data, isError, isLoading } = useListActivity(
    {}
  );

  const editPermission = usePermission({
    moduleName: 'consent',
    policies: [
      permissions[
        'pdpakit:consent:collectionpoint:update'
      ],
    ],
  });

  const optionsActivity = _.map(data?.data, (v) => {
    return {
      value: v.ObjectUUID,
      label: v.name,
    };
  });

  const listOrganization = useListOrganizationOfUser();

  const { data: delegate } = useListOrganizationUser({
    departmentId:
      listOrganization?.data?.current_department
        ?.departmentId ?? '',
  });

  const delegateOptions = _.map(delegate?.data, (v) => {
    return {
      value: v.userId,
      label: v.first_name,
    };
  });

  if (isLoading) {
    return (
      <>
        <Skeleton active />
      </>
    );
  }

  return (
    <FallbackError isError={isError}>
      <Form
        form={form}
        layout="vertical"
        disabled={!isEdit}
        onValuesChange={(changedValues) => {
          if (changedValues.policyId) {
            const policy = policyList?.find(
              (item) =>
                item.ObjectUUID === changedValues.policyId
            );
            form.setFieldsValue({
              policyName: policy?.name,
              policyLink: `https://api.onefence.co/policy/v1/policy/html/${policy?.ObjectUUID}`,
              policyVersion: policy?.version,
            });
          }
        }}
      >
        <Row
          justify={'space-between'}
          align={'top'}
          gutter={[10, 10]}
        >
          <Col
            {...getColLayout([24, 24, 24, 12, 12, 12])}
          >
            <Card
              title={
                <IntlMessage id="consentManagement.collectionPoint.basicInfo.title" />
              }
              loading={loading}
            >
              <Form.Item
                label={
                  <IntlMessage id="consentManagement.collectionPoint.basicInfo.name" />
                }
                name="name"
                rules={[
                  validation.required(
                    t(
                      'consentManagement.collectionPoint.basicInfo.nameRequired'
                    )
                  ),
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <IntlMessage id="consentManagement.collectionPoint.basicInfo.description" />
                }
                name="description"
              >
                <Input.TextArea rows={3} />
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
                      <IntlMessage id="consentManagement.collectionPoint.basicInfo.tags" />
                    </Typography.Text>
                    <Typography.Link
                      className="font-weight-normal"
                      onClick={toggle.create}
                      disabled={!editPermission.isAllow}
                    >
                      <PlusOutlined />{' '}
                      <IntlMessage id="consentManagement.collectionPoint.basicInfo.tags.create" />
                    </Typography.Link>
                  </Flex>
                }
              >
                <TagsSelect />
              </Form.Item>
            </Card>
            <Card
              title={
                <IntlMessage id="consentManagement.collectionPoint.basicInfo.identifier" />
              }
            >
              <Form.Item
                label={
                  <IntlMessage id="consentManagement.collectionPoint.basicInfo.identifier" />
                }
                name="identifier"
                rules={[
                  validation.required(
                    t(
                      'consentManagement.collectionPoint.basicInfo.identifierRequired'
                    )
                  ),
                ]}
              >
                <Select
                  options={[
                    {
                      label: (
                        <IntlMessage id="consentManagement.collectionPoint.email" />
                      ),
                      value: 'email',
                    },
                    {
                      label: (
                        <IntlMessage id="consentManagement.collectionPoint.tel" />
                      ),
                      value: 'callNumber',
                    },
                    {
                      label: (
                        <IntlMessage id="consentManagement.collectionPoint.other" />
                      ),
                      value: 'other',
                    },
                  ]}
                />
              </Form.Item>
            </Card>
            <Card
              title={
                <IntlMessage id="consentManagement.collectionPoint.organization.title" />
              }
              loading={loading}
            >
              <Form.Item
                label={
                  <IntlMessage id="consentManagement.collectionPoint.organization.delegate" />
                }
                name="delegateID"
                rules={[
                  validation.required(
                    t(
                      'consentManagement.collectionPoint.organization.delegateRequired'
                    )
                  ),
                ]}
              >
                <Select options={delegateOptions} />
              </Form.Item>
              {/* <Form.Item
                label={
                  <IntlMessage id="consentManagement.collectionPoint.organization.organization" />
                }
                name="organizationID"
                rules={[
                  validation.required('กรุณาเลือกองค์กร'),
                ]}
              >
                <OrganizationPicker />
              </Form.Item> */}
            </Card>
          </Col>
          <Col
            {...getColLayout([24, 24, 24, 12, 12, 12])}
          >
            <Card
              title={
                <IntlMessage id="consentManagement.collectionPoint.basicInfo.type" />
              }
            >
              <Form.Item
                label={
                  <IntlMessage id="consentManagement.collectionPoint.basicInfo.type" />
                }
                name="template"
                rules={[
                  validation.required(
                    t(
                      'consentManagement.collectionPoint.basicInfo.typeRequired'
                    )
                  ),
                ]}
              >
                <Select disabled />
              </Form.Item>
            </Card>
            <Card
              title={
                <IntlMessage id="consentManagement.collectionPoint.basicInfo.activity" />
              }
            >
              <Form.Item
                label={
                  <IntlMessage id="consentManagement.collectionPoint.basicInfo.activity" />
                }
                name="activityID"
                rules={[
                  validation.required(
                    t(
                      'consentManagement.collectionPoint.basicInfo.activityRequired'
                    )
                  ),
                ]}
              >
                <Select
                  options={optionsActivity ?? []}
                  disabled
                />
              </Form.Item>
            </Card>
            <Card
              title={
                <IntlMessage id="consentManagement.collectionPoint.policy.title" />
              }
            >
              <CollectionPointPolicyInclude />
            </Card>
          </Col>
        </Row>
      </Form>
    </FallbackError>
  );
};
