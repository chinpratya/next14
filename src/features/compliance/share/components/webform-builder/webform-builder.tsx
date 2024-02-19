import { memo } from 'react';

import { useAssessmentAutomationStore } from '../../stores';
import { WebformBuilderItem } from '../../types/webform-builder';

// eslint-disable-next-line import/no-cycle
import {
  LongTextWidget,
  ShortTextWidget,
  CheckBoxWidget,
  RadioBoxWidget,
  QuestionGroupWidget,
  StatementWidget,
  FromDataWidget,
} from './webform-builder-widgets';
import { MatrixWidget } from './webform-builder-widgets/matrix-widget-new';

type WebformBuilderWidgetProps = {
  field: WebformBuilderItem;
  fields: WebformBuilderItem[];
  onFinish?: (values: Record<string, unknown>) => void;
};

const WebformBuilderWidget = memo(
  function webformBuilderWidget({
    field,
    fields,
  }: WebformBuilderWidgetProps) {
    switch (field.widget) {
      case 'long-text':
        return <LongTextWidget {...field} />;
      case 'short-text':
        return (
          <ShortTextWidget {...field} fields={fields} />
        );
      case 'check-box':
        return <CheckBoxWidget {...field} />;
      case 'radio-box':
        return <RadioBoxWidget {...field} />;
      case 'question-group':
        return <QuestionGroupWidget {...field} />;
      case 'statement':
        return <StatementWidget {...field} />;
      case 'from-data':
        return (
          <FromDataWidget {...field} fields={fields} />
        );
      case 'matrix':
        return <MatrixWidget {...field} />;
      default:
        return null;
    }
  }
);

export type WebformBuilderProps = {
  readOnly?: boolean;
};

export const WebformBuilder = ({
  readOnly,
}: WebformBuilderProps) => {
  const { selectedFormKey, formItems } =
    useAssessmentAutomationStore();

  const searchFieldByKeyWithFieldInFieldChildren = (
    key: string,
    fields: WebformBuilderItem[]
  ): WebformBuilderItem | undefined => {
    let field: WebformBuilderItem | undefined;
    fields.forEach((item) => {
      item?.children?.forEach((child) => {
        if (child.key === key) {
          field = child;
        }
      });
      if (item.key === key) {
        field = item;
      }
    });
    return field;
  };

  const filteredFields =
    searchFieldByKeyWithFieldInFieldChildren(
      selectedFormKey ?? '',
      formItems
    );

  if (!filteredFields) {
    return null;
  }

  return (
    <div>
      <WebformBuilderWidget
        field={{
          ...filteredFields,
          readOnly,
        }}
        fields={formItems}
      />
    </div>
  );
};
