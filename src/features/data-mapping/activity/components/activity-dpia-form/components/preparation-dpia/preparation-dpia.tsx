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

type PreparationDpiaProps = {
  form: FormInstance;
};

export const PreparationDpia = ({
  form,
}: PreparationDpiaProps) => {
  const { t } = useTranslation();

  return (
    <Collapse
      defaultActiveKey={['1']}
      style={{ margin: '10px 0' }}
    >
      <Collapse.Panel
        header={
          <IntlMessage id="dataMapping.activity.dpia.preparation.header" />
        }
        key={'1'}
        style={{ fontWeight: 'bold' }}
      >
        <Form layout="vertical" form={form}>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.preparation.purpose" />
              }
              name={['needForPreparationDpia', 'purpose']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.preparation.purposeRequired'
                  )
                ),
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Card>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.preparation.type" />
              }
              name={['needForPreparationDpia', 'type']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.preparation.typeRequired'
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
