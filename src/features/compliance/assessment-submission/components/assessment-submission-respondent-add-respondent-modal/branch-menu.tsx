import { css } from '@emotion/css';
import { Checkbox, Empty, Menu, MenuProps } from 'antd';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
} from 'react';
import Scrollbars from 'react-custom-scrollbars';

import {
  AssessmentSubmissionAllRespondent,
  AssessmentSubmissionRespondentBranchRespondent,
  Branch,
} from '../../types';

export type OrganizationMenuProps = {
  navigation: { organization: string; branch: string };
  allRespondent?: AssessmentSubmissionAllRespondent[];
  selectedRespondent: Selected;
  setSelectedRespondent: Dispatch<
    SetStateAction<Selected>
  >;
  onChangeNavigation: (value: {
    organization: string;
    branch: string;
  }) => void;
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
  navigation,
  allRespondent,
  selectedRespondent,
  onChangeNavigation,
  setSelectedRespondent,
}: OrganizationMenuProps) => {
  const onSelectOrg = (
    e: MouseEvent<HTMLElement>,
    value: AssessmentSubmissionAllRespondent
  ) => {
    e.stopPropagation();
    const { ObjectUUID: orgId } = value;

    if (
      selectedRespondent[orgId] &&
      Object.keys(selectedRespondent[orgId].branchs)
        .length === value.branchs.length &&
      Object.values(
        selectedRespondent[orgId].branchs
      ).every((item) => item.indeterminate === false)
    ) {
      setSelectedRespondent((current) => {
        const newState = { ...current };
        delete newState[orgId];
        return newState;
      });

      return;
    }

    let newData = {};
    const branchs: Record<string, unknown> = {};
    for (const {
      ObjectUUID,
      respondents,
    } of value.branchs) {
      branchs[ObjectUUID] = {
        branchId: ObjectUUID,
        indeterminate: false,
        repondentsId:
          onGetRespondentOfBranch(respondents),
      };
    }

    newData = {
      [orgId]: { id: orgId, branchs },
    };

    setSelectedRespondent((state) => ({
      ...state,
      ...newData,
    }));
  };

  const onGetRespondentOfBranch = (
    respondent: AssessmentSubmissionRespondentBranchRespondent[]
  ) => {
    return respondent
      .filter((item) => item.haveApprover)
      .map((item) => item.ObjectUUID);
  };

  const onSelectBranch = (
    organization: string,
    branch: Branch
  ) => {
    const isAllDisable = branch.respondents.every(
      (item) => !item.haveApprover
    );
    if (isAllDisable) return;

    const currentOrg = selectedRespondent[organization];
    const currentBranch =
      currentOrg?.branchs[branch.ObjectUUID];

    if (currentOrg && currentBranch) {
      setSelectedRespondent((current) => {
        const newState = { ...current };
        delete newState[organization].branchs[
          branch.ObjectUUID
        ];

        if (
          Object.keys(newState[organization].branchs)
            .length === 0
        ) {
          delete newState[organization];
        }
        return newState;
      });
    } else if (currentOrg && !currentBranch) {
      setSelectedRespondent((current) => ({
        ...current,
        [organization]: {
          ...current[organization],
          branchs: {
            ...current[organization].branchs,
            [branch.ObjectUUID]: {
              branchId: branch.ObjectUUID,
              indeterminate: false,
              repondentsId: onGetRespondentOfBranch(
                branch.respondents
              ),
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
            [branch.ObjectUUID]: {
              branchId: branch.ObjectUUID,
              indeterminate: false,
              repondentsId: onGetRespondentOfBranch(
                branch.respondents
              ),
            },
          },
        },
      }));
    }
  };

  const isCheckedOrganization = (
    organization: AssessmentSubmissionAllRespondent
  ) => {
    const { ObjectUUID, branchs } = organization;
    return (
      selectedRespondent[ObjectUUID] !== undefined &&
      Object.keys(selectedRespondent[ObjectUUID].branchs)
        .length === branchs.length &&
      Object.values(
        selectedRespondent[ObjectUUID].branchs
      ).every((item) => item.indeterminate === false)
    );
  };

  const isIndeterminate = (
    organization: AssessmentSubmissionAllRespondent
  ) => {
    const { ObjectUUID, branchs } = organization;
    return (
      selectedRespondent[ObjectUUID] !== undefined &&
      (Object.values(
        selectedRespondent[ObjectUUID].branchs
      ).some((item) => item.indeterminate) ||
        Object.values(
          selectedRespondent[ObjectUUID].branchs
        ).length < Object.values(branchs).length)
    );
  };

  const items: MenuProps['items'] = allRespondent
    ?.filter((item) => item.branchs.length > 0)
    .map((item) =>
      getItem(
        item.name,
        item.ObjectUUID,
        <Checkbox
          checked={isCheckedOrganization(item)}
          indeterminate={isIndeterminate(item)}
          className="mr-2"
          onClick={(e) => onSelectOrg(e, item)}
        />,
        item.branchs
          .filter(
            (branch) => branch.respondents.length > 0
          )
          .map((branch) =>
            getItem(
              branch.name,
              branch.ObjectUUID,
              <Checkbox
                indeterminate={
                  selectedRespondent[item.ObjectUUID]
                    ?.branchs[branch.ObjectUUID] !==
                    undefined &&
                  selectedRespondent[item.ObjectUUID]
                    .branchs[branch.ObjectUUID]
                    .indeterminate
                }
                className="mr-2"
                onClick={() =>
                  onSelectBranch(item.ObjectUUID, branch)
                }
                checked={
                  selectedRespondent[item.ObjectUUID]
                    ?.branchs[branch.ObjectUUID] !==
                  undefined
                }
              />
            )
          )
      )
    );

  if (allRespondent?.length === 0)
    return (
      <Empty className="d-flex flex-column justify-content-center" />
    );

  return (
    <div className="w-100">
      <div className="mobile-nav-menu">
        <Scrollbars autoHide>
          <Menu
            className={css`
              margin-top: 8px;
              user-select: none;
            `}
            mode="inline"
            items={items}
            defaultOpenKeys={[navigation.organization]}
            defaultSelectedKeys={[navigation.branch]}
            onClick={({ keyPath }) =>
              onChangeNavigation({
                organization: keyPath[1],
                branch: keyPath[0],
              })
            }
          />
        </Scrollbars>
      </div>
    </div>
  );
};
