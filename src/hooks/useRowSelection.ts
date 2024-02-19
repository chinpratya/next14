import React, { useState, useEffect } from 'react';

export type UseRowSelection = {
  type?: 'checkbox' | 'radio';
  disabledRowKeys?: string[];
  disabledKey?: string;
  preserveSelectedRowKeys?: boolean;
  selectedRowKeys?: string[];
  onSelect?: (selectedRowKeys: string[]) => void;
};

export type RowSelection = {
  type: 'checkbox' | 'radio';
  selectedRowKeys: string[];
  onChange: (selectedRowKeys: React.Key[]) => void;
  getCheckboxProps: (record: any) => {
    disabled: boolean;
    name: string;
  };
  preserveSelectedRowKeys: boolean;
  onSelectAll: (
    selected: boolean,
    selectedRows: any[]
  ) => void;
  onSelectNone: () => void;
};

export const useRowSelection = ({
  type = 'checkbox',
  disabledRowKeys = [],
  disabledKey = 'ObjectUUID',
  preserveSelectedRowKeys = true,
  selectedRowKeys = [],
  onSelect,
}: UseRowSelection = {}) => {
  const [selectedRowKeysState, setSelectedRowKeys] =
    useState<string[]>([]);

  useEffect(() => {
    if (selectedRowKeys.length > 0) {
      setSelectedRowKeys(selectedRowKeys);
    }
  }, [selectedRowKeys]);

  const rowSelection: RowSelection = {
    type,
    selectedRowKeys: selectedRowKeysState,
    onChange: (selectedRowKeys: React.Key[]) => {
      onSelect?.(selectedRowKeys as string[]);
      setSelectedRowKeys(selectedRowKeys as string[]);
    },
    getCheckboxProps: (record: any) => ({
      disabled: disabledRowKeys?.includes(
        record[disabledKey] as string
      ),
      name: record.name,
    }),
    preserveSelectedRowKeys,
    onSelectAll: (_, selectedRows) => {
      onSelect?.(selectedRows);
      setSelectedRowKeys(selectedRows);
    },
    onSelectNone: () => {
      onSelect?.([]);
      setSelectedRowKeys([]);
    },
  };

  return {
    setSelectedRowKeys,
    rowSelection,
    resetSelectedRowKeys: () => setSelectedRowKeys([]),
  };
};
