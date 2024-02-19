import { useToggle } from '@mantine/hooks';
import { useState } from 'react';

import { SideSettingLayout } from '@/layouts';

import {
  FormAssessment,
  FormProgress,
  FormComment,
} from './components';

export type PortalAssessmentFormProps = {
  assessmentId: string;
  readMode?: boolean;
  status?: string | undefined;
};

export const PortalAssessmentForm = ({
  assessmentId,
  readMode,
  status,
}: PortalAssessmentFormProps) => {
  const [collapsed, toggleCollapsed] = useToggle();
  const [openComment, setComment] =
    useState<boolean>(false);

  const onToggleComment = () => {
    if (!openComment && collapsed) {
      setComment((prev) => !prev);
      return;
    }
    if (collapsed) {
      setComment((prev) => !prev);
    }
    if (!collapsed) {
      setComment((prev) => !prev);
      toggleCollapsed();
    }
  };

  return (
    <SideSettingLayout
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
      sideWidth={350}
      contentRender={() => (
        <FormAssessment
          assessmentId={assessmentId}
          onToggleComment={onToggleComment}
          readMode={readMode}
          status={status}
        />
      )}
      sideRender={() =>
        openComment ? (
          <FormComment
            assessmentId={assessmentId}
            onToggleComment={onToggleComment}
          />
        ) : (
          <FormProgress assessmentId={assessmentId} />
        )
      }
    />
  );
};
