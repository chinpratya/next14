import { Button } from 'antd';
import { useEffect } from 'react';

import { Flex } from '@components/flex';

import { useAssessmentAutomationStore } from '../../../../share';
import { WebformBuilderItem } from '../../../types//webform-builder';

import { WidgetFooter } from './widget-footer';
import { WidgetHeader } from './widget-header';

export const StatementWidget = ({
  title,
  description,
  quotationMarks,
  nextButtonText,
  previousButtonText,
}: WebformBuilderItem) => {
  const { onChangeFormValue } =
    useAssessmentAutomationStore();
  const onValidate = () =>
    new Promise<Record<string, unknown>>((resolve) =>
      resolve({})
    );

  useEffect(() => {
    onChangeFormValue({});
  }, [onChangeFormValue]);

  return (
    <>
      <WidgetHeader
        title={title}
        description={description}
        quotationMarks={quotationMarks}
      />
      <Flex className="mt-4 mb-4">
        <Button type="primary" className="mr-2">
          {nextButtonText}
        </Button>
        <Button>{previousButtonText}</Button>
      </Flex>
      <WidgetFooter onValidate={onValidate} />
    </>
  );
};
