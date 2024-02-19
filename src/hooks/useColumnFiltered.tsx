import { SettingOutlined } from '@ant-design/icons';
import { useToggle } from '@mantine/hooks';
import { Button, Modal, Transfer } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TransferItem } from 'antd/es/transfer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { IntlMessage } from '@utilComponents/intl-message';

export const ColumnTransfer = <
  T extends Record<string, unknown>
>(props: {
  columns: ColumnsType<T>;
  targetKeys?: string[];
  onChange: (nextTargetKeys: string[]) => void;
  disabled?: boolean;
  disabledKeys?: string[];
}) => {
  const {
    columns,
    targetKeys = [],
    onChange,
    disabled,
    disabledKeys,
  } = props;

  const [openModal, toggleModal] = useToggle();
  const [targetKeysState, setTargetKeysState] =
    useState<string[]>(targetKeys);

  const dataSource: TransferItem[] =
    columns
      ?.filter((column) => column.title !== undefined)
      ?.map(
        (column): TransferItem => ({
          key: column.key as string,
          title:
            (column.title as string) ??
            (column.key as string),
          disabled: disabledKeys?.includes(
            column.key as string
          ),
        })
      ) ?? [];

  useEffect(() => {
    const revertTargetKeys =
      columns
        ?.filter((column) =>
          targetKeys.includes(column.key as string)
        )
        ?.map((column) => column.key as string) ?? [];
    setTargetKeysState(revertTargetKeys);
  }, [columns, targetKeys]);

  return (
    <>
      <Button onClick={() => toggleModal()}>
        <SettingOutlined />
      </Button>
      <Modal
        title={<IntlMessage id="selectHeader" />}
        open={openModal}
        onCancel={() => {
          onChange(targetKeys);
          toggleModal();
        }}
        onOk={() => {
          onChange(targetKeysState);
          toggleModal();
        }}
        centered
        width="auto"
      >
        <Transfer
          titles={[
            <IntlMessage key="hide" id="hide" />,
            <IntlMessage key="show" id="show" />,
          ]}
          dataSource={dataSource}
          targetKeys={targetKeysState ?? []}
          onChange={(nextTargetKeys: string[]) =>
            setTargetKeysState(nextTargetKeys)
          }
          render={(item) => item.title as string}
          disabled={disabled}
        />
      </Modal>
    </>
  );
};

export type UseColumnFiltered<T> = {
  id?: string;
  columns: ColumnsType<T>;
  disabled?: boolean;
  disabledKeys?: string[];
  loading?: boolean;
};

export const useColumnFiltered = <
  T extends Record<string, unknown>
>({
  id = 'default',
  columns,
  disabled,
  disabledKeys = ['name'],
  loading,
}: UseColumnFiltered<T>) => {
  const [
    filteredColumnsTarget,
    setFilteredColumnsTarget,
  ] = useState<ColumnsType<T> | null>(null);

  const router = useRouter();

  const targetKeys = filteredColumnsTarget?.map(
    (column) => column.key as string
  );

  const savedTargetKeysToLocalStorage = (
    nextTargetKeys: string[]
  ) => {
    localStorage.setItem(
      `columns-${router.pathname}-${id}`,
      JSON.stringify(nextTargetKeys)
    );
  };

  const onColumnFilteredChange = (
    nextTargetKeys: string[]
  ) => {
    savedTargetKeysToLocalStorage(nextTargetKeys);
    setFilteredColumnsTarget(
      columns.filter((column) =>
        nextTargetKeys.includes(column.key as string)
      )
    );
  };

  const filteredColumnsKeys =
    filteredColumnsTarget?.map(
      (column) => column.key as string
    ) ?? [];

  useEffect(() => {
    if (!filteredColumnsTarget && !loading) {
      const loadedTargetKeysFromLocalStorage = () => {
        const localStorageTargetKeys =
          localStorage.getItem(
            `columns-${router.pathname}-${id}`
          );
        if (localStorageTargetKeys) {
          return JSON.parse(localStorageTargetKeys);
        }
        return targetKeys;
      };

      const localStorageTargetKeys =
        loadedTargetKeysFromLocalStorage();

      try {
        setFilteredColumnsTarget(
          columns.filter((column) =>
            localStorageTargetKeys.includes(
              column.key as string
            )
          )
        );
      } catch (error) {
        setFilteredColumnsTarget(columns);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    columns,
    filteredColumnsTarget,
    id,
    router,
    targetKeys,
  ]);

  const filteredColumns = columns.filter(
    (column) =>
      filteredColumnsKeys.includes(
        column.key as string
      ) && filteredColumnsKeys.length > 0
  );

  return {
    filteredColumnsKeys,
    filteredColumns: filteredColumns ?? columns,
    xScroll: (filteredColumns ?? columns)?.reduce(
      (acc, column) =>
        acc + parseInt(`${column.width ?? 0}`),
      0
    ),
    ColumnTransfer: (
      <ColumnTransfer
        columns={columns}
        targetKeys={targetKeys}
        onChange={onColumnFilteredChange}
        disabled={disabled}
        disabledKeys={disabledKeys}
      />
    ),
  };
};
