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

import validation from '@/utils/validation';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

type ProcessingDetailProps = {
  form: FormInstance;
};

export const ProcessingDetail = ({
  form,
}: ProcessingDetailProps) => {
  const { t } = useTranslation();

  return (
    <Collapse
      defaultActiveKey={['1']}
      style={{ margin: '10px 0' }}
    >
      <Collapse.Panel
        header={
          <IntlMessage id="dataMapping.activity.dpia.processingDetail.header" />
        }
        key={'1'}
        style={{ fontWeight: 'bold' }}
      >
        <Form layout="vertical" form={form}>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.processingDetail.relationshipOfDataSubject" />
              }
              name={[
                'processingDetail',
                'relationshipOfDataSubject',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.processingDetail.relationshipOfDataSubjectRequired'
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
                <IntlMessage id="dataMapping.activity.dpia.processingDetail.controlOfDataSubject" />
              }
              name={[
                'processingDetail',
                'controlOfDataSubject',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.processingDetail.controlOfDataSubjectRequired'
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
                <IntlMessage id="dataMapping.activity.dpia.processingDetail.isDataSubjectExpectProcessing" />
              }
              name={[
                'processingDetail',
                'isDataSubjectExpectProcessing',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.processingDetail.isDataSubjectExpectProcessingRequired'
                  )
                ),
              ]}
            >
              <Radio.Group>
                <Space
                  direction="vertical"
                  style={{ fontWeight: 'normal' }}
                >
                  <Radio value={true}>
                    <IntlMessage id="dataMapping.activity.dpia.processingDetail.isDataSubjectExpectProcessing.true" />
                  </Radio>

                  <Radio value={false}>
                    <IntlMessage id="dataMapping.activity.dpia.processingDetail.isDataSubjectExpectProcessing.false" />
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Card>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.processingDetail.isWorryProcessing" />
              }
              name={[
                'processingDetail',
                'isWorryProcessing',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.processingDetail.isWorryProcessingRequired'
                  )
                ),
              ]}
            >
              <Radio.Group>
                <Space
                  direction="vertical"
                  style={{ fontWeight: 'normal' }}
                >
                  <Radio value={true}>
                    <IntlMessage id="dataMapping.activity.dpia.processingDetail.isDataSubjectExpectProcessing.true" />
                  </Radio>

                  <Radio value={false}>
                    <IntlMessage id="dataMapping.activity.dpia.processingDetail.isDataSubjectExpectProcessing.false" />
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Card>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.processingDetail.isNewProcessing" />
              }
              name={[
                'processingDetail',
                'isNewProcessing',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.processingDetail.isNewProcessingRequired'
                  )
                ),
              ]}
            >
              <Radio.Group>
                <Space
                  direction="vertical"
                  style={{ fontWeight: 'normal' }}
                >
                  <Radio value={true}>
                    <IntlMessage id="dataMapping.activity.dpia.processingDetail.isNewProcessing.true" />
                  </Radio>

                  <Radio value={false}>
                    <IntlMessage id="dataMapping.activity.dpia.processingDetail.isNewProcessing.false" />
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Card>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.processingDetail.levelOfTechForProcessing" />
              }
              name={[
                'processingDetail',
                'levelOfTechForProcessing',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.processingDetail.levelOfTechForProcessingRequired'
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
                <IntlMessage id="dataMapping.activity.dpia.processingDetail.isSocietyWorry" />
              }
              name={[
                'processingDetail',
                'isSocietyWorry',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.processingDetail.isSocietyWorryRequired'
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
                      <IntlMessage id="dataMapping.activity.dpia.processingDetail.isSocietyWorry.true" />
                    </Radio>
                    <Form.Item
                      shouldUpdate={(
                        prevValues,
                        curValues
                      ) =>
                        prevValues.processingDetail !==
                        curValues.processingDetail
                      }
                      noStyle
                    >
                      {({ getFieldValue }) => {
                        const processingDetail =
                          getFieldValue(
                            'processingDetail'
                          );

                        return (
                          <Form.Item
                            noStyle
                            name={[
                              'processingDetail',
                              'societyWorryDetail',
                            ]}
                          >
                            <Input
                              disabled={
                                !processingDetail?.isSocietyWorry
                              }
                            />
                          </Form.Item>
                        );
                      }}
                    </Form.Item>
                  </Flex>
                  <Radio value={false}>
                    <IntlMessage id="dataMapping.activity.dpia.processingDetail.isSocietyWorry.false" />
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Card>
        </Form>
      </Collapse.Panel>
    </Collapse>
  );
};
