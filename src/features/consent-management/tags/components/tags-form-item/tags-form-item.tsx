import { PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import {
  Form,
  Select,
  FormItemProps,
  Typography,
} from 'antd';

import { useSearch, useToggle } from '@/hooks';
import { Flex } from '@components/flex';
import { FallbackError } from '@utilComponents/fallback-error';

import { useListTags } from '../../../../data-mapping/tags';
import { TagsCreateModal } from '../tags-create-modal';

const FormItem = styled(Form.Item)`
  .ant-form-item-label {
    label {
      width: 100%;
    }
  }
`;

export type TagsFormItemProps = FormItemProps;
export const TagsFormItem = ({
  label = 'Tags',
  labelCol = { span: 24 },
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
    value: tag.tagID,
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
            <Typography.Link onClick={toggle.create}>
              <PlusOutlined className="mr-1" />
              สร้างป้ายกำกับ
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
