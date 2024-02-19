import { DeleteOutlined } from '@ant-design/icons';
import { Flex } from '@mantine/core';
import {
  Checkbox,
  Input,
  InputNumber,
  Radio,
  Typography,
} from 'antd';
import { produce } from 'immer';
import _ from 'lodash';

import {
  WebformBuilderMatrixRow,
  WebformBuilderMatrixColumn,
  WebformBuilderMatrixValue,
  WebformBuilderMatrixRowVisibility,
} from '@/features/compliance';
import { UploadButton } from '@/features/shared';

export type TableBodyProps = {
  id: string;
  rowData: WebformBuilderMatrixRow;
  columnData?: WebformBuilderMatrixColumn;
  rowIndex: number;
  isTitle?: boolean;
  colSpan?: number;
  rowSpan?: number;
  multipleSelect?: boolean;
  value?: WebformBuilderMatrixValue;
  onChange?: (value: WebformBuilderMatrixValue) => void;
  onRemoveRow?: (rowIndex: string) => void;
  visibility?: WebformBuilderMatrixRowVisibility[];
  readOnly?: boolean;
};

export const TableBodyTitle = ({
  colSpan = 1,
  rowSpan = 1,
  rowData,
  value,
  onChange,
  onRemoveRow,
  readOnly,
}: TableBodyProps) => {
  const onRowChange = (
    optionIndex: number,
    value: unknown
  ) => {
    onChange?.(
      produce((draft) => {
        draft.rows[`${rowData?.key}%${optionIndex}`] =
          value;
      }) as WebformBuilderMatrixValue
    );
  };

  const onRowOptionChange = (
    rowIndex: number,
    optionIndex: number,
    value: unknown
  ) => {
    onChange?.(
      produce((draft) => {
        draft.rows[
          `${rowData?.key}%${rowIndex}%${optionIndex}`
        ] = value;
      }) as WebformBuilderMatrixValue
    );
  };

  const rowsValue = _.get(value, 'rows', {});

  return (
    <td
      className={
        colSpan > 1 && !rowData.options
          ? 'matrix__title'
          : ''
      }
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      <Typography.Text className="d-block">
        {rowData?.title}
      </Typography.Text>
      {rowData?.options?.map((option, rowIndex) => {
        const path = `${rowData.key}%${rowIndex}`;
        if (option.type === 'input') {
          return (
            <Flex
              key={rowIndex}
              align="center"
              justify="space-between"
            >
              <Input
                readOnly={readOnly}
                placeholder={option?.placeholder}
                size="small"
                className="w-100 mt-1"
                value={_.get(rowsValue, path, '')}
                onChange={(event) =>
                  onRowChange(
                    rowIndex,
                    event.target.value
                  )
                }
              />
              {option?.additional && (
                <DeleteOutlined
                  className="ml-1"
                  hidden={readOnly}
                  onClick={() => {
                    onRemoveRow?.(rowData?.key);
                  }}
                />
              )}
            </Flex>
          );
        }
        if (option.type === 'radio') {
          return (
            <Radio.Group
              disabled={readOnly}
              key={rowIndex}
              value={_.get(rowsValue, path, '')}
              onChange={(event) =>
                onRowChange(rowIndex, event.target.value)
              }
            >
              {option?.options?.map((option, index) => {
                const disabledOption =
                  _.get(rowsValue, path, '') !==
                  option?.label;
                const optionPath = `${rowData.key}%${rowIndex}%${index}`;
                return (
                  <Flex key={index}>
                    <Radio
                      key={index}
                      value={option?.label}
                    >
                      <>
                        {option?.label as string}
                        {option?.isMore &&
                          option?.type ===
                            'attachment' && (
                            <UploadButton
                              module="portal-assessment-automation"
                              group="portal-attachment"
                              label={
                                option?.uploadButtonText as string
                              }
                              value={_.get(
                                rowsValue,
                                optionPath,
                                ''
                              )}
                              disabled={
                                disabledOption || readOnly
                              }
                              onChange={(value) =>
                                onRowOptionChange(
                                  rowIndex,
                                  index,
                                  value
                                )
                              }
                              required
                            />
                          )}
                      </>
                    </Radio>
                  </Flex>
                );
              })}
            </Radio.Group>
          );
        }
        return null;
      })}
    </td>
  );
};

export type TableBodyDetailProps = TableBodyProps & {
  columnData: WebformBuilderMatrixColumn;
};

