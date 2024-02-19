import { Card, Form, Select, FormInstance } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListGroup } from '../../../../../data-mapping';

type PurposeGeneralFormGroupProps = {
  form: FormInstance;
};

export const PurposeGeneralFormGroup = ({
  form,
}: PurposeGeneralFormGroupProps) => {
  const { t } = useTranslation();
  const { data, isLoading } = useListGroup({
    menuID: 'Purpose',
  });

  const options = _.map(data?.data ?? [], (v) => {
    return {
      value: v.groupID,
      label: v.name,
    };
  });
  return (
    <Card
      title={
        <IntlMessage id="consentManagement.purpose.basicInfo.group" />
      }
      loading={isLoading}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label={
            <IntlMessage id="consentManagement.purpose.basicInfo.group" />
          }
          name="groupID"
          rules={[
            validation.required(
              t(
                'consentManagement.purpose.basicInfo.groupRequired'
              )
            ),
          ]}
        >
          <Select options={options} disabled />
        </Form.Item>
      </Form>
    </Card>
  );
};
