import { css } from '@emotion/css';
import {
  Cascader,
  Form,
  FormInstance,
  Input,
  Skeleton,
} from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListOrganizationMeta } from '../../api/organization-meta';

type OrganizationBasicInfoGeneralDataProps = {
  form: FormInstance;
};

export const OrganizationBasicInfoGeneralData = ({
  form,
}: OrganizationBasicInfoGeneralDataProps) => {
  const { t } = useTranslation();
  const {
    data: meta,
    isLoading,
    isError,
  } = useListOrganizationMeta();

  const orgTypeOptions = _.map(
    _.get(meta, 'data.orgGroup') ?? [],
    (obj) => {
      return {
        value: obj.ObjectUUID,
        label: obj.name,
        children: _.map(obj.children, (ob) => {
          return {
            value: ob.ObjectUUID,
            label: ob.name,
          };
        }),
      };
    }
  );

  const industryBusinessOption = _.map(
    _.get(
      meta,
      'data.industryGroupAndBusinessCategory'
    ) ?? [],
    (obj) => {
      return {
        value: obj.ObjectUUID,
        label: obj.name,
        children: _.map(obj.children, (ob) => {
          return {
            value: ob.ObjectUUID,
            label: ob.name,
          };
        }),
      };
    }
  );

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <FallbackError isError={isError}>
      <Form
        form={form}
        layout="vertical"
        className={css`
          .ant-form-item-required {
            width: 100%;
          }
        `}
      >
        <Form.Item
          name="name"
          label={
            <IntlMessage id="compliance.organization.name" />
          }
          rules={[
            validation.required(
              t('compliance.organization.nameRequired')
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="orgGroup"
          label={
            <IntlMessage id="compliance.organization.orgGroup" />
          }
        >
          <Cascader options={orgTypeOptions ?? []} />
        </Form.Item>
        <Form.Item
          name="industryGroupAndBusinessCategory"
          label={
            <IntlMessage id="compliance.organization.industryGroupAndBusinessCategory" />
          }
        >
          <Cascader
            options={industryBusinessOption ?? []}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label={
            <IntlMessage id="compliance.organization.description" />
          }
        >
          <Input.TextArea rows={7} />
        </Form.Item>
      </Form>
    </FallbackError>
  );
};
