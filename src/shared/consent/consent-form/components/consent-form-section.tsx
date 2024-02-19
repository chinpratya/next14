import { Card, FormInstance } from 'antd';
import { ReactNode } from 'react';

import { useFormCondition } from '@/hooks';
import {
  ConsentPropertiesType,
  ConsentVisibilityType,
} from '@/types';

export type ConsentFormSectionProps = {
  id: string;
  name: string;
  children?: ReactNode;
  form: FormInstance;
  visibilities?: ConsentVisibilityType[];
  isShowHidden?: boolean;
  properties?: ConsentPropertiesType;
};

export const ConsentFormSection = ({
  id,
  name,
  children,
  form,
  visibilities,
  isShowHidden = false,
  properties,
}: ConsentFormSectionProps) => {
  const { isVisibility } = useFormCondition({
    id,
    form,
    visibilities,
  });

  if (!isVisibility) {
    return null;
  }

  return (
    <Card
      title={name}
      hidden={properties?.isHidden && !isShowHidden}
    >
      {children}
    </Card>
  );
};
