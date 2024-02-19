import {
  Card,
  Collapse,
  Form,
  Input,
  Radio,
  Space,
  FormInstance,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { UploadButton } from '@/features/shared';
import validation from '@/utils/validation';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

type NatureDataProcessingProps = {
  form: FormInstance;
};

export const NatureDataProcessing = ({
  form,
}: NatureDataProcessingProps) => {
  const { t } = useTranslation();

  return (
    <Collapse
      defaultActiveKey={['1']}
      style={{ margin: '10px 0' }}
    >
      <Collapse.Panel
        header={
          <IntlMessage id="dataMapping.activity.dpia.natureOfDataProcessing.header" />
        }
        key={'1'}
        style={{ fontWeight: 'bold' }}
      >
        <Form layout="vertical" form={form}>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.natureOfDataProcessing.description" />
              }
              name={[
                'natureOfDataProcessing',
                'description',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.natureOfDataProcessing.descriptionRequired'
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
                <IntlMessage id="dataMapping.activity.dpia.natureOfDataProcessing.source" />
              }
              name={['natureOfDataProcessing', 'source']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.natureOfDataProcessing.sourceRequired'
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
                <IntlMessage id="dataMapping.activity.dpia.natureOfDataProcessing.isShare" />
              }
              name={['natureOfDataProcessing', 'isShare']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.natureOfDataProcessing.isShareRequired'
                  )
                ),
              ]}
            >
              <Radio.Group>
                <Space
                  direction="vertical"
                  style={{ fontWeight: 'normal' }}
                >
                  <Flex
                    justifyContent="start"
                    alignItems="center"
                  >
                    <Radio value={true}>
                      <IntlMessage id="dataMapping.activity.dpia.natureOfDataProcessing.isShare.true" />
                    </Radio>
                    <Form.Item
                      shouldUpdate={(
                        prevValues,
                        curValues
                      ) =>
                        prevValues.natureOfDataProcessing !==
                        curValues.natureOfDataProcessing
                      }
                      noStyle
                    >
                      {({ getFieldValue }) => {
                        const natureOfDataProcessing =
                          getFieldValue(
                            'natureOfDataProcessing'
                          );

                        return (
                          <Form.Item
                            noStyle
                            name={[
                              'natureOfDataProcessing',
                              'shareDetail',
                            ]}
                          >
                            <Input
                              disabled={
                                !natureOfDataProcessing?.isShare
                              }
                            />
                          </Form.Item>
                        );
                      }}
                    </Form.Item>
                  </Flex>
                  <Radio value={false}>
                    <IntlMessage id="dataMapping.activity.dpia.natureOfDataProcessing.isShare.false" />
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Card>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.natureOfDataProcessing.riskProcessing" />
              }
              name={[
                'natureOfDataProcessing',
                'riskProcessing',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.natureOfDataProcessing.riskProcessingRequired'
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
                <IntlMessage id="dataMapping.activity.dpia.natureOfDataProcessing.fileUrl" />
              }
              name={['natureOfDataProcessing', 'fileUrl']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.natureOfDataProcessing.fileUrlRequired"'
                  )
                ),
              ]}
            >
              <UploadButton
                type="default"
                module="data-mapping"
                group="activity-dpia"
                label="Upload"
              />
            </Form.Item>
          </Card>
        </Form>
      </Collapse.Panel>
    </Collapse>
  );
};
