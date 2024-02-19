import {
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Cascader,
} from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListOrganizationMeta } from '../../api/organization-meta';

type OrganizationAddUpdateFormProps = {
  form: FormInstance;
  isEditor?: boolean;
};

export const OrganizationAddUpdateForm = ({
  form,
  isEditor,
}: OrganizationAddUpdateFormProps) => {
  const { t } = useTranslation();
  const { data } = useListOrganizationMeta();

  const groupOptions = _.map(
    data?.data?.orgGroup,
    (obj) => {
      const children = _.get(obj, 'children');

      return {
        label: obj.name,
        value: obj.ObjectUUID,
        children: _.map(children, (child) => {
          return {
            label: child.name,
            value: child.ObjectUUID,
          };
        }),
      };
    }
  );

  const industryGroupOptions = _.map(
    data?.data?.industryGroupAndBusinessCategory,
    (obj) => {
      const children = _.get(obj, 'children');

      return {
        label: obj.name,
        value: obj.ObjectUUID,
        children: _.map(children, (child) => {
          return {
            label: child.name,
            value: child.ObjectUUID,
          };
        }),
      };
    }
  );

  return (
    <Form layout="vertical" form={form}>
      <Row gutter={[34, 0]}>
        <Col span={24}>
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.name" />
            }
            name="name"
            rules={[
              validation.required(
                t('compliance.organization.nameRequired')
              ),
            ]}
          >
            <Input disabled={isEditor} />
          </Form.Item>
        </Col>
        <Col span={24} className="align-self-end">
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.orgGroup" />
            }
            name="orgGroup"
          >
            <Cascader options={groupOptions} />
          </Form.Item>
        </Col>
        <Col span={24} className="align-self-end">
          <Form.Item
            label={
              <IntlMessage id="compliance.organization.industryGroup" />
            }
            name="industryGroup"
          >
            <Cascader options={industryGroupOptions} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
