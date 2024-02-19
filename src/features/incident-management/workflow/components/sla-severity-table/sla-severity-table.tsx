import { css } from '@emotion/css';
import {
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  type SelectProps,
} from 'antd';
import {
  ChangeEventHandler,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { SERVERITY_LEVEL } from '../sla-severity-icon/severity-constant';
import { HtmlWrapper } from './html-wrapper';
import { SeverityWithColor } from './severity-with-color';
import { type Key } from 'react';
import _ from 'lodash';
import { NoDataCard } from '@components/no-data-card';
import { ServerityListDatas } from '../../types';
import validation from '@/utils/validation';

type DataSourceType = {
  key: string;
  title: string;
  highest: ReactNode;
  high: ReactNode;
  medium: ReactNode;
  low: ReactNode;
  lower: ReactNode;
  name?: string;
  description?: string;
  lv?: string;
  children?: DataSourceType[];
  order?: number;
};

type SlaSelectTableProps = {
  editable?: boolean;
  value?: string;
  onChange?: (value: Key) => void;
  data?: ServerityListDatas;
  detailData?: any;
};

export function SlaSeverityTable({
  editable,
  data,
  value,
  onChange,
  detailData,
}: SlaSelectTableProps) {
  const dataColumns =
    data?.data || detailData?.severityList;
  const sortData = dataColumns?.sort(
    (a: any, b: any) => (b?.order || 0) - (a?.order || 0)
  );
  const columnsSLA = sortData?.map((data: any) => {
    return {
      align: 'center',
      title: (
        <>
          <SeverityWithColor level={data?.value} />
        </>
      ),
      dataIndex: data?.value,
      width: 300,
    };
  });
  const array: any = [];
  const test = array.concat(
    {
      title: '',
      dataIndex: 'title',
      width: 250,
    },
    columnsSLA || {}
  );
  const mockEditable: DataSourceType[] = [
    {
      key: '12',
      title: 'ระยะเวลาการทำงาน',
      name: '',
      description: '',
      lv: '1',
      ...createInputForEachLevel(
        'workingTime',
        '1',
        editable as boolean
      ),
      children: [
        {
          key: '1',
          title: 'คำอธิบาย',
          lv: '2',
          ...createInputForEachLevel(
            'descriptionWorkingTime',
            '2',
            editable as boolean
          ),
        },
      ],
    },
    {
      key: '21',
      title: 'ระยะเวลาในการตอบสนอง',
      name: '',
      description: '',
      lv: '1',
      ...createInputForEachLevel(
        'responsTime',
        '1',
        editable as boolean
      ),
      children: [
        {
          key: '2.1',
          title: 'คำอธิบาย',
          name: '',
          lv: '2',
          ...createInputForEachLevel(
            'descriptionResponsTime',
            '2',
            editable as boolean
          ),
        },
      ],
    },
  ];

  return (
    <>
      {data || detailData ? (
        <>
          <Table
            className={css`
              .ant-table-thead > tr > th {
                background-color: #f2f3f5;
              }
              .ant-table-row > .ant-table-cell {
                vertical-align: text-top;
              }
            `}
            scroll={{
              y: 400,
            }}
            columns={test}
            dataSource={mockEditable}
            bordered
            expandable={{
              defaultExpandAllRows: true,
            }}
            pagination={false}
          />
        </>
      ) : (
        <>
          <NoDataCard />
        </>
      )}
    </>
  );
}

type ClickableInputProps = {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  name?: string;
  title?: string;
  editables: boolean;
};
export function ClickableInput({
  onChange,
  placeholder = 'Day : Hrs : Mins',
  name,
  editables,
  title,
}: ClickableInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const nameEdit = 'description';
  const nameTimeEdit = 'timeLimit';
  const mins: SelectProps['options'] = [];
  const hrs: SelectProps['options'] = [];
  for (let i = 0; i < 60; i++) {
    mins.push({
      label: i,
      value: i,
    });
  }
  for (let i = 0; i < 24; i++) {
    hrs.push({
      label: i,
      value: i,
    });
  }

  return (
    <>
      {placeholder === 'descriptionWorkingTime' ||
      placeholder === 'descriptionResponsTime' ? (
        <Form.Item
          name={`${name}-${nameEdit}-${placeholder}`}
          required={
            placeholder !== 'descriptionResponsTime' &&
            placeholder === 'descriptionWorkingTime'
          }
          rules={[
            validation.required('กรุณากรอกคำอธิบาย'),
          ]}
        >
          <Input.TextArea
            placeholder={'คำอธิบาย'}
            bordered={isEditing}
            name={name}
            onClick={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            disabled={!editables}
          />
        </Form.Item>
      ) : (
        <>
          <Row style={{ padding: 0 }} gutter={24}>
            <Col span={8}>
              <Form.Item
                name={`${name}-${nameTimeEdit}-${placeholder}-day`}
                label="Day"
                rules={[
                  validation.required('กรุณากรอกวัน'),
                ]}
                required={
                  placeholder === 'descriptionWorkingTime'
                }
                initialValue={0}
              >
                <InputNumber
                  min={0}
                  placeholder={'Day'}
                  bordered={isEditing}
                  style={{
                    textAlign: 'center',
                    margin: 0,
                  }}
                  onClick={() => setIsEditing(true)}
                  onBlur={() => setIsEditing(false)}
                  disabled={!editables}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={`${name}-${nameTimeEdit}-${placeholder}-hrs`}
                label="Hour"
                required={
                  placeholder === 'descriptionWorkingTime'
                }
                initialValue={0}
              >
                <Select
                  allowClear
                  placeholder={'Hrs'}
                  bordered={isEditing}
                  options={hrs}
                  onClick={() => setIsEditing(true)}
                  onBlur={() => setIsEditing(false)}
                  style={{
                    textAlign: 'center',
                    margin: 0,
                  }}
                  disabled={!editables}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={`${name}-${nameTimeEdit}-${placeholder}-mins`}
                label="Mins"
                required={
                  placeholder === 'descriptionWorkingTime'
                }
                initialValue={0}
              >
                <Select
                  allowClear
                  placeholder={'Mins'}
                  bordered={isEditing}
                  options={mins}
                  onClick={() => setIsEditing(true)}
                  onBlur={() => setIsEditing(false)}
                  style={{
                    textAlign: 'center',
                    margin: 0,
                  }}
                  disabled={!editables}
                />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

function createInputForEachLevel(
  placeholder?: string,
  title?: string,
  editable?: boolean
) {
  return {
    [SERVERITY_LEVEL.HIGHEST]: (
      <ClickableInput
        placeholder={placeholder}
        title={title}
        name={`sla-${SERVERITY_LEVEL.HIGHEST}`}
        editables={editable as boolean}
      />
    ),
    [SERVERITY_LEVEL.HIGH]: (
      <ClickableInput
        placeholder={placeholder}
        title={title}
        name={`sla-${SERVERITY_LEVEL.HIGH}`}
        editables={editable as boolean}
      />
    ),
    [SERVERITY_LEVEL.MEDIUM]: (
      <ClickableInput
        placeholder={placeholder}
        title={title}
        name={`sla-${SERVERITY_LEVEL.MEDIUM}`}
        editables={editable as boolean}
      />
    ),
    [SERVERITY_LEVEL.LOW]: (
      <ClickableInput
        placeholder={placeholder}
        title={title}
        name={`sla-${SERVERITY_LEVEL.LOW}`}
        editables={editable as boolean}
      />
    ),
    [SERVERITY_LEVEL.LOWER]: (
      <ClickableInput
        placeholder={placeholder}
        title={title}
        name={`sla-${SERVERITY_LEVEL.LOWER}`}
        editables={editable as boolean}
      />
    ),
  };
}
