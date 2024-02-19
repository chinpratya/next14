import { PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { useSetState } from 'ahooks';
import { Button } from 'antd';
import _ from 'lodash';
import { ReactElement, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  useAssessmentAutomationStore,
  WebformBuilderItem,
  WebformBuilderMatrixColumn,
  WebformBuilderMatrixRow,
  WebformBuilderMatrixRowVisibility,
  WebformBuilderMatrixValue,
} from '@/features/compliance';

import { WidgetFooter } from '../widget-footer';
import { WidgetHeader } from '../widget-header';

import { TableBody } from './table-body';
import { TableHeader } from './table-header';

const getColumnChildren = (
  columns?: WebformBuilderMatrixColumn[]
) => {
  const children: WebformBuilderMatrixColumn[] = [];
  columns?.forEach((column) => {
    if (column.children) {
      children.push(...column.children);
    }
  });

  return children;
};

const renderTableHeader = (
  columns?: WebformBuilderMatrixColumn[],
  headerTitle?: string
): ReactElement => {
  const children = getColumnChildren(columns);
  return (
    <>
      <tr>
        {headerTitle !== undefined && (
          <TableHeader
            title={headerTitle}
            rowSpan={children.length + 1}
          />
        )}
        {columns?.map((column) => (
          <TableHeader
            title={column.title}
            colSpan={
              column.children ? column.children.length : 1
            }
            key={column.key}
          />
        ))}
      </tr>
      {children.length > 0 && renderTableHeader(children)}
    </>
  );
};

const renderTableBody = (
  rows?: WebformBuilderMatrixRow[],
  columns?: WebformBuilderMatrixColumn[],
  multipleSelect?: boolean,
  value?: WebformBuilderMatrixValue,
  onChange?: (value: WebformBuilderMatrixValue) => void,
  onRemoveRow?: (rowIndex: string) => void,
  readOnly?: boolean
): ReactElement => {
  const children = getColumnChildren(columns);
  const columnLength =
    children.length > 0
      ? children.length
      : columns?.length ?? 0;

  const checkMultipleSelect = (
    column?: WebformBuilderMatrixColumn
  ) => {
    const parent = columns?.find((item) =>
      _.find(item.children, { key: column?.key })
    );
    if (parent?.type) {
      return parent?.type === 'checkbox';
    }
    return multipleSelect ?? false;
  };

  const findParent = (
    column?: WebformBuilderMatrixColumn
  ) => {
    return columns?.find((item) =>
      _.find(item.children, { key: column?.key })
    );
  };

  return (
    <>
      {rows?.map((row, rowIndex) => (
        <>
          <tr key={row.key}>
            <TableBody
              id={row.key}
              isTitle={true}
              colSpan={row.isTitle ? columnLength + 1 : 1}
              rowData={row}
              rowIndex={rowIndex}
              value={value}
              onChange={onChange}
              onRemoveRow={onRemoveRow}
              readOnly={readOnly}
            />
            {!row.isTitle &&
              children.length === 0 &&
              columns?.map((column) => (
                <TableBody
                  id={row.key}
                  key={column.key}
                  rowData={row}
                  columnData={column}
                  rowIndex={rowIndex}
                  multipleSelect={checkMultipleSelect(
                    column
                  )}
                  value={value}
                  onChange={onChange}
                  readOnly={readOnly}
                />
              ))}
            {!row.isTitle &&
              children?.map((column) => {
                const parent = findParent(column);

                if (!parent) {
                  return null;
                }

                return (
                  <TableBody
                    id={`${row.key}%${parent?.key}`}
                    key={column.key}
                    visibility={parent?.visibility}
                    rowData={row}
                    columnData={column}
                    rowIndex={rowIndex}
                    multipleSelect={checkMultipleSelect(
                      column
                    )}
                    value={value}
                    onChange={onChange}
                    readOnly={readOnly}
                  />
                );
              })}
          </tr>
        </>
      ))}
    </>
  );
};

export const MatrixWidget = (
  props: WebformBuilderItem
) => {
  const {
    headerTitle,
    rows,
    columns,
    multipleSelection,
    addOption,
    value: initialValue,
    readOnly,
    maxOption,
  } = props;
  console.log('props', props);

  const [matrixValues, setMatrixValues] =
    useSetState<WebformBuilderMatrixValue>({
      selected: {},
      rows: {},
      columns: {},
    });
  const optionleght = _.filter(
    rows,
    (v) => v.title === 'อื่นๆ'
  ).length;
  const { onChangeFormItem } =
    useAssessmentAutomationStore();

  const onChangeMatrixValue = (
    value: WebformBuilderMatrixValue
  ) => {
    setMatrixValues(value);
  };

  const onAddRow = () =>
    onChangeFormItem({
      rows: [
        ...(rows ?? []),
        {
          key: uuidv4(),
          title: 'อื่นๆ',
          options: [
            {
              additional: true,
              type: 'input',
              placeholder: 'โปรดระบุ',
            },
          ],
        },
      ],
    });

  const onRemoveRow = (key: string) => {
    const newRows = rows?.filter(
      (row) => row.key !== key
    );
    onChangeFormItem({
      rows: newRows,
    });
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

  const onValidateMatrix = () => {
    return new Promise<Record<string, unknown>>(
      (resolve, reject) => {
        const columnHeader = _.filter(
          columns,
          (column) =>
            _.get(column, 'children', []).length > 0
        );

        rows?.forEach((row, rowIndex) => {
          row.options?.forEach((option, optionIndex) => {
            const optionValue = _.get(
              matrixValues,
              `rows.${row.key}%${optionIndex}`
            );

            if (!optionValue) {
              reject(
                `กรุณาเลือกคำตอบในแถว \n ${row.title}`
              );
            }

            option?.options?.forEach(
              (childOption, childOptionIndex) => {
                if (
                  childOption?.label === optionValue &&
                  _.get(childOption, 'isMore', false)
                ) {
                  const childOptionValue = _.get(
                    matrixValues,
                    `rows.${row.key}%${optionIndex}%${childOptionIndex}`
                  );
                  if (!childOptionValue) {
                    reject(
                      `กรุณาเลือกคำตอบในแถว \n ${row.title}`
                    );
                  }
                  return;
                }
              }
            );
          });

          if (row.isTitle) {
            return;
          }

          if (columnHeader.length > 0) {
            columnHeader.forEach((column) => {
              const columnValue = _.get(
                matrixValues,
                `selected.${row.key}%${column.key}`
              );

              const isVisible = checkVisibility(
                row,
                matrixValues,
                column?.visibility
              );

              if (!isVisible) {
                return;
              }

              if (!columnValue) {
                reject(
                  `กรุณาเลือกคำตอบในแถว \n ${row.title}`
                );
              }

              column?.children?.forEach((childColumn) => {
                if (childColumn.key === columnValue) {
                  childColumn?.options?.forEach(
                    (childOption, childOptionIndex) => {
                      const childOptionValue = _.get(
                        matrixValues,
                        `columns.${row.key}%${childColumn.key}%${childOptionIndex}`
                      );
                      if (!childOptionValue) {
                        reject(
                          `กรุณาเลือกคำตอบในแถว \n ${row.title}`
                        );
                      }
                    }
                  );
                }
              });
            });
            return;
          }

          const rowValues = _.get(
            matrixValues,
            `selected.${row.key}`
          );

          if (!rowValues) {
            reject(
              `กรุณาเลือกคำตอบในแถว \n ${row.title}`
            );
          }

          if (rowValues) {
            const columnData = _.find(columns, {
              key: rowValues,
            }) as WebformBuilderMatrixColumn;
            if (!columnData) {
              return;
            }
            _.get(columnData, 'options', []).forEach(
              (column, index) => {
                if (
                  column?.showOnRows &&
                  !column?.showOnRows.includes(rowIndex)
                ) {
                  return;
                }

                const value = _.get(
                  matrixValues,
                  `columns.${row.key}%${columnData?.key}%${index}`
                );

                if (
                  !value &&
                  column.type !== 'checkbox'
                ) {
                  reject(
                    `กรุณากรอกคำตอบในแถว \n ${row.title} \n คอลัมน์ ${columnData.title}`
                  );
                }
              }
            );
          }
        });
        resolve(matrixValues);
      }
    );
  };

  useEffect(() => {
    if (initialValue) {
      setMatrixValues(
        initialValue as WebformBuilderMatrixValue
      );
    }
  }, [initialValue, setMatrixValues]);

  return (
    <>
      <WidgetHeader {...props} />
      <div
        style={{
          overflowX: 'auto',
          paddingTop: 24,
        }}
      >
        <table
          className={css`
            width: 100%;
            border-collapse: unset;
            border-spacing: 0;

            .matrix__title {
              background-color: #fafafb !important;
            }

            th,
            td {
              border: 1px solid #e6ebf1;
              padding: 12px;
              min-width: 150px;

              :first-child {
                min-width: 300px !important;
              }

              :not(:first-child) {
                border-left: none;
              }
            }

            thead > tr {
              th {
                background-color: #fafafb;
              }

              :first-child > th {
                :first-child {
                  border-top-left-radius: 6px;
                }

                :last-child {
                  border-top-right-radius: 6px;
                }
              }

              :not(:first-child) > th {
                border-left: none;
                border-top: none;
              }
            }

            tbody > tr > td {
              border-top: none;
            }

            tbody > tr:last-child > td {
              :first-child {
                border-bottom-left-radius: 6px;
              }

              :last-child {
                border-bottom-right-radius: 6px;
              }
            }
          `}
        >
          <thead>
            {renderTableHeader(
              columns,
              headerTitle ?? ''
            )}
          </thead>
          <tbody>
            {renderTableBody(
              rows,
              columns,
              multipleSelection,
              matrixValues,
              onChangeMatrixValue,
              onRemoveRow,
              readOnly
            )}
          </tbody>
        </table>
      </div>
      {addOption && (
        <Button
          icon={<PlusOutlined />}
          type="link"
          className="p-0"
          onClick={onAddRow}
          disabled={
            maxOption ? optionleght === maxOption : false
          }
        >
          เพิ่มคำตอบ
        </Button>
      )}
      <WidgetFooter
        {...props}
        onValidate={onValidateMatrix}
      />
    </>
  );
};