const TableBodyDetail = ({
  id,
  rowIndex,
  colSpan = 1,
  rowSpan = 1,
  columnData,
  rowData,
  multipleSelect,
  value,
  onChange,
  visible,
  readOnly,
}: TableBodyDetailProps & {
  visible: boolean;
}) => {
  const columnOptionLength =
    columnData?.options?.length || 0;

  const currentValue = multipleSelect
    ? (_.get(value, `selected.${id}`, []) as string[])
    : (_.get(value, `selected.${id}`, '') as string);

  const onCheckboxChange = () => {
    onChange?.(
      produce((draft) => {
        draft.selected[id] = _.xor(currentValue, [
          columnData?.key,
        ]);
      }) as WebformBuilderMatrixValue
    );
  };
  const onRadioChange = () => {
    onChange?.(
      produce((draft) => {
        draft.selected[id] = columnData?.key;
      }) as WebformBuilderMatrixValue
    );
  };

  const onOptionChange = (
    optionIndex: number,
    value: unknown
  ) => {
    onChange?.(
      produce((draft) => {
        draft.columns[
          `${rowData?.key}%${columnData?.key}%${optionIndex}`
        ] = value;
      }) as WebformBuilderMatrixValue
    );
  };

  const disabledOptions =
    currentValue !== columnData?.key &&
    !_.includes(currentValue, columnData?.key);

  const columnsValues = _.get(
    value,
    'columns',
    {}
  ) as Record<string, unknown>;

  return (
    <td
      colSpan={colSpan}
      rowSpan={rowSpan}
      align={columnOptionLength === 0 ? 'center' : 'left'}
    >
      {multipleSelect ? (
        <Checkbox
          disabled={!visible || readOnly}
          checked={currentValue?.includes(
            _.get(columnData, 'key', '')
          )}
          onChange={onCheckboxChange}
        />
      ) : (
        <Radio
          disabled={!visible || readOnly}
          checked={currentValue === columnData?.key}
          onChange={onRadioChange}
        />
      )}
      {columnData?.options
        ?.filter(
          (option) =>
            option.showOnRows?.includes(rowIndex) ||
            !option.showOnRows
        )
        ?.map((option, index) => {
          const path = `${rowData?.key}%${columnData?.key}%${index}`;
          if (option.type === 'attachment') {
            return (
              <UploadButton
                key={index}
                module="portal-assessment-automation"
                group="portal-attachment"
                label={option.uploadButtonText}
                required={option.required}
                disabled={disabledOptions || readOnly}
                value={columnsValues[path] as string}
                onChange={(value) =>
                  onOptionChange(index, value)
                }
              />
            );
          }
          if (option.type === 'checkbox') {
            return (
              <Checkbox
                key={index}
                disabled={disabledOptions || readOnly}
                checked={columnsValues[path] as boolean}
                onChange={(e) =>
                  onOptionChange(index, e.target.checked)
                }
              >
                <span className="text-danger">*</span>
                {option?.label}
              </Checkbox>
            );
          }
          if (option.type === 'number') {
            return (
              <Flex
                key={index}
                align="center"
                justify="space-between"
              >
                <span className="text-danger">*</span>
                <span
                  className="text-left mr-1"
                  style={{
                    whiteSpace: 'nowrap',
                    color: disabledOptions ? '#ccc' : '',
                  }}
                >
                  {option?.label}
                </span>
                <InputNumber
                  readOnly={readOnly}
                  min={0}
                  max={100}
                  className="w-100 text-gray"
                  size="small"
                  disabled={disabledOptions}
                  value={columnsValues[path] as number}
                  onChange={(value) =>
                    onOptionChange(index, value)
                  }
                />
              </Flex>
            );
          }
          return null;
        })}
    </td>
  );
};

const checkVisibility = (
  rawData: WebformBuilderMatrixRow,
  value?: WebformBuilderMatrixValue,
  visibility?: WebformBuilderMatrixRowVisibility[]
): boolean => {
  if (!visibility) return true;
  if (!value) return false;

  const visible = [] as boolean[];

  visibility.forEach(
    ({ condition, target, value: conditionValue }) => {
      const targetValue = _.get(
        value,
        `selected.${rawData.key}%${target}`,
        ''
      );

      if (condition === 'equal') {
        visible.push(targetValue === conditionValue);
      }
      if (condition === 'not-equal') {
        visible.push(targetValue !== conditionValue);
      }
    }
  );

  return visible.some((v) => v);
};

export const TableBody = (props: TableBodyProps) => {
  const {
    isTitle,
    colSpan = 1,
    rowSpan = 1,
    columnData,
    rowData,
    value,
    visibility,
  } = props;

  if (isTitle) {
    return <TableBodyTitle {...props} />;
  }

  if (columnData) {
    const visible = checkVisibility(
      rowData,
      value,
      visibility
    );

    return (
      <TableBodyDetail
        {...props}
        visible={visible}
        columnData={columnData}
      />
    );
  }

  return <td colSpan={colSpan} rowSpan={rowSpan}></td>;
};
