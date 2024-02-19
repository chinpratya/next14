import { Typography } from 'antd';
import React from 'react';

import { AddOptionWidget } from './add-option-widget';
import { CheckBoxMultipleSelectionWidget } from './check-box-multiple-selection-widget';
import { DependencyKey } from './dependency-key';
import { DescriptionWidget } from './description-widget';
import { MaxWordWidget } from './max-word-widget';
import { MultipleSelectionWidget } from './multiple-selection-widget';
import { NextButtonText } from './next-button-text';
import { PreviousButtonText } from './previous-button-text';
import { QuotationMark } from './quotation-mark';
import { RequiredWidget } from './required-widget';
import { TitleWidget } from './title-widget';
import { VerticalAlignmentWidget } from './vertical-alignment-widget';

export type BasicInformationWidget =
  | 'addOption'
  | 'checkboxMultipleSelection'
  | 'description'
  | 'maxWord'
  | 'multipleSelection'
  | 'nextButtonText'
  | 'previousButtonText'
  | 'quotationMark'
  | 'required'
  | 'title'
  | 'dependencyKey'
  | 'verticalAlignment';

export type BasicInformationProps = {
  title?: string;
  useTitle?: boolean;
  widgets: BasicInformationWidget[];
};

export const BasicInformation = ({
  title = 'ข้อมูลพื้นฐาน',
  useTitle = true,
  widgets,
}: BasicInformationProps) => {
  const widgetComponents: Record<
    BasicInformationWidget,
    React.ReactNode
  > = {
    addOption: <AddOptionWidget />,
    checkboxMultipleSelection: (
      <CheckBoxMultipleSelectionWidget />
    ),
    description: <DescriptionWidget />,
    maxWord: <MaxWordWidget />,
    multipleSelection: <MultipleSelectionWidget />,
    nextButtonText: <NextButtonText />,
    previousButtonText: <PreviousButtonText />,
    quotationMark: <QuotationMark />,
    required: <RequiredWidget />,
    title: <TitleWidget />,
    dependencyKey: <DependencyKey />,
    verticalAlignment: <VerticalAlignmentWidget />,
  };

  return (
    <>
      <Typography.Title level={4} hidden={!useTitle}>
        {title}
      </Typography.Title>
      {widgets.map((widget) => widgetComponents[widget])}
    </>
  );
};
