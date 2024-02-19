import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Button,
  Card,
  Divider,
  Empty,
  Typography,
} from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useToggle } from '@/hooks';
import { DropdownTable } from '@components/dropdown-table';
import {
  FormBuilder,
  FormItemType,
} from '@components/form-builder';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  Preference,
  PerferenceType,
} from '../../../types';

import { PurposeSettingAddPreferenceModal } from './purpose-setting-add-preference-modal';

export type PurposeSettingAddPreferenceProps = {
  preferenceTypes: PerferenceType[];
  preferences?: Preference[];
  onChangePreference?: (
    preferences: Preference[]
  ) => void;
  disabled?: boolean;
};

export const PurposeSettingAddPreference = ({
  onChangePreference,
  preferenceTypes,
  preferences = [],
  disabled = false,
}: PurposeSettingAddPreferenceProps) => {
  const toggle = useToggle();

  const [preferencesState, setPreferencesState] =
    useState<Preference[] | null>(null);

  const convertToFormBuilder = (value: Preference) => {
    const widget =
      _.find(preferenceTypes, {
        ObjectUUID: value.attributeTypeID,
      })?.ObjectUUID ?? 'checkbox-group';

    if (!widget) return null;

    return {
      widget,
      widgetProps: {
        options: value.choices,
      },
      label: value.name,
      name: value.id,
      rules: [
        {
          required: true,
          message: `กรุณาเลือก ${value.name}`,
        },
      ],
    };
  };

  const onDelete = (preferenceId: string) => {
    const updatedPreferences =
      preferencesState?.filter(
        (item) => item.id !== preferenceId
      ) ?? [];
    setPreferencesState(updatedPreferences);
    onChangePreference?.(updatedPreferences);
  };

  useEffect(() => {
    setPreferencesState(preferences);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClosePreferenceModal = () => {
    if (toggle.openCreate) {
      toggle.create();
    }
    if (toggle.openEdit) {
      toggle.edit();
    }
  };

  const handleAddEditPreference = (
    preference: Preference
  ) => {
    if (toggle.openCreate) {
      const preferences = [
        ...(preferencesState ?? []),
        {
          ...preference,
          id: uuid(),
        },
      ];
      setPreferencesState(preferences);
      onChangePreference?.(preferences);
      toggle.create();
    } else if (toggle.openEdit) {
      const updatedPreferences =
        preferencesState?.map((item) => {
          if (item.id === preference.id) {
            return preference;
          }
          return item;
        }) ?? [];
      setPreferencesState(updatedPreferences);
      onChangePreference?.(updatedPreferences);
      toggle.edit();
    } else {
      return;
    }
  };

  const preferenceLabelRender = (item: Preference) => (
    <Flex
      className="w-100"
      justify={'space-between'}
      align={'center'}
    >
      <Typography.Text>{item.name}</Typography.Text>
      <DropdownTable
        items={[
          {
            key: 'edit',
            label: 'แก้ไข',
            icon: <EditOutlined />,
            onClick: () => toggle.edit(item),
            disabled: disabled,
          },
          {
            key: 'delete',
            label: 'ลบ',
            icon: <DeleteOutlined />,
            onClick: () => onDelete(item.id),
            disabled: disabled,
          },
        ]}
      />
    </Flex>
  );

  return (
    <>
      <Card
        title={
          <IntlMessage id="consentManagement.purpose.customPurpose.preference" />
        }
        loading={!preferenceTypes.length}
      >
        {preferencesState === null ||
        preferencesState?.length === 0 ? (
          <div className="text-center p-5">
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 80,
                marginBottom: 24,
              }}
              description={
                <Typography.Text>
                  <IntlMessage id="consentManagement.purpose.customPurpose.LabelCustomPreference" />
                </Typography.Text>
              }
            >
              <Button
                type="primary"
                onClick={() => toggle.create()}
                disabled={disabled}
              >
                <IntlMessage id="consentManagement.purpose.customPurpose.addPreference" />
              </Button>
            </Empty>
          </div>
        ) : (
          <div
            className={css`
              .ant-form-item-label > label {
                width: 100% !important;
                font-weight: normal !important;
              }

              .ant-form-item-required {
                width: 100% !important;
              }
            `}
          >
            <FormBuilder
              formItems={
                preferencesState?.map((item) => ({
                  ...convertToFormBuilder(item),
                  labelCol: 24,
                  label: preferenceLabelRender(item),
                })) as FormItemType[]
              }
            />
            <Divider />
            <Button
              type={'dashed'}
              onClick={() => toggle.create()}
              disabled={disabled}
              className="w-100"
            >
              <PlusCircleOutlined className="mr-1" />
              <IntlMessage id="consentManagement.purpose.customPurpose.addPreference" />
            </Button>
          </div>
        )}
      </Card>
      <PurposeSettingAddPreferenceModal
        open={toggle.openCreate || toggle.openEdit}
        onClose={onClosePreferenceModal}
        data={toggle.data}
        onFinish={handleAddEditPreference}
        preferenceTypes={preferenceTypes}
      />
    </>
  );
};
