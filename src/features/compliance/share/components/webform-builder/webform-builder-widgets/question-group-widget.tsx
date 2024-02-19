import { Button } from 'antd';

import { Flex } from '@components/flex';

import { WebformBuilderItem } from '../../../types//webform-builder';

import { WidgetFooter } from './widget-footer';
import { WidgetHeader } from './widget-header';

export const QuestionGroupWidget = ({
  title,
  description,
  quotationMarks,
  nextButtonText,
  previousButtonText,
}: WebformBuilderItem) => {
  const onValidate = () =>
    new Promise<Record<string, unknown>>((resolve) =>
      resolve({})
    );

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
