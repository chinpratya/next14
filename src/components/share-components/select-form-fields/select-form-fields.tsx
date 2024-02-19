import { css } from '@emotion/css';
import { Col, Row, Typography } from 'antd';

import { PRIMARY_COLOR } from '@/config/color';
import { fieldsInfo } from '@/config/fields';
import { FieldInfo } from '@/types';
import { Widget } from '@/types/form-builder';
import { getColLayout } from '@/utils';

export type SelectFormFieldsProps = {
  title: string;
  search?: string;
  fields: Widget[];
  onClick?: (field: FieldInfo) => void;
};

export const SelectFormFields = ({
  title,
  search = '',
  fields,
  onClick,
}: SelectFormFieldsProps) => {
  const filteredFields =
    search === ''
      ? fields
      : fields.filter((field) =>
          fieldsInfo[field].title
            .toLowerCase()
            .includes(search.toLowerCase())
        );

  if (filteredFields?.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col mt-4">
      <Typography.Title level={4}>
        {title}
      </Typography.Title>
      <Row gutter={[24, 24]}>
        {filteredFields.map((field) => (
          <Col key={field} {...getColLayout(8)}>
            <div
              onClick={() => onClick?.(fieldsInfo[field])}
              key={field}
              className={css`
                padding: 24px;
                display: flex;
                align-items: center;

                :hover {
                  background-color: ${PRIMARY_COLOR};
                  cursor: pointer;

                  .ant-typography-secondary {
                    color: white;
                  }
                }
              `}
            >
              {fieldsInfo[field].icon}
              <Typography.Text
                type="secondary"
                className="pl-2"
              >
                {fieldsInfo[field].title}
              </Typography.Text>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
