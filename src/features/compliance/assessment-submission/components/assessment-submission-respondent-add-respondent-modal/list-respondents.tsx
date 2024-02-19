import { css } from '@emotion/css';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { useColumnFiltered, useSearch } from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { IntlMessage } from '@utilComponents/intl-message';

import { AssessmentSubmissionRespondentBranchRespondent } from '../../types';

export type ListRespondentsProps = {
  navigation: { organization: string; branch: string };
  dataSource: AssessmentSubmissionRespondentBranchRespondent[];
  selectedRespondent: Selected;
  loading: boolean;
  setSelectedRespondent: Dispatch<
    SetStateAction<Selected>
  >;
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

const getColumns =
  (): ColumnsType<AssessmentSubmissionRespondentBranchRespondent> => {
    return [
      {
        title: (
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.name" />
        ),
        key: 'name',
        width: 300,
        dataIndex: 'name',
      },
      {
        title: (
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.position" />
        ),
        key: 'position',
        width: 250,
        dataIndex: 'position',
      },
      {
        title: (
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.tel" />
        ),
        key: 'tel',
        width: 250,
        dataIndex: 'tel',
      },
      {
        title: (
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.email" />
        ),
        key: 'email',
        width: 300,
        dataIndex: 'email',
      },
      {
        title: (
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.approverAssessment" />
        ),
        key: 'approverName',
        width: 250,
        dataIndex: 'approverName',
      },
    ];
  };

export const ListRespondents = ({
  dataSource,
  navigation,
  selectedRespondent,
  loading,
  setSelectedRespondent,
}: ListRespondentsProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<
    React.Key[]
  >([]);

  const onSelectChange = (
    newSelectedRowKeys: React.Key[]
  ) => {
    const { branch, organization } = navigation;

    const currentOrg = selectedRespondent[organization];
    const repondentsId = newSelectedRowKeys as string[];

    const indeterminateBranch =
      dataSource.length > newSelectedRowKeys.length;

    if (newSelectedRowKeys.length === 0) {
      const currentBranch = currentOrg.branchs;

      if (Object.keys(currentBranch).length === 1) {
        setSelectedRespondent((current) => {
          const newState = { ...current };
          delete newState[organization];
          return newState;
        });
      } else {
        setSelectedRespondent((current) => {
          const newState = { ...current };
          delete newState[organization].branchs[branch];
          return newState;
        });
      }

      return;
    }

    if (currentOrg) {
      setSelectedRespondent((current) => ({
        ...current,
        [organization]: {
          ...current[organization],
          branchs: {
            ...current[organization].branchs,
            [branch]: {
              branchId: branch,
              indeterminate: indeterminateBranch,
              repondentsId,
            },
          },
        },
      }));
    } else {
      setSelectedRespondent((current) => ({
        ...current,
        [organization]: {
          id: organization,
          branchs: {
            [branch]: {
              branchId: branch,
              indeterminate: indeterminateBranch,
              repondentsId,
            },
          },
        },
      }));
    }

    setSelectedRowKeys(newSelectedRowKeys);
  };

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      id: 'list-respondents',
      columns: getColumns(),
    });

  const { debouncedSearch, onSearch } = useSearch();

  useEffect(() => {
    const { branch, organization } = navigation;
    if (
      selectedRespondent[organization] &&
      selectedRespondent[organization].branchs[branch]
    ) {
      const respondentId =
        selectedRespondent[organization].branchs[branch]
          .repondentsId;
      setSelectedRowKeys(respondentId ?? []);
    } else {
      setSelectedRowKeys([]);
    }
  }, [navigation, selectedRespondent]);

  return (
    <>
      <Flex justifyContent="end" className="mb-4">
        <InputSearch
          className="mr-2"
          onSearch={onSearch}
        />
        {ColumnTransfer}
      </Flex>
      <Flex
        className={css`
          padding: 6px 16px;
          margin-bottom: 4px;
          background-color: #ebefff;
        `}
      >
        <Typography>
          {selectedRowKeys.length}/{dataSource.length}{' '}
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.items" />
        </Typography>
      </Flex>
      <Table
        rowKey="ObjectUUID"
        columns={filteredColumns}
        loading={loading}
        dataSource={
          debouncedSearch
            ? dataSource.filter((item) =>
                item.name
                  .toLowerCase()
                  .includes(debouncedSearch.toLowerCase())
              )
            : dataSource
        }
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: onSelectChange,
          getCheckboxProps: (
            record: AssessmentSubmissionRespondentBranchRespondent
          ) => ({
            disabled: !record.haveApprover,
            name: record.name,
          }),
        }}
      />
    </>
  );
};
