import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { InputMask } from '@react-input/mask';
import {
  Form,
  FormInstance,
  Table,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';

type WorkflowTaskSetScheuleTableProps = {
  form?: FormInstance;
};

interface DataType {
  key?: string;
  task?: string;
}
export const WorkflowTaskSetScheuleTable =
  ({}: WorkflowTaskSetScheuleTableProps) => {
    const columns: ColumnsType<DataType> = [
      {
        title: '',
        dataIndex: 'task',
        key: 'task',
        width: '15%',
        render: (text) => <Typography>{text}</Typography>,
      },

      {
        title: () => {
          return (
            <span style={{ color: '#b42318' }}>
              สูงสุด
            </span>
          );
        },
        dataIndex: 'highest',
        key: 'key',
        width: '10%',
        render: (_key, _data, index) => {
          return (
            <>
              {index === 2 ? (
                <>
                  <Flex align="center" justify="center">
                    <Typography>{10} Mins</Typography>
                  </Flex>
                </>
              ) : (
                <>
                  <Flex align="center" justify="center">
                    <Form.Item
                      name={`name_highest${index}`}
                      style={{
                        width: '100%',
                      }}
                    >
                      <InputMask
                        mask="__ : __ : __"
                        replacement={{ _: /\d/ }}
                        placeholder="Day : Hrs : Mins"
                        style={{
                          borderWidth: 0,
                          fontSize: 14,
                          width: '100%',
                        }}
                        required
                      />
                    </Form.Item>
                  </Flex>
                </>
              )}
            </>
          );
        },
      },

      {
        title: () => {
          return (
            <span style={{ color: '#F04438' }}>สูง</span>
          );
        },
        dataIndex: 'high',
        key: 'high',
        width: '10%',
        render: (_key, _data, index) => {
          return (
            <>
              {index === 2 ? (
                <>
                  <Flex align="center" justify="center">
                    <Typography>15 Mins</Typography>
                  </Flex>
                </>
              ) : (
                <>
                  <Flex align="center" justify="center">
                    <Form.Item
                      name={`name_high_${index}`}
                      style={{
                        width: '100%',
                      }}
                    >
                      <InputMask
                        mask="__ : __ : __"
                        replacement={{ _: /\d/ }}
                        placeholder="Day : Hrs : Mins"
                        style={{
                          borderWidth: 0,
                          fontSize: 14,
                          width: '100%',
                        }}
                        required
                      />
                    </Form.Item>
                  </Flex>
                </>
              )}
            </>
          );
        },
      },

      {
        title: () => {
          return (
            <span style={{ color: '#CE8312' }}>
              ปานกลาง
            </span>
          );
        },
        key: 'medium',
        dataIndex: 'medium',
        width: '10%',
        render: (_key, _data, index) => {
          return (
            <>
              {index === 2 ? (
                <>
                  <Flex align="center" justify="center">
                    <Typography>30 Mins</Typography>
                  </Flex>
                </>
              ) : (
                <>
                  <Flex align="center" justify="center">
                    <Form.Item
                      name={`name_medium_${index}`}
                      style={{
                        width: '100%',
                      }}
                    >
                      <InputMask
                        mask="__ : __ : __"
                        replacement={{ _: /\d/ }}
                        placeholder="Day : Hrs : Mins"
                        style={{
                          borderWidth: 0,
                          fontSize: 14,
                        }}
                        required
                      />
                    </Form.Item>
                  </Flex>
                </>
              )}
            </>
          );
        },
      },

      {
        title: () => {
          return (
            <span style={{ color: '#06AED4' }}>ต่ำ</span>
          );
        },
        key: 'low',
        dataIndex: 'low',
        width: '10%',
        render: (_key, _data, index) => {
          return (
            <>
              {index === 2 ? (
                <>
                  <Flex align="center" justify="center">
                    <Typography>1 Hrs</Typography>
                  </Flex>
                </>
              ) : (
                <>
                  <Flex align="center" justify="center">
                    <Form.Item
                      name={`name ${index}`}
                      style={{
                        width: '100%',
                      }}
                    >
                      <InputMask
                        mask="__ : __ : __"
                        replacement={{ _: /\d/ }}
                        placeholder="Day : Hrs : Mins"
                        style={{
                          borderWidth: 0,
                          fontSize: 14,
                        }}
                        required
                      />
                    </Form.Item>
                  </Flex>
                </>
              )}
            </>
          );
        },
      },

      {
        title: () => {
          return (
            <span style={{ color: '#0E7090' }}>
              ต่ำมาก
            </span>
          );
        },
        key: 'lowest',
        dataIndex: 'lowest',
        width: '10%',
        render: (_key, _data, index) => {
          return (
            <>
              {index === 2 ? (
                <>
                  <Flex align="center" justify="center">
                    <Typography>1 Hrs 30 Mins</Typography>
                  </Flex>
                </>
              ) : (
                <>
                  <Flex align="center" justify="center">
                    <Form.Item
                      name={`name_lowest_${index}`}
                      style={{
                        width: '100%',
                      }}
                    >
                      <InputMask
                        mask="__ : __ : __"
                        replacement={{ _: /\d/ }}
                        placeholder="Day : Hrs : Mins"
                        style={{
                          borderWidth: 0,
                          fontSize: 14,
                          width: '100%',
                        }}
                        required
                      />
                    </Form.Item>
                  </Flex>
                </>
              )}
            </>
          );
        },
      },
    ];

    const data: DataType[] = [
      {
        key: '1',
        task: 'ระยะเวลาการทำงาน',
      },
      {
        key: '2',
        task: 'ระยะเวลาในการตอบสนอง',
      },
      {
        key: '3',
        task: 'ระยะเวลาในการดำเนินที่กำหนด',
      },
    ];
    return (
      <>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          scroll={{ x: 1280 }}
          className={css`
            .ant-form-item {
              margin-top: -10px;
              margin-bottom: -10px;
              margin-left: -10px;
              margin-right: -10px;
            }
            .ant-table-thead .ant-table-cell {
              background-color: #f2f3f5;
            }
          `}
        />
      </>
    );
  };
