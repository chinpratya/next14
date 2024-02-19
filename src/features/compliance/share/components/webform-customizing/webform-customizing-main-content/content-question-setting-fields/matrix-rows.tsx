import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Empty, Form, Input, Switch } from 'antd';

import validation from '@/utils/validation';

import { MatrixMore } from './matrix-more';

export const MatrixRows = () => {
  return (
    <Form.List name="rows">
      {(fields, { add, remove }) => (
        <>
          <table
            className={css`
              border-collapse: collapse;

              & > thead > tr > th {
                padding: 8px;
              }

              thead > tr > th {
                text-align: left;
              }
            `}
          >
            <thead hidden={fields.length === 0}>
              <tr>
                <th style={{ width: '80%' }}>แถว</th>
                <th
                  style={{
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  หัวข้อ
                </th>
                <th style={{ width: '100%' }}></th>
              </tr>
            </thead>
            {fields.map((field) => (
              <tbody key={field.key}>
                <tr>
                  <td>
                    <Form.Item
                      {...field}
                      name={[field.name, 'title']}
                      className="mb-2"
                      rules={[
                        validation.required('หัวข้อ'),
                      ]}
                    >
                      <Input
                        style={{
                          width: 310,
                        }}
                      />
                    </Form.Item>
                  </td>
                  <td
                    style={{
                      textAlign: 'center',
                      width: 80,
                    }}
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, 'isTitle']}
                      noStyle
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </td>
                  <td style={{ textAlign: 'end' }}>
                    <Form.Item noStyle>
                      <DeleteOutlined
                        onClick={() => remove(field.name)}
                      />
                    </Form.Item>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <MatrixMore
                      field={field}
                      parentType="rows"
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          {fields.length === 0 && (
            <Empty className="mb-4" />
          )}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              เพิ่ม
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
