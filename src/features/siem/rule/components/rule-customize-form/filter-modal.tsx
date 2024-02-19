import { Form } from 'antd';
import { useEffect } from 'react';

import { Modal } from '@/components/share-components/modal';
import { IntlMessage } from '@/components/util-components/intl-message';

import { filter } from '../../shared';
import { AliasIndice } from '../../types';

import { FilterForm } from './filter-form';

export type FilterModalProps = {
  open: boolean;
  filters?: Record<string, unknown>;
  field: AliasIndice[];
  isEditor: boolean;
  onClose: () => void;
  onChangeFilter?: (
    filters: Record<string, unknown>
  ) => void;
};

export const FilterModal = ({
  open,
  filters,
  isEditor,
  field,
  onClose,
  onChangeFilter,
}: FilterModalProps) => {
  const [form] = Form.useForm();

  const onFinish = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    onChangeFilter?.(
      filter.formatFilterPayload({
        filters: values.filters,
      })
    );

    onClose();
  };

  useEffect(() => {
    const initialForm = () => {
      const values = filters
        ? filter.getFilterForm(filters)
        : [];
      form.setFieldsValue({ filters: values });
    };

    if (filters && open) initialForm();
  }, [filters, form, open]);

  return (
    <Modal
      title={
        <IntlMessage id="logManagement.logSearch.filter.title" />
      }
      open={open}
      onCancel={onClose}
      onOk={onFinish}
      centered
      width={800}
      destroyOnClose
    >
      <FilterForm
        isEditor={isEditor}
        form={form}
        field={field}
      />
    </Modal>
  );
};
