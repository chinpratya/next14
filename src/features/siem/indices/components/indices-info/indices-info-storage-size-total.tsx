import { Flex } from '@mantine/core';
import {
  Form,
  FormInstance,
  InputNumber,
  Select,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { validation } from '@/utils';

import { constant, convertCase } from '../../../shared';

type IndicesInfoStorageSizeTotalProps = {
  form: FormInstance;
  currentSize: number;
};

export const IndicesInfoStorageSizeTotal = ({
  form,
  currentSize,
}: IndicesInfoStorageSizeTotalProps) => {
  const { t } = useTranslation();
  const unit = Form.useWatch('unit', form);

  const errorMessage = (
    unit: string,
    maxSize: number,
    minSize: number
  ) => {
    return `total must be between ${minSize} ${unit} and ${maxSize} ${unit}`;
  };

  const getSizeDetails = (unit: string) => {
    const storageInfo = {
      TB: {
        maxSize: constant.storage.tbMaxSize,
        minSize: 1,
        convertFn: convertCase.convertTbToBytes,
      },
      GB: {
        maxSize: constant.storage.gbMaxSize,
        minSize: 1,
        convertFn: convertCase.convertGbToBytes,
      },
      MB: {
        maxSize: constant.storage.mbMaxSize,
        minSize: 512,
        convertFn: convertCase.convertMbToBytes,
      },
    };
    return storageInfo[unit as 'GB' | 'TB' | 'MB'];
  };

  const onValidator = (value: number | null) => {
    if (!value) return Promise.resolve();

    const { maxSize, minSize, convertFn } =
      getSizeDetails(unit);

    if (value > maxSize) {
      return Promise.reject(
        errorMessage(unit, maxSize, minSize)
      );
    }

    if (value < minSize) {
      return Promise.reject(
        errorMessage(unit, maxSize, minSize)
      );
    }

    if (currentSize > convertFn(value)) {
      return Promise.reject('กรุณาตรวจสอบข้อมูลอีกครั้ง');
    }

    return Promise.resolve();
  };

  return (
    <Flex gap="sm">
      <Form.Item
        name="total"
        label={
          <IntlMessage id="logManagement.indices.totalLog" />
        }
        style={{ width: '80%' }}
        validateTrigger="onChange"
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
          { validator: (_, value) => onValidator(value) },
        ]}
      >
        <InputNumber
          className="w-100"
          disabled
          placeholder={
            t('logManagement.placeholder', {
              field: t('logManagement.indices.totalLog'),
            }) as string
          }
        />
      </Form.Item>
      <Form.Item
        label=" "
        className="flex-grow-1"
        name="unit"
      >
        <Select
          className="w-100"
          options={[
            { label: 'MB', value: 'MB' },
            { label: 'GB', value: 'GB' },
            { label: 'TB', value: 'TB' },
          ]}
          disabled
        />
      </Form.Item>
    </Flex>
  );
};
