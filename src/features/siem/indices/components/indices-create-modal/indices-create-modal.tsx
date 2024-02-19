import { useSetState, useToggle } from '@mantine/hooks';
import { Form } from 'antd';
import { t } from 'i18next';
import { useEffect } from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useNotifications } from '@/stores/notifications';
import { bytesToUnit } from '@/utils';
import { Modal } from '@components/modal';

import {
  getIndicesStorageSize,
  useGetIndicesStorageSize,
} from '../../../../log-management/indices';
import { useCreateIndice } from '../../api/create-indice';

import { IndicesCreateForm } from './indices-create-form';

export type IndicesCreateModalProps = {
  open: boolean;
  onClose: () => void;
};

//Minimum storage size unit bytes
const MINIMUM_SIZE = 536870912.23;

export const IndicesCreateModal = ({
  open,
  onClose,
}: IndicesCreateModalProps) => {
  const [form] = Form.useForm();
  const [loading, toggle] = useToggle();
  const { showNotification } = useNotifications();

  const { data, isError, refetch } =
    useGetIndicesStorageSize();
  const storageSize = data?.total_storage ?? 0;

  const storageInvalid = storageSize < MINIMUM_SIZE;

  const [storage, setStorage] = useSetState({
    total: 0,
    used: 1,
    usedUnit: 'GB',
    free: 0,
    freeUnit: 'GB',
  });

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'logManagement.notification.created'
      ) as string,
    });
    onClose();
    toggle(false);
    form.resetFields();
  };

  const { submit, isLoading } = useCreateIndice({
    onSuccess,
    onError: () => toggle(false),
  });

  const getUsed = (
    storageSize: number
  ): [number, string] => {
    const [value, unit] = bytesToUnit(storageSize);
    if (unit === 'TB') return [1, 'GB'];
    else if (unit === 'GB' && value >= 1)
      return [1, 'GB'];
    else if (unit === 'MB' && value >= 512)
      return [512, 'MB'];
    return [0, 'MB'];
  };

  const getFree = (
    storageSize: number
  ): [number, string] => {
    const [value, unit] = bytesToUnit(storageSize);
    return [value, unit];
  };

  const onUsed = (used: number) => {
    setStorage({ used });
  };

  const onChangeUnit = (unit: string) => {
    const used = ['TB', 'GB'].includes(unit) ? 1 : 512;
    setStorage({ usedUnit: unit, used });
  };

  const gigabytesToBytes = (gigabytes: number) => {
    // 1 GB is equal to 1073741824 bytes
    return gigabytes * 1073741824;
  };

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    const storageValue = {
      TB: storage.used * 1024,
      GB: storage.used,
      MB: storage.used / 1024,
    } as Record<string, number>;

    //Recheck storage size
    toggle(true);
    const recheckSize = await getIndicesStorageSize();
    if (
      gigabytesToBytes(storageValue[storage.usedUnit]) >
      recheckSize.total_storage
    ) {
      showNotification({
        type: 'error',
        message: t(
          'logManagement.indices.storage.invalid'
        ) as string,
      });
      refetch();
      return;
    }

    submit({
      ...values,
      module: 'SIEM',
      storage: gigabytesToBytes(
        storageValue[storage.usedUnit]
      ),
    });
  };

  const affterClose = () => {
    form.resetFields();
    setStorage({ used: 0, free: 0 });
  };

  useEffect(() => {
    if (open) {
      const [used, usedUnit] = getUsed(storageSize);
      const [free, freeUnit] = getFree(storageSize);

      setStorage({
        total: storageSize,
        used,
        usedUnit,
        free,
        freeUnit,
      });
    }
  }, [open, setStorage, storageSize]);

  return (
    <Modal
      title={
        <IntlMessage id="logManagement.indices.create" />
      }
      isError={isError}
      open={open}
      onCancel={onClose}
      onOk={onSubmit}
      afterClose={affterClose}
      okText={<IntlMessage id="logManagement.create" />}
      maskClosable={false}
      cancelText={
        <IntlMessage id="logManagement.cancel" />
      }
      okButtonProps={{
        loading: isLoading || loading,
        disabled: storageInvalid,
      }}
      destroyOnClose
      width={600}
      bodyPadding={0}
    >
      <IndicesCreateForm
        form={form}
        storage={storage}
        totalStorage={storageSize}
        storageInvalid={storageInvalid}
        onChangeUnit={onChangeUnit}
        onUsed={onUsed}
      />
    </Modal>
  );
};
