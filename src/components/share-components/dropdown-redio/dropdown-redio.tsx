import { css } from '@emotion/css';
import { Select, Radio, Col, Empty } from 'antd';
import type { RadioChangeEvent } from 'antd';
import _ from 'lodash';
import { useState, useEffect } from 'react';

type optionType = {
  value: string;
  label: string;
};
export type DropdownRedioProps = {
  option: optionType[];
  onFinish: (id: string) => void;
  valueKey?: string;
  placeholder?: string;
};

export const DropdownRedio = ({
  option,
  onFinish,
  valueKey,
  placeholder = 'เลือกข้อมูล',
}: DropdownRedioProps) => {
  const [checkedList, setCheckedList] =
    useState<string>('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (valueKey) {
      setCheckedList(valueKey);
    } else {
      const Key = _.get(option, '[0].value', '');
      setCheckedList(Key);
    }
  }, [option, valueKey]);

  const onChange = (e: RadioChangeEvent) => {
    setCheckedList(e.target.value);
    onFinish(e.target.value);
  };

  return (
    <Select
      className={css`
        width: 90%;
        margin: 10px;
        .ant-select-selection-overflow {
          position: relative;
          display: flex;
          flex: auto;
          flex-wrap: nowrap;
          max-width: 100%;
        }
        .ant-select-selector {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          overflow-x: scroll;
          height: 40px;
          padding: 2.5px 8.5px;
        }
      `}
      value={checkedList}
      placeholder={placeholder}
      open={open}
      onDropdownVisibleChange={() => setOpen(!open)}
      dropdownRender={() => (
        <Col
          className={css`
            padding: 10px;
          `}
        >
          {option.length > 0 ? (
            <Col
              className={css`
                overflow-x: scroll;
                width: 100%;
                max-height: 250px;
                margin-top: 10px;
                padding-top: 0;
              `}
            >
              <Radio.Group
                options={option}
                className={css`
                  line-height: 2.5;
                  display: flex !important;
                  flex-direction: column !important;
                `}
                onChange={onChange}
                value={checkedList}
              />
            </Col>
          ) : (
            <Empty />
          )}
        </Col>
      )}
      options={option}
    />
  );
};
