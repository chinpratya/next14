// import { AlignRightOutlined } from '@ant-design/icons';
import { Flex } from '@mantine/core';
import {
  Checkbox,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { type User, useListUser } from '@/features/admin';
import { getColLayout, validation } from '@/utils';

import { WorkflowTaskDynamicForm } from './workflow-task-dynamic';
import { WorkflowTaskSetScheuleTable } from './workflow-task-set-schedule-table';
import { WorkflowTaskSubForm } from './workflow-task-sub-form';

type WorkflowTaskFormProps = {
  form?: FormInstance;
  onSubmit?: () => void;
};

export const WorkflowTaskForm = ({
  form,
  onSubmit,
}: WorkflowTaskFormProps) => {
  const listUser = useListUser({});
  const { t } = useTranslation();
  const delegateOptions = _.map(
    listUser?.data?.data,
    (v: User) => {
      return {
        label: v.email,
        value: v.userId,
      };
    }
  );

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row gutter={12}>
        <Col
          {...getColLayout(24)}
          style={{ marginBottom: -30 }}
        >
          <Flex justify="flex-end">
            <Typography
              style={{
                fontSize: '16px',
                fontFamily: 'Roboto',
                fontWeight: '500',
                marginRight: '10px',
              }}
            >
              Necessary
            </Typography>
            <Form.Item name={'necessary'}>
              <Switch
                style={{
                  marginTop: -15,
                  marginRight: 5,
                }}
              />
            </Form.Item>
          </Flex>
        </Col>
        <Col {...getColLayout(24)}>
          <Form.Item
            label="ชื่องาน"
            name={'name'}
            rules={[validation.required('กรุณาระบุชื่อ')]}
          >
            <Input placeholder="ระบุชื่อ" />
          </Form.Item>
        </Col>

        <WorkflowTaskDynamicForm />

        <Col {...getColLayout(24)}>
          <Form.Item
            label="ผู้รับผิดชอบ"
            name={'responsible_person'}
            rules={[validation.required('กรุณาระบุชื่อ')]}
          >
            <Select
              // sss
              mode="multiple"
              placeholder="เลือกผู้รับผิดชอบ"
              options={delegateOptions}
            />
          </Form.Item>
        </Col>
        <Col {...getColLayout(24)}>
          <Flex
            justify="space-between"
            align="flex-start"
          >
            <Form.Item
              name={'check_1'}
              valuePropName="checked"
            >
              <Checkbox>
                กำหนดลำดับในการดำเนินงาน
              </Checkbox>
            </Form.Item>
          </Flex>

          <Form.Item
            shouldUpdate={(prevValues, curValues) =>
              prevValues.check_1 !== curValues.check_1
            }
            noStyle
          >
            {({ getFieldsValue }) => {
              return (
                <Form.Item
                  label="ลำดับการดำเนินงาน"
                  name={'answer_form'}
                  rules={[
                    validation.required('กรุณาระบุชื่อ'),
                  ]}
                >
                  <Select
                    disabled={!getFieldsValue().check_1}
                    mode="multiple"
                    placeholder="เลือก"
                  />
                </Form.Item>
              );
            }}
          </Form.Item>
        </Col>

        <Col {...getColLayout(24)}>
          <Form.Item
            name={'set_timing'}
            valuePropName="checked"
          >
            <Checkbox
              style={{
                paddingBottom: 0,
              }}
            >
              {' '}
              ตั้งค่าเวลาดำเนินการ
            </Checkbox>
          </Form.Item>
          <Form.Item
            shouldUpdate={(prevValues, curValues) =>
              prevValues.set_timing !==
              curValues.set_timing
            }
            noStyle
          >
            {({ getFieldsValue }) => {
              return (
                <>
                  {getFieldsValue().set_timing ===
                  true ? (
                    <>
                      <WorkflowTaskSetScheuleTable />
                    </>
                  ) : null}
                </>
              );
            }}
          </Form.Item>
        </Col>

        <WorkflowTaskSubForm />
      </Row>
    </Form>
  );
};
