import {
  Form,
  FormInstance,
  InputNumber,
  Select,
  Switch,
} from 'antd';

import { useListUser } from '@/features/admin';
import validation from '@/utils/validation';
import { DescriptionBlock } from '@components/description-block';
import { Flex } from '@components/flex';

type TaskDetailNotificationProps = {
  form: FormInstance;
};

export const TaskDetailNotification = ({
  form,
}: TaskDetailNotificationProps) => {
  const { data } = useListUser({});
  const userOptions = data?.data?.map((user) => ({
    label: user.email,
    value: user.userId,
  }));

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        reminded: [
          {
            responsible: [],
            type: '',
            time: 0,
          },
        ],
      }}
    >
      <DescriptionBlock
        className="pr-2"
        title="วันสิ้นสุด"
        extra={
          <Form.Item className="mb-0" name="endDate">
            <InputNumber disabled />
          </Form.Item>
        }
      />
      <DescriptionBlock
        className="pr-2"
        title="กำหนดเวลาแจ้งเตือนงาน"
        description="กำหนดเวลาแจ้งเตือนงาน"
        extra={
          <Form.Item
            className="mb-0"
            name="isSetNotificationTime"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch
              checkedChildren="ON"
              unCheckedChildren="OFF"
              disabled
            />
          </Form.Item>
        }
      />
      <DescriptionBlock
        className="pr-2"
        title="การแจ้งเตือนงาน"
        divider={false}
      />
      {/* <Row gutter={[24, 0]}>
        <Col {...getColLayout(12)}>
          <Form.Item
            label="การแจ้งเตือน"
            name=""
            rules={[
              validation.required(
                'กรุณาเลือก การแจ้งเตือน'
              ),
            ]}
          >
            <Select
              onChange={(value) =>
                setNotificationType(value)
              }
              options={[
                {
                  label: 'ตามกำหนดเวลา',
                  value: 'ตามกำหนดเวลา',
                },
                {
                  label: 'ก่อนกำหนดเวลา',
                  value: 'ก่อนกำหนดเวลา',
                },
                {
                  label: 'หลังกำหนดเวลา',
                  value: 'หลังกำหนดเวลา',
                },
              ]}
            />
          </Form.Item>
        </Col>
        {['ก่อนกำหนดเวลา', 'หลังกำหนดเวลา'].includes(
          notificationType
        ) && (
          <Col {...getColLayout(12)}>
            <Form.Item
              className={css`
                padding-top: 28px;
              `}
              name="notiDt"
              rules={[
                validation.required(
                  'กรุณาเลือก การแจ้งเตือน'
                ),
              ]}
            >
              <DatePicker
                className="w-100"
                disabledDate={(current) =>
                  current.isBefore(
                    dayjs()
                      .startOf('day')
                      .subtract(0, 'day')
                  )
                }
              />
            </Form.Item>
          </Col>
        )}
        <Col {...getColLayout(24)}>
          <Form.Item
            label="ผู้ที่รับผิดชอบ"
            name=""
            rules={[
              validation.required(
                'กรุณาเลือก ผู้ที่รับผิดชอบ'
              ),
            ]}
          >
            <Select options={[]} />
          </Form.Item>
        </Col>
      </Row> */}
      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.isSetNotificationTime !==
          currentValues.isSetNotificationTime
        }
        noStyle
      >
        {({ getFieldValue }) => {
          const isSetNiti = getFieldValue(
            'isSetNotificationTime'
          );

          if (isSetNiti) {
            return (
              <>
                <Form.List name={'reminded'}>
                  {(fields) => (
                    <>
                      {fields.map((field) => (
                        <Flex key={field.key}>
                          <div style={{ width: '100%' }}>
                            <Flex
                              justifyContent={'between'}
                              alignItems={'center'}
                            >
                              <Form.Item
                                label="การแจ้งเตือน"
                                name={[
                                  field.name,
                                  'type',
                                ]}
                                style={{ width: '45%' }}
                                rules={[
                                  validation.required(
                                    'กรุณาเลือกการแจ้งเตือน'
                                  ),
                                ]}
                              >
                                <Select
                                  disabled
                                  options={[
                                    {
                                      label: 'Before',
                                      value: 'before',
                                    },
                                    {
                                      label: 'After',
                                      value: 'after',
                                    },
                                    {
                                      label: 'Ontime',
                                      value: 'ontime',
                                    },
                                  ]}
                                />
                              </Form.Item>
                              <Form.Item
                                shouldUpdate={(
                                  prevValues,
                                  currentValues
                                ) =>
                                  prevValues['reminded'][
                                    field.name
                                  ]?.type !==
                                  currentValues[
                                    'reminded'
                                  ][field.name]?.type
                                }
                                noStyle
                              >
                                {({ getFieldValue }) => {
                                  const type =
                                    getFieldValue([
                                      'reminded',
                                      field.name,
                                      'type',
                                    ]) !== '' &&
                                    getFieldValue([
                                      'reminded',
                                      field.name,
                                      'type',
                                    ]) !== 'ontime';

                                  if (type) {
                                    return (
                                      <Form.Item
                                        name={[
                                          field.name,
                                          'time',
                                        ]}
                                        style={{
                                          width: '45%',
                                        }}
                                        initialValue={''}
                                      >
                                        <InputNumber
                                          disabled
                                          className="w-100 mt-4"
                                          min={0}
                                        />
                                      </Form.Item>
                                    );
                                  }
                                  return null;
                                }}
                              </Form.Item>
                            </Flex>

                            <Form.Item
                              className="mb-2 w-100"
                              label="ผู้รับการแจ้งเตือน"
                              name={[
                                field.name,
                                'responsible',
                              ]}
                              rules={[
                                validation.required(
                                  'กรุณาเลือกผู้รับการแจ้งเตือน'
                                ),
                              ]}
                              initialValue={''}
                            >
                              <Select
                                disabled
                                mode="multiple"
                                className="w-100"
                                options={userOptions}
                              />
                            </Form.Item>
                          </div>
                        </Flex>
                      ))}
                    </>
                  )}
                </Form.List>
              </>
            );
          }
          return null;
        }}
      </Form.Item>
    </Form>
  );
};
