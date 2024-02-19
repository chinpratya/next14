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

type DpiaReportProps = {
  form: FormInstance;
};

export const DpiaReport = ({ form }: DpiaReportProps) => {
  const { t } = useTranslation();

  return (
    <Collapse defaultActiveKey={['1']}>
      <Collapse.Panel
        header={
          <IntlMessage id="dataMapping.activity.dpia.report.header" />
        }
        key={'1'}
        style={{ fontWeight: 'bold' }}
      >
        <Form layout="vertical" form={form}>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.report.purpose" />
              }
              name={['dpia', 'purpose']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.report.purposeRequired'
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
                <IntlMessage id="dataMapping.activity.dpia.report.reference" />
              }
              name={['dpia', 'reference']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.report.referenceRequired'
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
                <IntlMessage id="dataMapping.activity.dpia.report.project" />
              }
              name={['dpia', 'project']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.report.projectRequired'
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
                <IntlMessage id="dataMapping.activity.dpia.report.listOfPersonalData" />
              }
              name={['dpia', 'listOfPersonalData']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.report.listOfPersonalDataRequired'
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
                <IntlMessage id="dataMapping.activity.dpia.report.description" />
              }
              name={['dpia', 'description']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.report.descriptionRequired'
                  )
                ),
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Card>
        </Form>
      </Collapse.Panel>
    </Collapse>
  );
};
