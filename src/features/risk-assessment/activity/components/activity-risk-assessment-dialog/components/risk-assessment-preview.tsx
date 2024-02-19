import { Flex } from '@mantine/core';
import { Button, Divider } from 'antd';

import { tokens } from '@/lang';
import { IntlMessage } from '@utilComponents/intl-message';

import { ActivityAssessmentPreview } from '../../activity-assessment-preview';
import { StepWidgetProps } from '../types';

export type RiskAssessmentPreviewProps = StepWidgetProps;

export const RiskAssessmentPreview = ({
  state,
  onClose,
  onPrev,
  onNext,
}: RiskAssessmentPreviewProps) => {
  return (
    <>
      <div className="p-4">
        <ActivityAssessmentPreview
          data={state?.preview}
        />
      </div>
      <Divider className="mb-0" />
      <Flex
        justify="end"
        align="center"
        gap={8}
        className="p-3"
      >
        <Button onClick={onClose}>
          <IntlMessage id={tokens.common.cancel} />
        </Button>
        <Button onClick={onPrev}>
          <IntlMessage id={tokens.common.back} />
        </Button>
        <Button type="primary" onClick={onNext}>
          <IntlMessage id={tokens.common.next} />
        </Button>
      </Flex>
    </>
  );
};
