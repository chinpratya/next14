import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  FormInstance,
  Input,
  Radio,
  Row,
  Select,
  Skeleton,
  Space,
} from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { useListUser } from '@/features/admin';
import { getColLayout, validation } from '@/utils';

import { SlaSeverityTable } from '../sla-severity-table';

type WorkflowFormProps = {
  form: FormInstance;
  onSubmit?: () => void;
};
export const WorkflowForm = ({
  form,
}: // onSubmit,
WorkflowFormProps) => {
  const router = useRouter();
  const { data, isLoading } = useListUser({});
  const users = data?.data;
  const { t } = useTranslation();

  const delegateOptions = _.map(users, (v) => {
    return {
      label: v.email,
      value: v.userId,
    };
  });

  const sla = Form.useWatch('sla', form);
  const serviceAgreementType = Form.useWatch(
    'service_agreement_type',
    form
  );
  const isSpecifyTaskDuration = Form.useWatch(
    'is_specify_task_duration',
    form
  );
  console.debug(isSpecifyTaskDuration);
  const onFinish = (values: unknown) => {
    router.push(
      `/apps/datafence/incident-management/workflow/task`
    );
  };
  return (
    <Card
      title="รายละเอียด"
      actions={[
        <Flex
          gap={8}
          justify="flex-end"
          align="center"
          key="action-button"
          style={{ marginRight: '1.5em' }}
        >
          <Button>
            {t(
              'incidentManagement.workflow.create.form.button.cancel'
            )}
          </Button>
          <Button
            type="primary"
            onClick={() => {
              form.submit();
            }}
          >
            {t(
              'incidentManagement.workflow.create.form.button.submit'
            )}
          </Button>
        </Flex>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={12}>
          <Col {...getColLayout(24)}>
            <Form.Item
              label={t(
                'incidentManagement.workflow.create.form.name'
              )}
              name={'name'}
              rules={[
                validation.required('กรุณาระบุชื่อ'),
              ]}
              style={{ width: '100%' }}
            >
              <Input placeholder="ระบุชื่อ" />
            </Form.Item>
          </Col>

          <Col {...getColLayout(24)}>
            <Form.Item
              label="ผู้เกี่ยวข้อง"
              name={'responsible_user'}
              // rules={[
              //   validation.required(
              //     'กรุณาเลือกผู้เกี่ยวข้อง'
              //   ),
              // ]}
            >
              {isLoading ? (
                <Skeleton />
              ) : (
                <Select
                  placeholder="เลือกผู้เกี่ยวข้อง"
                  options={delegateOptions}
                  mode="multiple"
                />
              )}
            </Form.Item>
          </Col>

          {/* <Col {...getColLayout(12)}>
            <Form.Item
              label="หมวดหมู่เหตุการณ์"
              name={'category'}
              rules={[
                validation.required(
                  'กรุณาเลือกหมวดหมู่เหตุการณ์'
                ),
              ]}
            >
              <Select
                placeholder="เลือกหมวดหมู่เหตุการณ์"
                mode="multiple"
              />
            </Form.Item>
          </Col> */}
          {/* <Col {...getColLayout(12)}>
            <Form.Item
              label="ช่องทางเหตุการณ์"
              name={'sub_category'}
              rules={[
                validation.required(
                  'กรุณาเลือกช่องทางเหตุการณ์'
                ),
              ]}
            >
              <Select
                placeholder="เลือกช่องทางเหตุการณ์"
                mode="multiple"
              />
            </Form.Item>
          </Col> */}
          {/* <Col {...getColLayout(12)}>
            <Form.Item
              label="ประเภทเหตุการณ์"
              name={'type'}
              rules={[
                validation.required(
                  'กรุณาเลือกประเภทเหตุการณ์'
                ),
              ]}
            >
              <Select
                placeholder="เลือกประเภทเหตุการณ์"
                mode="multiple"
              />
            </Form.Item>
          </Col> */}
          <Col {...getColLayout(24)}>
            <Form.Item
              label="รายละเอียด"
              name={'description'}
              rules={[
                validation.required('กรุณาระบุละเอียด'),
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>

          <Col {...getColLayout(24)}>
            <Form.Item
              label=""
              name={'is_specify_task_duration'}
              valuePropName="checked"
            >
              <Checkbox>
                กำหนดระยะเวลาในการดำเนินการของแผนการตอบสนอง
              </Checkbox>
            </Form.Item>
          </Col>
          {isSpecifyTaskDuration ? (
            <>
              <Col {...getColLayout(24)}>
                <Form.Item
                  label=""
                  name={'service_agreement_type'}
                  rules={[
                    validation.required(
                      'กรุณาเลือกประเภทของระยะเวลา'
                    ),
                  ]}
                >
                  <Radio.Group
                    className={css`
                      display: block;
                    `}
                  >
                    <Space
                      direction="vertical"
                      className={css`
                        width: 100%;
                      `}
                    >
                      <Radio value="sla">
                        ตามข้อตกลงระดับการให้บริการ (SLA)
                      </Radio>
                      {serviceAgreementType === 'sla' ? (
                        <Form.Item
                          label="SLA"
                          name={'sla'}
                        >
                          <Select
                            placeholder="เลือก SLA"
                            options={[
                              {
                                label: 'sla1',
                                value: 'sla1',
                              },
                            ]}
                          />
                        </Form.Item>
                      ) : null}
                      <Radio value="custom">
                        กำหนดเอง
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>

              {sla ? (
                <Col {...getColLayout(24)}>
                  <SlaSeverityTable />
                </Col>
              ) : null}

              {serviceAgreementType === 'custom' ? (
                <Col {...getColLayout(24)}>
                  <SlaSeverityTable editable />
                </Col>
              ) : null}
            </>
          ) : null}
        </Row>
      </Form>
    </Card>
  );
};
