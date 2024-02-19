import { FormInstance } from 'antd';
import { useEffect } from 'react';

import { ConsentActivityTypeItem } from '@/types';
import {
  FormBuilder,
  FormItemType,
} from '@components/form-builder';

export type ConsentBuilderActivityTypeWidgetProps = {
  form: FormInstance;
  component: ConsentActivityTypeItem;
};

export const ConsentBuilderActivityTypeWidget = ({
  form,
  component,
}: ConsentBuilderActivityTypeWidgetProps) => {
  const options =
    component?.widgetProps?.options?.map((option) => ({
      label: option?.name ?? option?.base,
      value: option?.name ?? option?.base,
    })) ?? [];

  useEffect(() => {
    form.setFieldsValue({
      [component?.name as string]:
        component?.initialValue ?? '',
    });
  }, [component?.initialValue, component?.name, form]);

  return (
    <FormBuilder
      isReadonly={true}
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
