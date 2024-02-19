import {
  Card,
  Collapse,
  Form,
  Input,
  FormInstance,
} from 'antd';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

type PurposeOfProcessingProps = {
  form: FormInstance;
};

export const PurposeOfProcessing = ({
  form,
}: PurposeOfProcessingProps) => {
  const { t } = useTranslation();

  return (
    <Collapse
      defaultActiveKey={['1']}
      style={{ margin: '10px 0' }}
    >
      <Collapse.Panel
        header={
          <IntlMessage id="dataMapping.activity.dpia.purposeOfProcessing.header" />
        }
        key={'1'}
        style={{ fontWeight: 'bold' }}
      >
        <Form layout="vertical" form={form}>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.purposeOfProcessing.purpose" />
              }
              name={['purposeOfProcessing', 'purpose']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.purposeOfProcessing.purposeRequired'
                  )
                ),
              ]}
            >
              <Input />
            </Form.Item>
          </Card>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.purposeOfProcessing.impact" />
              }
              name={['purposeOfProcessing', 'impact']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.purposeOfProcessing.impactRequired'
                  )
                ),
              ]}
            >
              <Input />
            </Form.Item>
          </Card>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.purposeOfProcessing.benefit" />
              }
              name={['purposeOfProcessing', 'benefit']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.purposeOfProcessing.benefitRequire'
                  )
                ),
              ]}
            >
              <Input />
            </Form.Item>
          </Card>
        </Form>
      </Collapse.Panel>
    </Collapse>
  );
};
