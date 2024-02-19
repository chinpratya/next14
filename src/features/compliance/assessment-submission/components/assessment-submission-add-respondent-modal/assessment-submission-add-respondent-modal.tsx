import { Skeleton } from 'antd';
import _ from 'lodash';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { InnerAppLayout } from '@/layouts';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListAssessmentSubmissionAllRespondents } from '../../api/list-assessment-submission-all-respondents';
import {
  AssessmentSubmissionRespondentBranchRespondent,
  SelectedBranch,
  SelectedRespondent,
} from '../../types';

import { AssessmentSubmissionRespondentList } from './assessment-submission-respondent-list';
import { BranchMenu } from './branch-menu';

export type AssessmentSubmissionAddRespondentModalProps =
  {
    open: boolean;
    respondentFormValue: SelectedRespondent;
    selectedDraft: SelectedRespondent;
    setSelectedDraft: Dispatch<
      SetStateAction<SelectedRespondent>
    >;
    onCancel: () => void;
    onSubmit?: (value: SelectedRespondent) => void;
    isHaveApprover: boolean;
  };

export const AssessmentSubmissionAddRespondentModal = ({
  open,
  selectedDraft,
  respondentFormValue,
  setSelectedDraft,
  onSubmit,
  onCancel,
  isHaveApprover,
}: AssessmentSubmissionAddRespondentModalProps) => {
  const [respondentsList, setRespondentsList] = useState<
    AssessmentSubmissionRespondentBranchRespondent[]
  >([]);
  const [selectedBranch, setSelectedBranch] =
    useState<SelectedBranch>({});
  const [draft, setDraft] = useState<SelectedRespondent>(
    {}
  );

  const { data, isLoading, isError } =
    useListAssessmentSubmissionAllRespondents({
      haveApprover: isHaveApprover ?? false,
    });

  const onSelectBranch = (
    organizeIndex: number,
    organizeId: string,
    branchId: string
  ) => {
    setSelectedBranch({
      organizeIndex,
      organizeId,
      branchId,
    });

    const filterBranch = data?.[
      organizeIndex
    ].branchs.filter(
      (item) => item.ObjectUUID === branchId
    );
    setRespondentsList(
      filterBranch?.[0].respondents ?? []
    );
  };

  const onOk = () => {
    const newDraft = { ...draft };
    Object.values(newDraft).forEach((item) => {
      Object.values(item.branchs).forEach((branch) => {
        if (branch.respondents.length < 1)
          delete newDraft[item.id].branchs[branch.id];
      });

      if (Object.keys(item.branchs).length < 1)
        delete newDraft[item.id];
    });

    onSubmit?.(newDraft);
  };

  const onClose = () => {
    onCancel();
    setSelectedDraft(respondentFormValue);
    setSelectedBranch({});
  };

  useEffect(() => {
    const initialValue = () => {
      setSelectedBranch({
        organizeIndex: 0,
        organizeId: data?.[0]?.ObjectUUID,
        branchId: data?.[0]?.branchs[0]?.ObjectUUID,
      });
      setRespondentsList(
        data?.[0]?.branchs[0]?.respondents ?? []
      );
    };

    if (data) initialValue();
  }, [data]);

  useEffect(() => {
    const loadSelectedDraft = () => {
      Object.keys(selectedDraft).forEach(function (key) {
        const findOrg = data?.find(
          (item) => item.ObjectUUID === key
        );
        Object.keys(selectedDraft[key].branchs).forEach(
          (item) => {
            const findBranchRespondent =
              findOrg?.branchs
                .find(
                  ({ ObjectUUID }) => ObjectUUID === item
                )
                ?.respondents.filter(
                  (item) =>
                    item.haveApprover || !isHaveApprover
                ) ?? [];

            const { respondents } =
              selectedDraft[key].branchs[item];

            selectedDraft[key].branchs[item] = {
              ...selectedDraft[key].branchs[item],
              respondents: respondents.filter(
                (respondent) =>
                  _.find(findBranchRespondent, {
                    ObjectUUID: respondent.ObjectUUID,
                  })
              ),
              indeterminate:
                respondents.length <
                findBranchRespondent?.length,
            };
          }
        );
      });

      console.log(selectedDraft);
      setDraft(selectedDraft);
    };

    if (open && data) {
      loadSelectedDraft();
    }
  }, [data, isHaveApprover, open, selectedDraft]);

  return (
    <Modal
      title={
        <IntlMessage id="compliance.assessmentSubmission.create.respondent.selectRespondent" />
      }
      open={open}
      bodyPadding={0}
      onCancel={onClose}
      width={1200}
      onOk={onOk}
      centered
      destroyOnClose
    >
      <FallbackError isError={isError}>
        {isLoading ? (
          <Skeleton className="mt-4 px-4" />
        ) : (
          <InnerAppLayout
            border={true}
            sideContentWidth={350}
            sideContent={
              <BranchMenu
                data={data ?? []}
                selected={draft}
                selectedBranch={selectedBranch}
                setSelected={setDraft}
                onSelectBranch={onSelectBranch}
                isHaveApprover={isHaveApprover}
              />
            }
            mainContent={
              <AssessmentSubmissionRespondentList
                data={data}
                respondents={respondentsList}
                selected={draft}
                selectedBranch={selectedBranch}
                setSelected={setDraft}
                isHaveApprover={isHaveApprover}
              />
            }
          />
        )}
      </FallbackError>
    </Modal>
  );
};
