import { PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import {
  Form,
  Select,
  FormItemProps,
  Typography,
} from 'antd';

import { useSearch, useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { Flex } from '@components/flex';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListTags } from '../../api/list-tags';
import { TagsCreateModal } from '../tags-create-modal';

const FormItem = styled(Form.Item)`
  .ant-form-item-label {
    label {
      width: 100%;
    }
  }
`;

export type TagsFormItemProps = FormItemProps & {
  disabled?: boolean;
};

export const TagsFormItem = ({
  label = (
    <IntlMessage id={tokens.riskAssessment.tags.title} />
  ),
  labelCol = { span: 24 },
  disabled = false,
  ...formItemProps
}: TagsFormItemProps) => {
  const toggle = useToggle();

  const { debouncedSearch, search, onSearch } =
    useSearch();

  const { data, isLoading, isError } = useListTags({
    search: debouncedSearch ?? '',
  });

  const tagOptions = data?.data?.map((tag) => ({
    label: tag.name,
    value: tag.ObjectUUID,
  }));

  return (
    <FallbackError isError={isError}>
      <FormItem
        label={
          <Flex
            justifyContent="between"
            className="w-100"
          >
            <Typography.Text>{label}</Typography.Text>
            <Typography.Link
              onClick={() =>
                !disabled ? toggle.create() : null
              }
              style={{
                color: !disabled ? '#3364FE' : '#C4C4C4',
                cursor: !disabled
                  ? 'pointer'
                  : 'not-allowed',
              }}
            >
              <PlusOutlined className="mr-1" />
              <IntlMessage
                id={tokens.riskAssessment.tags.create}
              />
            </Typography.Link>
          </Flex>
        }
        labelCol={labelCol}
        {...formItemProps}
      >
        <Select
          showSearch
          searchValue={search}
          autoClearSearchValue
          onSearch={onSearch}
          mode="multiple"
          loading={isLoading}
          options={tagOptions}
          onDropdownVisibleChange={(open) => {
            if (!open) {
              onSearch('');
            }
          }}
        />
      </FormItem>
      <TagsCreateModal
        open={toggle.openCreate}
        onClose={toggle.create}
      />
    </FallbackError>
  );
};
