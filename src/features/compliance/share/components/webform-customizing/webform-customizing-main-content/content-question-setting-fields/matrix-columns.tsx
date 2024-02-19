import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Empty, Form, Input } from 'antd';

import validation from '@/utils/validation';

import { MatrixMore } from './matrix-more';

export const MatrixColumns = () => {
  return (
    <Form.List name="columns">
      {(fields, { add, remove }) => (
        <>
          <table
            className={css`
              border-collapse: collapse;

              tbody > tr {
                :last-child {
                  border-bottom: none;
                }
              }

              tbody > tr > td {
              }
            `}
          >
            <tbody>
              {fields.map((field) => (
                <>
                  <tr key={`${field.key}-0`}>
                    <td style={{ width: '100%' }}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'title']}
                        rules={[
                          validation.required('คอลัมน์'),
                        ]}
                        className="mb-2 mr-2"
                      >
                        <Input />
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item noStyle>
                        <DeleteOutlined
                          onClick={() =>
                            remove(field.name)
                          }
                        />
                      </Form.Item>
                    </td>
                  </tr>
                  <tr key={`${field.key}-1`}>
                    <td colSpan={2}>
                      <MatrixMore
                        field={field}
                        parentType="columns"
                      />
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
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
