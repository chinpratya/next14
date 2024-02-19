import { PolicyBuilderSection } from '@/types/policy-builder';

export type PolicyBuilderStore = {
  resetPolicyBuilderState: () => void;
};

export type PolicySectionsSlice = {
  isHideAllPolicySections: boolean;
  isShowSettingPolicySection: boolean;
  policySectionData: PolicyBuilderSection | null;
  policySections: PolicyBuilderSection[];
  initPolicySections: (
    policySections: PolicyBuilderSection[]
  ) => void;
  onDropPolicySection: (
    sectionId: string,
    destinationIndex: number
  ) => void;
  onMoveUpPolicySection: (sectionId: string) => void;
  onMoveDownPolicySection: (sectionId: string) => void;
  onToggleHidePolicySection: (sectionId: string) => void;
  onToggleSettingPolicySection: (
    sectionId?: string
  ) => void;
  onChangePolicySectionData: (
    data: PolicyBuilderSection
  ) => void;
  onChangePolicySectionValue: (
    sectionId: string,
    value: string
  ) => void;
};
