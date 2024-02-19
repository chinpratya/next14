import { Flex } from '@mantine/core';
import { Checkbox, Input, Radio } from 'antd';
import _ from 'lodash';
import React, { useCallback } from 'react';

import { UploadButton } from '../../../../../../shared';
import {
  WebformBuilderMatrixColumn,
  WebformBuilderMatrixRow,
  WebformBuilderMatrixRowColumnOption,
} from '../../../../types/webform-builder';

type ColumnOptionValue = {
  checked?: string[];
  selected?: string;
  optionValues?: {
    [key: string]: unknown[];
  };
};

export type ColumnOptionProps = {
  readOnly?: boolean;
  multipleSelection?: boolean;
  rowIndex: number;
  column: WebformBuilderMatrixColumn;
  columnParent?: WebformBuilderMatrixColumn;
  row: WebformBuilderMatrixRow;
  value?: ColumnOptionValue;
  onChange?: (value: Record<string, unknown>) => void;
};
export const ColumnOption = ({
  readOnly,
  multipleSelection,
  column,
  columnParent,
  rowIndex,
  value = {},
  onChange,
}: ColumnOptionProps) => {
  const options = _.get(column, 'options', []);

  rowIndex -= 1;

  const key = _.get(column, 'key', undefined) as string;

  const onOptionChange = useCallback(
    (optionValue: unknown, index: number) => {
      if (columnParent?.key) {
        const optionValues = _.get(
          value,
          [columnParent.key, 'optionValues', column.key],
          []
        ) as unknown[];
        optionValues[index] = optionValue;
        onChange?.({
          ...value,
          [columnParent.key]: {
            ..._.get(value, columnParent.key, {}),
            optionValues: {
              ..._.get(
                value,
                [columnParent.key, 'optionValues'],
                {}
              ),
              [column.key]: optionValues,
            },
          },
        });
        return null;
      }
      const optionValues = _.get(
        value,
        ['optionValues', column.key],
        []
      ) as unknown[];

      optionValues[index] = optionValue;
      onChange?.({
        ...value,
        optionValues: {
          ..._.get(value, 'optionValues', {}),
          [column.key]: optionValues,
        },
      });
    },
    [value, columnParent, column, onChange]
  );

  const OptionWidget = ({
    option,
    index,
  }: {
    option: WebformBuilderMatrixRowColumnOption;
    index: number;
  }) => {
    const optionValue = columnParent?.key
      ? _.get(value, [
          columnParent.key,
          'optionValues',
          column.key,
          index,
        ])
      : _.get(value, ['optionValues', column.key, index]);

    if (_.get(option, 'type') === 'attachment') {
      return (
        <UploadButton
          module="portal-assessment-automation"
          group="portal-attachment"
          label={option.uploadButtonText}
          disabled={disabled || readOnly}
          value={optionValue}
          onChange={(value) =>
            onOptionChange(value, index)
          }
        />
      );
    }
    if (_.get(option, 'type') === 'input') {
      return (
        <Flex align="center" justify="space-between">
          <span
            className="text-left"
            style={{
              color: disabled ? '#bfbfbf' : '',
            }}
          >
            {option?.label}
          </span>
          <Input
            disabled={disabled || readOnly}
            className="w-50 text-gray"
            size="small"
            defaultValue={optionValue}
            onChange={(e) =>
              onOptionChange(e.target.value, index)
            }
          />
        </Flex>
      );
    }
    if (_.get(option, 'type') === 'checkbox') {
      const checked = optionValue === true;
      return (
        <Checkbox
          disabled={disabled || readOnly}
          checked={checked}
          onChange={() => onOptionChange(!checked, index)}
        >
          {option?.label}
        </Checkbox>
      );
    }
    return null;
  };

  const OptionWidgetMemo = React.memo(OptionWidget);

  if (!key) return null;

  const checked = columnParent?.key
    ? _.get(value, [columnParent.key, 'checked'])
    : _.get(value, 'checked', undefined);

  const selected = columnParent?.key
    ? _.get(value, [columnParent.key, 'selected'])
    : _.get(value, 'selected', undefined);

  const disabled = multipleSelection
    ? columnParent?.key
      ? !_.includes(
          _.get(value, [columnParent.key, 'checked'], []),
          column.key
        )
      : !_.includes(value.checked ?? [], column.key)
    : columnParent?.key
    ? _.get(value, [columnParent.key, 'selected']) !==
      column.key
    : value.selected !== column.key;

  const onRadioChange = () => {
    if (columnParent?.key) {
      onChange?.({
        ...value,
        [columnParent.key]: {
          ..._.get(value, columnParent.key, {}),
          checked: undefined,
          selected: _.get(column, 'key'),
        },
      });
      return null;
    }
    onChange?.({
      ...value,
      checked: undefined,
      selected: _.get(column, 'key'),
    });
  };

  const onCheckboxChange = () => {
    if (columnParent?.key) {
      onChange?.({
        ...value,
        [columnParent.key]: {
          ..._.get(value, columnParent.key, {}),
          selected: undefined,
          checked: _.xor(
            _.get(
              value,
              [columnParent.key, 'checked'],
              []
            ),
            [column.key]
          ),
        },
      });
      return null;
    }
    onChange?.({
      ...value,
      selected: undefined,
      checked: _.xor(value.checked ?? [], [column.key]),
    });
  };

  return (
    <Flex
      align="center"
      justify={options.length === 0 ? 'center' : 'start'}
      direction="column"
      className="pl-1 pr-1"
    >
      <Flex
        align="center"
        justify={
          options.length === 0 ? 'center' : 'start'
        }
        className="w-100"
      >
        {multipleSelection ? (
          <Checkbox
            disabled={readOnly}
            checked={_.includes(checked, key)}
            onChange={onCheckboxChange}
          />
        ) : (
          <Radio
            disabled={readOnly}
            checked={selected === key}
            onChange={onRadioChange}
          />
        )}
        {options?.[0] && (
          <OptionWidgetMemo
            option={options[0]}
            index={0}
          />
        )}
      </Flex>
      <>
        {_.filter(
          options,
          (option, index) =>
            index > 0 &&
            (!_.get(option, 'showOnRows') ||
              _.includes(
                _.get(option, 'showOnRows', []),
                rowIndex
              ))
        ).map((option, index) => (
          <Flex
            align="center"
            justify="start"
            key={index}
            className="w-100 mt-1"
          >
            <OptionWidgetMemo
              option={option}
              index={index + 1}
            />
          </Flex>
        ))}
      </>
    </Flex>
  );
};

export const ColumnOptionMemo = React.memo(ColumnOption);
