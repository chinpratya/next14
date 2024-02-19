import { Button, Card } from 'antd';
import _ from 'lodash';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { useSearch, useToggle } from '@/hooks';
import { InputSearch } from '@components/input-search';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  RespondentDataSource,
  SelectedRespondent,
} from '../../types';
import { AssessmentSubmissionAddRespondentModal } from '../assessment-submission-add-respondent-modal';

import { ListRespondents } from './list-respondents';

export type AssessmentSubmissionSelectAssessmentModalRespondentProps =
  {
    respondentFormValue: SelectedRespondent;
    setRespondentFormValue: Dispatch<
      SetStateAction<SelectedRespondent>
    >;
    isHaveApprover?: boolean;
  };

export const AssessmentSubmissionSelectAssessmentModalRespondent =
  ({
    respondentFormValue,
    setRespondentFormValue,
    isHaveApprover = false,
  }: AssessmentSubmissionSelectAssessmentModalRespondentProps) => {
    const toggle = useToggle();
    const { debouncedSearch, onSearch } = useSearch();

    const [dataSource, setDataSource] = useState<
      RespondentDataSource[]
    >([]);

    const [selectedDraft, setSelectedDraft] =
      useState<SelectedRespondent>({});

    const onSubmit = (value: SelectedRespondent) => {
      setRespondentFormValue(() => ({
        ...value,
      }));
      setSelectedDraft(value);
      toggle.choose();
    };

    const onDeleteRespondentDraft = ({
      ObjectUUID,
      organizationId,
      branchId,
    }: RespondentDataSource) => {
      const org = respondentFormValue[organizationId];
      const branch = org.branchs[branchId];

      const newDraft: SelectedRespondent = {
        ...respondentFormValue,
        [organizationId]: {
          ...org,
          branchs: {
            ...org.branchs,
            [branchId]: {
              ...branch,
              respondents: branch.respondents.filter(
                (item) => item.ObjectUUID !== ObjectUUID
              ),
            },
          },
        },
      };

      const emptyRespondent =
        Object.values(
          newDraft[organizationId].branchs
        ).filter((item) => item.respondents.length > 0)
          .length === 0;

      if (emptyRespondent)
        delete newDraft[organizationId];

      setSelectedDraft(newDraft);
      setRespondentFormValue(newDraft);
    };

    useEffect(() => {
      const loadResponsdents = () => {
        const dataSource: RespondentDataSource[] = [];

        organization.map((org) => {
          Object.values(org.branchs).map((branch) => {
            branch.respondents.map((respondent) => {
              dataSource.push({
                organizationId: org.id,
                organizationName: org.name,
                branchId: branch.id,
                branchName: branch.name,
                ...respondent,
              });
            });
          });
        });

        setSelectedDraft(respondentFormValue);
        setDataSource(dataSource);
      };

      const organization = Object.values(
        respondentFormValue
      );
      if (organization.length > 0) loadResponsdents();
      else setDataSource([]);
    }, [respondentFormValue]);

    useEffect(() => {
      if (isHaveApprover) {
        setDataSource((respondents) =>
          _.filter(respondents, { haveApprover: true })
        );
      }
    }, [isHaveApprover]);

    return (
      <>
        <Card
          extra={
            <>
              <InputSearch
                className="mr-2"
                onSearch={onSearch}
              />
              <Button
                type="primary"
                ghost
                onClick={toggle.choose}
              >
                <IntlMessage id="compliance.assessmentSubmission.create.respondent.add" />
              </Button>
            </>
          }
          bordered={false}
        >
          <ListRespondents
            dataSource={dataSource}
            debouncedSearch={debouncedSearch}
            onDeleteRespondentDraft={
              onDeleteRespondentDraft
            }
            isHaveApprover={isHaveApprover}
          />
        </Card>

        <AssessmentSubmissionAddRespondentModal
          open={toggle.openChoose}
          onCancel={toggle.choose}
          respondentFormValue={respondentFormValue}
          selectedDraft={selectedDraft}
          setSelectedDraft={setSelectedDraft}
          onSubmit={onSubmit}
          isHaveApprover={isHaveApprover}
        />
      </>
    );
  };
