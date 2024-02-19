import { Modal } from 'antd';
import { v4 as uuid } from 'uuid';

import { useSearch } from '@/hooks';
import { FieldInfo } from '@/types';
import { InputSearch } from '@components/input-search';
import {
  SelectFormFields,
  SelectFormFieldsProps,
} from '@components/select-form-fields';

import { useAaWebformStore } from '../../stores/use-aa-webform-store';

export type WebformCustomizingAddFieldsModalProps = {
  open: boolean;
  parentId?: string;
  onClose: () => void;
};

export const WebformCustomizingAddFieldsModal = ({
  open,
  parentId,
  onClose,
}: WebformCustomizingAddFieldsModalProps) => {
  const { search, onSearch } = useSearch();
  const {
    webformBuilderItems,
    onAddWebformCustomizingItem,
  } = useAaWebformStore();

  const onAddItem = (item: FieldInfo) => {
    const newItem = {
      widget: item.key,
      title: item.title,
      children:
        item.key === 'question-group' ? [] : undefined,
      key: uuid(),
    };
    onAddWebformCustomizingItem?.(newItem, parentId);
    onClose();
  };

  const props = {
    search,
    onClick: onAddItem,
  } as SelectFormFieldsProps;

  const selectedWebformBuilder = webformBuilderItems.find(
    (item) => item.key === parentId
  );

  return (
    <Modal
      title="ฟิลด์พื้นฐาน"
      open={open}
      onCancel={onClose}
      footer={null}
      width={1000}
      centered
    >
      <div style={{ minHeight: '560px' }}>
        <InputSearch
          search={search}
          onSearch={onSearch}
          width="100%"
        />
        <SelectFormFields
          {...props}
          title="ข้อความ"
          fields={['long-text', 'short-text']}
        />
        <SelectFormFields
          {...props}
          title="การให้คะแนนและการจัดลำดับ"
          fields={['matrix']}
        />
        <SelectFormFields
          {...props}
          title="ตัวเลือก"
          fields={['check-box', 'radio-box', 'from-data']}
        />
        <SelectFormFields
          {...props}
          title="โครงสร้างแบบฟอร์ม"
          fields={
            selectedWebformBuilder?.widget ===
            'question-group'
              ? ['statement']
              : ['question-group', 'statement']
          }
        />
      </div>
    </Modal>
  );
};
