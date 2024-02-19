import { css } from '@emotion/css';
import {
  Badge,
  Progress,
  Tooltip,
  Typography,
} from 'antd';
import * as R from 'ramda';

import { WebformBuilderItem } from '../../../../share';

const STATUS_COLORS = {
  success: '#06e40f',
  skipped: '#e2e2e2',
  default: '#455560',
};

export type FormProgressMenuItemProps = {
  currentFieldKey: string;
  field: WebformBuilderItem;
  fieldsValues: Record<string, unknown>;
  formItemsKeys: string[];
  formItems?: WebformBuilderItem[];
  parentFieldKey?: string;
  disabled?: boolean;
};

const FormProgressMenuParent = ({
  field,
  fieldsValues,
  formItemsKeys,
}: FormProgressMenuItemProps) => {
  const children = R.pathOr<WebformBuilderItem[]>(
    [],
    ['children'],
    field
  );
  const hasChildren = children.length > 0;

  const childrenEnabled = children.filter(
    (child) =>
      formItemsKeys.includes(child.key) &&
      child.widget !== 'question-group' &&
      child.widget !== 'statement'
  );

  const completedChildren = children.filter(
    (child) =>
      fieldsValues[child.key] !== undefined &&
      fieldsValues[child.key] !== null
  );

  return (
    <div
      className={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 293px;
      `}
    >
      <Typography.Text
        className={css`
          display: inline-block;
          width: ${hasChildren ? '60%' : '100%'};
          text-overflow: ellipsis;
          overflow-x: hidden;
        `}
      >
        {field.title}
      </Typography.Text>
      <Progress
        className={css`
          width: 40%;
          display: ${hasChildren ? 'block' : 'none'};

          .ant-progress-line {
            font-size: 12px;
          }

          .ant-progress-bg {
            height: 16px !important;
            background-color: #1890ff;
          }

          .ant-progress-text {
            color: #1890ff !important;
          }
        `}
        percent={Math.trunc(
          (completedChildren.length /
            childrenEnabled.length) *
            100
        )}
      />
    </div>
  );
};

const FormProgressMenuChild = ({
  field,
  fieldsValues,
  formItems,
  formItemsKeys,
  currentFieldKey,
  parentFieldKey,
  disabled,
}: FormProgressMenuItemProps) => {
  const isSuccess = fieldsValues[field.key] && !disabled;

  const childrenInParent = formItems?.find(
    (item) => item.key === parentFieldKey
  )?.children;

  const childrenIsSuccess = childrenInParent?.filter(
    (child) => fieldsValues[child.key]
  );

  const lastChildIsSuccessIndex =
    childrenInParent?.findIndex(
      (child) =>
        child.key ===
        childrenIsSuccess?.[childrenIsSuccess.length - 1]
          ?.key
    );

  let currentFieldIndex = childrenInParent?.findIndex(
    (child) => child.key === currentFieldKey
  );

  if (currentFieldIndex === -1) {
    currentFieldIndex = lastChildIsSuccessIndex;
  }

  const isSkipped =
    disabled || !formItemsKeys.includes(field.key);

  const status = isSuccess
    ? 'success'
    : isSkipped
    ? 'skipped'
    : 'default';

  return (
    <div
      className={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 260px;

        .ant-typography {
          display: inline-block;
          text-overflow: ellipsis;
          overflow-x: hidden;
        }
      `}
    >
      <Typography.Text>{field.title}</Typography.Text>
      <Tooltip
        placement="topRight"
        title={
          isSuccess
            ? 'ตอบแล้ว'
            : isSkipped
            ? 'ข้าม'
            : 'ยังไม่ตอบ'
        }
      >
        <Badge
          className={css`
            .ant-badge-status-dot {
              width: 12px;
              height: 12px;
            }
          `}
          color={STATUS_COLORS[status]}
        />
      </Tooltip>
    </div>
  );
};

export type FormProgressMenuProps = {
  fieldsValues: Record<string, unknown>;
  formItemsKeys: string[];
  field: WebformBuilderItem;
  currentFieldKey: string;
  formItems?: WebformBuilderItem[];
  disabled?: boolean;
};
export const FormProgressMenu = ({
  currentFieldKey,
  field,
  fieldsValues,
  formItems = [],
  disabled,
  formItemsKeys,
}: FormProgressMenuProps) => {
  const parent = formItems.find((item) =>
    item?.children?.find(
      (child) => child.key === field.key
    )
  );

  const props = {
    currentFieldKey,
    field,
    fieldsValues,
    formItems,
    parentFieldKey: parent?.key,
    disabled,
    formItemsKeys,
  };

  if (!parent)
    return <FormProgressMenuParent {...props} />;

  return <FormProgressMenuChild {...props} />;
};
