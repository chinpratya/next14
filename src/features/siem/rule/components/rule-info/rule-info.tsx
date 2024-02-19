import { FormInstance } from 'antd';

import { RuleInfo } from '../../types';
import { RuleCustomizeForm } from '../rule-customize-form';

type RuleInformationProps = {
  data?: RuleInfo;
  form: FormInstance;
  filters?: Record<string, unknown>;
  onSubmit: () => void;
  onChangeFilter: (
    filters: Record<string, unknown>
  ) => void;
};

export const RuleInformation = ({
  data,
  form,
  filters,
  onSubmit,
  onChangeFilter,
}: RuleInformationProps) => {
  return (
    <RuleCustomizeForm
      filters={filters}
      form={form}
      data={data}
      onSubmit={onSubmit}
      onChangeFilter={onChangeFilter}
    />
  );
};
