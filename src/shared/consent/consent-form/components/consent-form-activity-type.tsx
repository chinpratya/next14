import { FormInstance } from 'antd';

import { ConsentActivityTypeItem } from '@/types';
import {
  FormBuilder,
  FormItemType,
} from '@components/form-builder';

export type ConsentFormActivityTypeProps = {
  form: FormInstance;
  component: ConsentActivityTypeItem;
};

export const ConsentFormActivityType = ({
  form,
  component,
}: ConsentFormActivityTypeProps) => {
  const options =
    component?.widgetProps?.options?.map((option) => ({
      label: option?.name ?? option?.base,
      value: option?.name ?? option?.base,
    })) ?? [];

  return (
    <FormBuilder
      formItems={[
        {
          ...component,
          widget: 'select',
          widgetProps: {
            ...component?.widgetProps,
            options,
          },
        } as FormItemType,
      ]}
      form={form}
    />
  );
};
