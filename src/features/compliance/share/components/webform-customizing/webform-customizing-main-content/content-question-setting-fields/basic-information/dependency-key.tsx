import { Form, Select } from 'antd';

import validation from '@/utils/validation';

import { useAaWebform } from '../../../../../hooks/use-aa-webform';
import { useAaWebformStore } from '../../../../../stores/use-aa-webform-store';

export const DependencyKey = () => {
  const { webformBuilderItems } = useAaWebformStore();
  const { getAllWebformBuilderItemsWithChildren } =
    useAaWebform({
      webformBuilderItems,
    });

  const availableWebformBuilderItems =
    getAllWebformBuilderItemsWithChildren(
      webformBuilderItems
    )?.filter(
      (field) =>
        field.widget === 'short-text' ||
        field.widget === 'long-text'
    );

  const options = availableWebformBuilderItems?.map(
    (field) => ({
      label: field.title,
      value: field.key,
    })
  );

  return (
    <Form.Item
      label="เลือกคำถามจากหน้าอื่นๆเพื่อตั้งเป็นคำถาม"
      name="dependencyKey"
      rules={[validation.required('คำถามจากหน้าอื่นๆ')]}
    >
      <Select options={options} />
    </Form.Item>
  );
};
