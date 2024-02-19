import { useToggle } from '@mantine/hooks';
import { useState } from 'react';

import { SideSettingLayout } from '@/layouts';

import { useGetAssessmentSubmissionRespondentForm } from '../../api/get-assessment-submission-respondents-form';
import { AssessmentSubmissionRespondentDetailForm } from '../../types';

import {
  FormAssessment,
  FormProgress,
  FormComment,
} from './components';

type AssessmentSubmissionRespondentResultProps = {
  assesmentResultID: string;
  assesmentID: string;
};
export const AssessmentSubmissionRespondentResult = ({
  assesmentResultID,
  assesmentID,
}: AssessmentSubmissionRespondentResultProps) => {
  const [collapsed, toggleCollapsed] = useToggle();
  const [openComment, setComment] =
    useState<boolean>(false);
  const [disableComment, setDisableComment] =
    useState<boolean>(true);

  const setDisComment = (disable: boolean) =>
    setDisableComment(disable);

  const { data } =
    useGetAssessmentSubmissionRespondentForm(
      assesmentID,
      assesmentResultID
    );

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
    <>
      <SideSettingLayout
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
        sideWidth={350}
        contentRender={() => (
          <>
            <FormAssessment
              onToggleComment={onToggleComment}
              readMode={true}
              data={
                data as AssessmentSubmissionRespondentDetailForm
              }
              disable={disableComment}
            />
          </>
        )}
        sideRender={() =>
          openComment ? (
            <FormComment
              assessmentId={data?.ObjectUUID as string}
              onToggleComment={onToggleComment}
            />
          ) : (
            <FormProgress
              assessmentId={data?.ObjectUUID as string}
              setDisComment={setDisComment}
            />
          )
        }
      />
    </>
  );
};
