import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Empty, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { InputSearch } from '@/components/share-components/input-search';
import { useColumnFiltered, useSearch } from '@/hooks';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  AssessmentSubmissionAllRespondent,
  AssessmentSubmissionRespondentBranchRespondent,
  SelectedBranch,
  SelectedRespondent,
} from '../../types';

export type AssessmentSubmissionRespondentListProps = {
  data?: AssessmentSubmissionAllRespondent[];
  respondents?: AssessmentSubmissionRespondentBranchRespondent[];
  selected: SelectedRespondent;
  selectedBranch: SelectedBranch;
  setSelected: Dispatch<
    SetStateAction<SelectedRespondent>
  >;
  isHaveApprover?: boolean;
};

export const AssessmentSubmissionRespondentList = ({
  data,
  respondents,
  selected,
  selectedBranch,
  setSelected,
  isHaveApprover,
}: AssessmentSubmissionRespondentListProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<
    React.Key[]
  >([]);
  const FilterRespondents = _.filter(respondents, (v) => {
    return v.haveApprover || !isHaveApprover;
  });

  const organizeId = selectedBranch.organizeId as string;
  const organizeIndex =
    selectedBranch.organizeIndex as number;
  const branchId = selectedBranch.branchId as string;

  const columns: ColumnsType<AssessmentSubmissionRespondentBranchRespondent> =
    [
      {
        title: (
          <IntlMessage id="compliance.assessmentSubmission.create.respondent.name" />
        ),
        key: 'name',
        dataIndex: 'name',
        width: 200,
      },
      {
        title: (
          <IntlMessage id="compliance.assessmentSubmission.create.respondent.position" />
        ),
        key: 'position',
        dataIndex: 'position',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="compliance.assessmentSubmission.create.respondent.tel" />
        ),
        key: 'tel',
        dataIndex: 'tel',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="compliance.assessmentSubmission.create.respondent.email" />
        ),
        key: 'email',
        dataIndex: 'email',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="compliance.assessmentSubmission.create.respondent.approverName" />
        ),
        key: 'approverName',
        dataIndex: 'approverName',
        width: 150,
      },
    ];

  const getRespondent = (
    selected: React.Key[],
    respondents: AssessmentSubmissionRespondentBranchRespondent[]
  ) => {
    return respondents.filter((item) =>
      selected.includes(item.ObjectUUID)
    );
  };

  const onSelectChange = (
    newSelectedRowKeys: React.Key[]
  ) => {
    const currentOrganize = data?.[
      organizeIndex
    ] as AssessmentSubmissionAllRespondent;

    const currentBranch = currentOrganize?.branchs.filter(
      (item) => item.ObjectUUID === branchId
    )[0];

    const respondents = getRespondent(
      newSelectedRowKeys,
      currentBranch?.respondents
    )?.filter(
      (respondent) =>
        respondent.haveApprover || !isHaveApprover
    );

    const indeterminateBranch =
      respondents.length <
      currentBranch.respondents.filter(
        (item) => item.haveApprover
      ).length;

    if (newSelectedRowKeys.length === 0) {
      if (
        Object.keys(
          selected[currentOrganize.ObjectUUID].branchs
        ).length === 1
      ) {
        setSelected((current) => {
          const newState = { ...current };
          delete newState[currentOrganize.ObjectUUID];
          return newState;
        });
      } else {
        setSelected((current) => {
          const newState = { ...current };
          delete newState[currentOrganize.ObjectUUID]
            .branchs[currentBranch.ObjectUUID];
          return newState;
        });
      }
    } else if (!selected[organizeId]) {
      setSelected((state) => ({
        ...state,
        [currentOrganize.ObjectUUID]: {
          id: currentOrganize.ObjectUUID,
          name: currentOrganize.name,
          branchs: {
            [currentBranch.ObjectUUID]: {
              id: currentBranch.ObjectUUID,
              name: currentBranch.name,
              indeterminate: indeterminateBranch,
              respondents,
            },
          },
        },
      }));
    } else if (!selected[organizeId].branchs[branchId]) {
      setSelected((state) => ({
        ...state,
        [currentOrganize.ObjectUUID]: {
          ...state[currentOrganize.ObjectUUID],
          branchs: {
            ...state[currentOrganize.ObjectUUID].branchs,
            [currentBranch.ObjectUUID]: {
              id: currentBranch.ObjectUUID,
              name: currentBranch.name,
              indeterminate: indeterminateBranch,
              respondents,
            },
          },
        },
      }));
    } else {
      setSelected((state) => ({
        ...state,
        [currentOrganize.ObjectUUID]: {
          ...state[currentOrganize.ObjectUUID],
          branchs: {
            ...state[currentOrganize.ObjectUUID].branchs,
            [currentBranch.ObjectUUID]: {
              ...state[currentOrganize.ObjectUUID]
                .branchs[branchId],
              indeterminate: indeterminateBranch,
              respondents,
            },
          },
        },
      }));
    }

    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (
      record: AssessmentSubmissionRespondentBranchRespondent
    ) => ({
      disabled: !record.haveApprover && isHaveApprover,
      name: record.name,
    }),
  };

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      id: 'select-respondent',
      columns,
    });

  const { debouncedSearch, onSearch } = useSearch();

  useEffect(() => {
    if (selected[organizeId]?.branchs[branchId]) {
      setSelectedRowKeys(
        selected[organizeId].branchs[branchId].respondents
          ?.filter(
            (respondent) =>
              respondent.haveApprover || !isHaveApprover
          )
          .map((item) => {
            return item.ObjectUUID;
          })
      );
    } else {
      setSelectedRowKeys([]);
    }
  }, [
    selectedBranch,
    selected,
    organizeId,
    branchId,
    isHaveApprover,
  ]);

  return (
    <>
      <Flex justify="end" gap="sm" className="mb-2">
        <InputSearch onSearch={onSearch} />
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
          {selectedRowKeys.length}/
          {FilterRespondents.length}{' '}
          <IntlMessage id="compliance.assessmentSubmission.create.respondent.items" />
        </Typography>
      </Flex>
      <Table
        className={css`
          .ant-table-thead > tr > th {
            background-color: #fafafa;
          }
        `}
        rowKey="ObjectUUID"
        columns={
          isHaveApprover
            ? filteredColumns
            : _.filter(
                filteredColumns,
                (column) => column.key !== 'approverName'
              )
        }
        dataSource={FilterRespondents?.filter((item) =>
          debouncedSearch
            ? item.name
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase())
            : true
        )}
        pagination={false}
        rowSelection={rowSelection}
        locale={{
          emptyText:
            data?.length === 0 ? (
              <>
                <Empty
                  imageStyle={{ height: 80 }}
                  description={
                    <Typography.Text>
                      ในการเลือกผู้ตอบแบบประเมินในขั้นตอนที่
                      2 กรุณาเพิ่มผู้ทำแบบประเมินใน
                      <Typography.Link href="/apps/cyberfence/assessment-automation/organization">
                        เมนูองค์กร
                      </Typography.Link>
                    </Typography.Text>
                  }
                />
              </>
            ) : undefined,
        }}
      />
    </>
  );
};
