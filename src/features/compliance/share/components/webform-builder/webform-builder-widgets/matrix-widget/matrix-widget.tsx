import { PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { Button, Table } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import { useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line import/no-cycle
import { useAssessmentAutomationStore } from '../../../../../share';
import {
  WebformBuilderItem,
  WebformBuilderMatrixColumn,
  WebformBuilderMatrixRow,
} from '../../../../types/webform-builder';
import { WidgetBodyWrapper } from '../widget-body-wrapper';
import { WidgetFooter } from '../widget-footer';
import { WidgetHeader } from '../widget-header';

import { ColumnOptionMemo } from './column-option';
import { RowOption } from './row-option';

type MatrixWidgetValue = Record<string, unknown>;

export const MatrixWidget = ({
  value: initialValue,
  title,
  description,
  columns = [],
  rows,
  multipleSelection,
  headerTitle,
  addOption,
  readOnly,
}: WebformBuilderItem) => {
  const [matrixValue, setMatrixValue] =
    useSetState<MatrixWidgetValue>({});

  const { onChangeFormItem } =
    useAssessmentAutomationStore();

  const onChangeMatrixValue = (
    rowKey: string,
    value: Record<string, unknown>
  ) =>
    setMatrixValue({
      ...matrixValue,
      [rowKey]: value,
    });

  const onAddRow = () => {
    const newRows = [
      ...(rows ?? []),
      {
        key: uuidv4(),
        options: [
          {
            type: 'input',
            placeholder: 'โปรดระบุ',
          },
        ],
      },
    ];

    onChangeFormItem({
      rows: newRows,
    });
  };

  const column: ColumnType<WebformBuilderMatrixRow> = {
    width: 500,
    title: (
      <Flex
        align="center"
        justify="center"
        className="font-weight-bold"
      >
        {headerTitle}
      </Flex>
    ),
    render: (row, record, rowIndex) => {
      return (
        <RowOption
          readOnly={readOnly}
          rowIndex={rowIndex}
          row={row}
          value={
            matrixValue?.[row.key] as Record<
              string,
              unknown
            >
          }
          onChange={(value) =>
            onChangeMatrixValue(row.key, value)
          }
        />
      );
    },
  };

  const getMatrixColumns = (
    columns: WebformBuilderMatrixColumn[],
    parent?: WebformBuilderMatrixColumn
  ): Array<ColumnType<WebformBuilderMatrixColumn>> =>
    columns?.map((column, columnIndex) => ({
      title: (
        <Flex
          align="center"
          justify="center"
          className="font-weight-bold"
        >
          {column?.title}
        </Flex>
      ),
      key: columnIndex,
      width: 175,
      align: 'center',
      render: (row, record, rowIndex) => {
        return (
          <ColumnOptionMemo
            readOnly={readOnly}
            multipleSelection={
              parent?.type === 'checkbox' ??
              multipleSelection
            }
            rowIndex={rowIndex}
            column={column}
            columnParent={parent}
            row={row}
            value={
              (matrixValue?.[row.key] as Record<
                string,
                unknown
              >) ?? {}
            }
            onChange={(value) =>
              onChangeMatrixValue(row.key, value)
            }
          />
        );
      },
      children: getMatrixColumns(
        column?.children ?? [],
        column
      ),
    }));

  const matrixColumns = getMatrixColumns(columns);

  useEffect(() => {
    const antTableRows = document.querySelectorAll(
      '.ant-table-row'
    );
    antTableRows.forEach((row, index) => {
      const rowData = rows?.[index];
      row.classList.remove('matrix-row-title');
      if (rowData?.isTitle) {
        row.classList.add('matrix-row-title');
        if (rowData?.options?.length ?? 0 > 0) {
          row.classList.add('matrix-row-title-bg-white');
        }
        const countTd = row.querySelectorAll('td').length;
        if (countTd === 1) {
          return;
        }
        const tdInRow = row.querySelectorAll('td');
        tdInRow?.[0]?.setAttribute(
          'colspan',
          `${countTd}`
        );
        tdInRow.forEach((td, index) => {
          if (index > 0) {
            td.remove();
          }
        });
      }
    });
  }, [columns, rows]);

  const checkColumnHasChildren = (
    columns: WebformBuilderMatrixColumn[]
  ): boolean => {
    let hasChildren = false;
    columns?.forEach((column) => {
      if (column?.children?.length) {
        hasChildren = true;
      }
    });
    return hasChildren;
  };

  const onValidateMatrix = () => {
    return new Promise<Record<string, unknown>>(
      (resolve) => {
        resolve(matrixValue);
      }
    );
  };

  useEffect(() => {
    if (initialValue) {
      setMatrixValue(initialValue);
    }
  }, [initialValue, setMatrixValue]);

  return (
    <>
      <WidgetHeader
        title={title}
        description={description}
      />
      <Scrollbars
        style={{
          height: 'calc(100vh - 380px)',
        }}
        autoHide
      >
        <WidgetBodyWrapper readOnly={readOnly}>
          <Table
            className={css`
              margin-right: 12px;

              table {
                border-collapse: ${checkColumnHasChildren(
                  columns
                )
                  ? 'collapse'
                  : 'separate'};
                border-spacing: 0 10px;
                width: 100%;

                .ant-table-cell::before {
                  background: none !important;
                }
              }

              .ant-table-thead > tr > th {
                background-color: #fafafb !important;
                border: 1px solid #e6ebf1;
                font-weight: lighter;

                :first-child {
                  border-top-left-radius: 5px;
                  border-bottom-left-radius: 5px;
                }

                :last-child {
                  border-top-right-radius: 5px;
                  border-bottom-right-radius: 5px;
                }

                :not(:first-child) {
                  border-left: none;
                }
              }

              .matrix-row-title {
                background-color: #fafafb !important;
              }

              .matrix-row-title-bg-white {
                background-color: #fff !important;
              }

              .ant-table-tbody > tr > td {
                border-top: 1px solid #e6ebf1;
                border-bottom: 1px solid #e6ebf1;
                border-left: 1px solid #e6ebf1;
                vertical-align: top;

                div {
                  overflow: hidden;
                }

                :first-child {
                  border-left: 1px solid #e6ebf1;
                  border-top-left-radius: 5px;
                  border-bottom-left-radius: 5px;
                }

                :last-child {
                  border-right: 1px solid #e6ebf1;
                  border-top-right-radius: 5px;
                  border-bottom-right-radius: 5px;
                }
              }
            `}
            dataSource={rows}
            columns={[column, ...(matrixColumns ?? [])]}
            scroll={{ x: 'scroll' }}
            pagination={false}
            tableLayout="fixed"
            rowKey={(row) => row.title}
          />
          {addOption && (
            <Button
              disabled={readOnly}
              icon={<PlusOutlined />}
              type="link"
              className="p-0"
              onClick={onAddRow}
            >
              เพิ่มคำตอบ
            </Button>
          )}
        </WidgetBodyWrapper>
      </Scrollbars>
      <WidgetFooter
        readonly={readOnly}
        onValidate={onValidateMatrix}
      />
    </>
  );
};
