import { FormInstance } from 'antd';

import { RuleCustomizeForm } from '../rule-customize-form';

type RuleCreateProps = {
  form: FormInstance;
  filters?: Record<string, unknown>;
  onChangeFilter: (
    filters: Record<string, unknown>
  ) => void;
};

export const RuleCreate = ({
  form,
  filters,
  onChangeFilter,
}: RuleCreateProps) => {
  return (
    <RuleCustomizeForm
      form={form}
      filters={filters}
      onChangeFilter={onChangeFilter}
    />
  );
};
