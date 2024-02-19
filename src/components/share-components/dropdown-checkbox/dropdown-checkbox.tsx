import { css } from '@emotion/css';
import {
  Select,
  Checkbox,
  Col,
  Divider,
  Row,
  Button,
  Empty,
  // Tag,
} from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import _ from 'lodash';
// import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { useState, useEffect } from 'react';

type optionType = {
  value: string;
  label: string;
};
export type DropdownCheckboxProps = {
  option: optionType[];
  onFinish: (id: string[]) => void;
  valueKey?: string[];
  placeholder?: string;
};

export const DropdownCheckbox = ({
  option,
  onFinish,
  valueKey,
  placeholder = 'เลือกข้อมูล',
}: DropdownCheckboxProps) => {
  const [checkedList, setCheckedList] = useState<
    CheckboxValueType[]
  >([]);
  const [optionSelect, setOptionSelect] = useState<
    string[]
  >([]);
  const [checkAll, setCheckAll] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (option) {
      const filterOption = _.map(
        option,
        (value) => value.label
      );

      setOptionSelect(filterOption);
      if (valueKey) {
        setCheckedList(valueKey);
        setCheckAll(valueKey.length === option.length);
      }
    }
  }, [option, valueKey]);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    onFinish(list as string[]);
    setCheckAll(list.length === optionSelect.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    console.log(
      'listall',
      _.map(option, (v) => v.value)
    );

    setCheckedList(
      e.target.checked
        ? _.map(option, (v) => v.value)
        : []
    );
    onFinish(
      e.target.checked
        ? _.map(option, (v) => v.value)
        : []
    );

    setCheckAll(e.target.checked);
  };

  const handleChange = (value: string[]) => {
    setCheckedList(value as string[]);
    onFinish(value as string[]);
    setCheckAll(value.length === optionSelect.length);
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
      mode="multiple"
      allowClear
      // tagRender={tagRender}
      value={checkedList as string[]}
      onChange={handleChange}
      placeholder={placeholder}
      open={open}
      onDropdownVisibleChange={() => setOpen(!open)}
      dropdownRender={() => (
        <Col
          className={css`
            padding: 10px;
          `}
        >
          <Checkbox
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            ทั้งหมด
          </Checkbox>
          {optionSelect.length > 0 ? (
            <Col
              className={css`
                overflow-x: scroll;
                width: 100%;
                max-height: 250px;
                margin-top: 10px;
                padding-top: 0;
              `}
            >
              <Checkbox.Group
                className={css`
                  line-height: 2.5;
                  display: flex !important;
                  flex-direction: column !important;
                `}
                onChange={onChange}
                value={checkedList}
              >
                {_.map(option, (v) => (
                  <Col>
                    <Checkbox value={v.value}>
                      {v.label}
                    </Checkbox>
                  </Col>
                ))}
              </Checkbox.Group>
            </Col>
          ) : (
            <Empty />
          )}
          <Divider
            className={css`
              margin-bottom: 10px;
            `}
          />
          <Row justify={'space-between'} align={'middle'}>
            <Button
              type={'link'}
              onClick={() => {
                setCheckAll(false);
                setCheckedList([]);
              }}
            >
              Reset
            </Button>
          </Row>
        </Col>
      )}
      options={option}
    />
  );
};
