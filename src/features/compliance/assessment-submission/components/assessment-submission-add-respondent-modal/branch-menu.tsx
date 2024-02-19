import { Checkbox, Empty, Menu, MenuProps } from 'antd';
import React, {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { IntlMessage } from '@utilComponents/intl-message';

import {
  AssessmentSubmissionAllRespondent,
  Branch,
  AssessmentSubmissionRespondentBranchRespondent,
  SelectedBranch,
  SelectedRespondent,
} from '../../types';

export type BranchMenuProps = {
  data?: AssessmentSubmissionAllRespondent[];
  selected: SelectedRespondent;
  selectedBranch: SelectedBranch;
  onSelectBranch: (
    organizeIndex: number,
    organizeId: string,
    branchId: string
  ) => void;
  setSelected: Dispatch<
    SetStateAction<SelectedRespondent>
  >;
  isHaveApprover?: boolean;
};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const BranchMenu = ({
  data,
  selected,
  selectedBranch,
  setSelected,
  onSelectBranch,
  isHaveApprover,
}: BranchMenuProps) => {
  const [checkAll, setCheckAll] = useState(false);

  const isAllBranchesSelected = (
    organize: AssessmentSubmissionAllRespondent
  ) => {
    return (
      selected[organize.ObjectUUID] !== undefined &&
      Object.keys(selected[organize.ObjectUUID].branchs)
        .length === organize.branchs.length &&
      Object.values(
        selected[organize.ObjectUUID].branchs
      ).every((item) => item.indeterminate === false)
    );
  };

  const isSomeBranchesSelected = (
    organize: AssessmentSubmissionAllRespondent
  ) => {
    return (
      selected[organize.ObjectUUID] !== undefined &&
      (Object.values(
        selected[organize.ObjectUUID].branchs
      ).some((item) => item.indeterminate) ||
        Object.values(
          selected[organize.ObjectUUID].branchs
        ).length < Object.values(organize.branchs).length)
    );
  };

  const items: MenuProps['items'] = data?.map((item) =>
    getItem(
      item.name,
      item.ObjectUUID,
      <Checkbox
        className="mr-2"
        checked={isAllBranchesSelected(item)}
        indeterminate={isSomeBranchesSelected(item)}
        onClick={(e) => onSelectAll(e, item)}
      />,
      item.branchs.map((branch) =>
        getItem(
          branch.name,
          branch.ObjectUUID,
          <Checkbox
            onClick={() => selectBranch(item, branch)}
            className="mr-2"
            checked={
              selected[item.ObjectUUID]?.branchs[
                branch.ObjectUUID
              ] !== undefined
            }
            indeterminate={
              selected[item.ObjectUUID]?.branchs[
                branch.ObjectUUID
              ] !== undefined &&
              selected[item.ObjectUUID].branchs[
                branch.ObjectUUID
              ].indeterminate
            }
          />
        )
      )
    )
  );
  const onCheckedAll = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    const isChecked = target.checked;
    setCheckAll(isChecked);

    if (isChecked) {
      const allData: Record<string, unknown> = {};

      if (data) {
        for (const org of data) {
          const branchs: Record<string, unknown> = {};
          for (const branch of org.branchs) {
            branchs[branch.ObjectUUID] = {
              id: branch.ObjectUUID,
              name: branch.name,
              indeterminate: false,
              respondents: onCheckApprover(
                branch.respondents
              ),
            };
          }

          allData[org.ObjectUUID] = {
            id: org.ObjectUUID,
            name: org.name,
            branchs,
          };
        }
        setSelected(allData as SelectedRespondent);
      }
    } else {
      setSelected({});
    }
  };

  const onClick: MenuProps['onClick'] = (e) => {
    if (!data) return;

    const [branchKey, organizationKey] = e.keyPath;
    const menuIndex = data.findIndex(
      (item) => item.ObjectUUID === organizationKey
    );
    onSelectBranch(menuIndex, organizationKey, branchKey);
  };

  const onCheckApprover = (
    respondent: AssessmentSubmissionRespondentBranchRespondent[]
  ) => {
    return respondent.filter(
      (item) => item.haveApprover || !isHaveApprover
    );
  };

  const onSelectAll = async (
    e: MouseEvent<HTMLElement>,
    value: AssessmentSubmissionAllRespondent
  ) => {
    e.stopPropagation();
    if (
      selected[value.ObjectUUID] &&
      Object.keys(selected[value.ObjectUUID].branchs)
        .length === value.branchs.length &&
      Object.values(
        selected[value.ObjectUUID].branchs
      ).every((item) => item.indeterminate === false)
    ) {
      setSelected((current) => {
        const newState = { ...current };
        delete newState[value.ObjectUUID];
        return newState;
      });
    } else {
      let newData = {};
      const branchs: Record<string, unknown> = {};
      for (const item of value.branchs) {
        branchs[item.ObjectUUID] = {
          id: item.ObjectUUID,
          name: item.name,
          indeterminate: false,
          respondents: onCheckApprover(item.respondents),
        };
      }

      newData = {
        [value.ObjectUUID]: {
          id: value.ObjectUUID,
          name: value.name,
          branchs,
        },
      };

      setSelected((state) => ({ ...state, ...newData }));
      setCheckAll(
        Object.keys(selected).length === data?.length
      );
    }
  };

  const selectBranch = (
    data: AssessmentSubmissionAllRespondent,
    branch: Branch
  ) => {
    const isAllDisable = branch.respondents.every(
      (item) => !item.haveApprover
    );
    if (isAllDisable) return;

    if (
      selected[data.ObjectUUID] &&
      selected[data.ObjectUUID].branchs[branch.ObjectUUID]
    ) {
      setSelected((current) => {
        const newState = { ...current };
        delete newState[data.ObjectUUID].branchs[
          branch.ObjectUUID
        ];

        if (
          Object.keys(newState[data.ObjectUUID].branchs)
            .length === 0
        ) {
          delete newState[data.ObjectUUID];
        }

        return newState;
      });
    } else if (
      selected[data.ObjectUUID] &&
      !selected[data.ObjectUUID].branchs[
        branch.ObjectUUID
      ]
    ) {
      setSelected((current) => ({
        ...current,
        [data.ObjectUUID]: {
          ...current[data.ObjectUUID],
          branchs: {
            ...current[data.ObjectUUID].branchs,
            [branch.ObjectUUID]: {
              id: branch.ObjectUUID,
              name: branch.name,
              indeterminate: false,
              respondents: onCheckApprover(
                branch.respondents
              ),
            },
          },
        },
      }));
    } else {
      setSelected((current) => ({
        ...current,
        [data.ObjectUUID]: {
          id: data.ObjectUUID,
          name: data.name,
          branchs: {
            [branch.ObjectUUID]: {
              id: branch.ObjectUUID,
              name: branch.name,
              indeterminate: false,
              respondents: onCheckApprover(
                branch.respondents
              ),
            },
          },
        },
      }));
    }
  };

  useEffect(() => {
    setCheckAll(
      Object.keys(selected).length === data?.length
    );
  }, [setCheckAll, data, selected]);

  if (data?.length === 0) {
    return (
      <Empty className="d-flex flex-column justify-content-center" />
    );
  }

  return (
    <div className="w-100">
      <div>
        <Checkbox
          className="pl-4 my-2"
          checked={checkAll}
          onClick={onCheckedAll}
        >
          <span className="ml-2">
            <IntlMessage id="compliance.assessmentSubmission.create.respondent.all" />
          </span>
        </Checkbox>
      </div>
      <div className="mobile-nav-menu">
        <Scrollbars autoHide>
          <Menu
            mode="inline"
            defaultSelectedKeys={[
              selectedBranch?.branchId ?? '',
            ]}
            defaultOpenKeys={[
              selectedBranch?.organizeId ?? '',
            ]}
            items={items}
            onClick={onClick}
          />
        </Scrollbars>
      </div>
    </div>
  );
};
