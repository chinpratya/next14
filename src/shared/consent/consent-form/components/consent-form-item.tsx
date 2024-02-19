import { FormInstance } from 'antd';

import { useFormCondition } from '@/hooks';
import {
  ConsentActivityType,
  ConsentActivityTypeItem,
  ConsentFormItemType,
  ConsentPolicyType,
  ConsentPurposeType,
  ConsentFormItemSectionType,
  ConsentVisibilityType,
} from '@/types';
import {
  FormBuilder,
  FormItemType,
} from '@components/form-builder';

import { ConsentFormActivity } from './consent-form-activity';
import { ConsentFormActivityType } from './consent-form-activity-type';
import { ConsentBuilderPolicy } from './consent-form-policy';
import { ConsentBuilderPurpose } from './consent-form-purpose';
import { ConsentFormRequestType } from './consent-form-request-type';
import { ConsentFormRequestTypeDsar } from './consent-form-request-type-dsar';

export type ConsentFormItemProps = {
  form: FormInstance;
  formItem: ConsentFormItemType;
  section: ConsentFormItemSectionType;
  component: Record<string, unknown>;
  viewOnly?: boolean;
  visibilities?: ConsentVisibilityType[];
};

export const ConsentFormItem = ({
  form,
  formItem,
  section,
  component,
  viewOnly,
  visibilities,
}: ConsentFormItemProps) => {
  const componentId = (component?.activityID ??
    component?.purposeID ??
    component?.name ??
    component?.id ??
    '') as string;

  const { isVisibility } = useFormCondition({
    form,
    id: componentId,
    visibilities,
  });

  if (!isVisibility) {
    return null;
  }

  return (
    <div key={formItem.id + section.id + componentId}>
      {(component?.type === 'field' ||
        component?.type === 'identifier') && (
        <FormBuilder
          form={form}
          formItems={[
            component as unknown as FormItemType,
          ]}
          isReadonly={viewOnly}
        />
      )}
      {component?.type === 'request-type' && (
        <ConsentFormRequestType
          form={form}
          component={component}
          isReadonly={viewOnly}
        />
      )}
      {component?.type === 'request-type-dsar' && (
        <ConsentFormRequestTypeDsar
          component={component}
          form={form}
          isReadonly={viewOnly}
        />
      )}
      {component?.type === 'activity' && (
        <div
          style={{
            pointerEvents: viewOnly ? 'none' : 'auto',
          }}
        >
          <ConsentFormActivity
            form={form}
            activity={
              component as unknown as ConsentActivityType
            }
          />
        </div>
      )}
      {component?.type === 'purpose' && (
        <div
          style={{
            pointerEvents: viewOnly ? 'none' : 'auto',
          }}
        >
          <ConsentBuilderPurpose
            form={form}
            purpose={
              component as unknown as ConsentPurposeType
            }
          />
        </div>
      )}
      {component?.type === 'policy' && (
        <ConsentBuilderPolicy
          policy={
            component as unknown as ConsentPolicyType
          }
        />
      )}
      {component?.type === 'label' && (
        <div
          style={{
            pointerEvents: viewOnly ? 'none' : 'auto',
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: component.value as string,
            }}
          />
        </div>
      )}
      {component?.type === 'activity-type' && (
        <div
          style={{
            pointerEvents: viewOnly ? 'none' : 'auto',
          }}
        >
          <ConsentFormActivityType
            form={form}
            component={
              component as unknown as ConsentActivityTypeItem
            }
          />
        </div>
      )}
    </div>
  );
};
