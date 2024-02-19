import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Checkbox, Input, Typography } from 'antd';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';

import { IncidentLogField } from '../../types';

import { IncidentLogActivityFieldItem } from './incident-log-activity-field-item';

type IncidentLogActivityFieldProps = {
  field: IncidentLogField;
  onSearch: (
    value: string | ChangeEvent<HTMLInputElement>
  ) => void;
  onChecked: (checked: boolean, value: string) => void;
  onCheckedAll: (checked: boolean) => void;
};

export const IncidentLogActivityField = ({
  field,
  onSearch,
  onChecked,
  onCheckedAll,
}: IncidentLogActivityFieldProps) => {
  const { t } = useTranslation();

  return (
    <Flex
      direction="column"
      className={css`
        padding: 0 20px;
        width: 100%;
      `}
    >
      <Typography.Text strong>
        <IntlMessage id="siem.logSearch.fields" />
      </Typography.Text>

      <Input
        className="mt-3"
        placeholder={t('logManagement.search') as string}
        onChange={onSearch}
      />

      <Checkbox
        className="mt-4"
        checked={field.checkedAll}
        onChange={(e) => onCheckedAll(e.target.checked)}
      >
        Check all
      </Checkbox>

      <Flex
        direction="column"
        gap="6px"
        className=" mt-3"
      >
        {field.list.map((label) => (
          <IncidentLogActivityFieldItem
            label={label}
            key={label}
            onChecked={onChecked}
            selected={field.selected}
          />
        ))}
      </Flex>
    </Flex>
  );
};
