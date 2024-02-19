import { useEffect, useState } from 'react';

import { InnerAppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { Modal as CustomModal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useAssessmentSubmissionRespondentAddRespondent } from '../../api/assessment-submission-respondents-add-respondent';
import { useListAssessmentSubmissionAllRespondents } from '../../api/list-assessment-submission-all-respondents';
import { useListAssessmentSubmissionRespondents } from '../../api/list-assessment-submission-respondents';
import { AssessmentSubmissionRespondentBranchRespondent } from '../../types';

import { BranchMenu } from './branch-menu';
import { ListRespondents } from './list-respondents';

export type AssessmentSubmissionRespondentAddRespondentModalProps =
  {
    assessmentId: string;
    open: boolean;
    onCancel: () => void;
  };

export type Selected = {
  [orgId: string]: {
    id: string;
    branchs: {
      [branchId: string]: {
        branchId: string;
        indeterminate?: boolean;
        repondentsId: string[];
      };
    };
  };
};

export const AssessmentSubmissionRespondentAddRespondentModal =
  ({
    assessmentId,
    open,
    onCancel,
  }: AssessmentSubmissionRespondentAddRespondentModalProps) => {
    const { showNotification } = useNotifications();

    const [navigation, setNavigation] = useState({
      organization: '',
      branch: '',
    });

    const [dataSource, setDataSource] = useState<
      AssessmentSubmissionRespondentBranchRespondent[]
    >([]);

    const listAllRespondent =
      useListAssessmentSubmissionAllRespondents({});

    const listRespondentOfBranch =
      useListAssessmentSubmissionRespondents({
        assessmentId,
        branchId: navigation.branch,
        organizationId: navigation.organization,
        enabled: navigation.branch ? true : false,
      });

    const onChangeNavigation = (value: {
      organization: string;
      branch: string;
    }) => {
      setNavigation({ ...value });
    };

    const [selectedRespondent, setSelectedRespondent] =
      useState<Selected>({});

    const addRespondent =
      useAssessmentSubmissionRespondentAddRespondent({
        assessmentId,
        onSuccess: () => {
          showNotification({
            type: 'success',
            message: 'เลือกผู้ตอบแบบประเมินสำเร็จ',
          });
          onCancel();
        },
      });

    const onAddRespondent = () => {
      const payload: {
        orgID: string;
        respondentID: string;
      }[] = [];

      Object.values(selectedRespondent).forEach(
        (item) => {
          Object.values(item.branchs).forEach(
            (branch) => {
              for (const respondentID of branch.repondentsId) {
                payload.push({
                  orgID: item.id,
                  respondentID,
                });
              }
            }
          );
        }
      );

      if (payload.length < 1) {
        showNotification({
          type: 'error',
          message: 'ต้องมีผู้ตอบแบบประเมินอย่างน้อย 1 คน',
        });
        return;
      }

      addRespondent.submit({ respondents: payload });
    };

    useEffect(() => {
      if (
        listAllRespondent.data &&
        listRespondentOfBranch.data
      ) {
        const { branch, organization } = navigation;

        const allRespondent = listAllRespondent.data;
        const respondents =
          listRespondentOfBranch.data.data;

        const organizationBranch = allRespondent.find(
          (item) => item.ObjectUUID === organization
        )?.branchs;

        const listRespondent = organizationBranch
          ?.find((item) => item.ObjectUUID === branch)
          ?.respondents.filter(
            (item) =>
              !respondents
                .map(
                  (respondent) => respondent.ObjectUUID
                )
                .includes(item.ObjectUUID)
          );

        setDataSource(listRespondent ?? []);
      }
    }, [
      listAllRespondent.data,
      listRespondentOfBranch.data,
      navigation,
      selectedRespondent,
    ]);

    useEffect(() => {
      if (!open) {
        setSelectedRespondent({});
        setNavigation({ branch: '', organization: '' });
      }
    }, [open]);

    return (
      <CustomModal
        bodyPadding={0}
        title={
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.selectRespondent" />
        }
        open={open}
        onCancel={onCancel}
        width={1000}
        okButtonProps={{
          loading: addRespondent.isLoading,
        }}
        onOk={onAddRespondent}
        destroyOnClose
        centered
      >
        <InnerAppLayout
          border={true}
          sideContentWidth={350}
          sideContent={
            <BranchMenu
              navigation={navigation}
              selectedRespondent={selectedRespondent}
              allRespondent={listAllRespondent.data}
              setSelectedRespondent={
                setSelectedRespondent
              }
              onChangeNavigation={onChangeNavigation}
            />
          }
          mainContent={
            <ListRespondents
              navigation={navigation}
              dataSource={dataSource}
              selectedRespondent={selectedRespondent}
              loading={listRespondentOfBranch.isLoading}
              setSelectedRespondent={
                setSelectedRespondent
              }
            />
          }
        />
      </CustomModal>
    );
  };
