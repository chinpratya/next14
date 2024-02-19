import {
  CaretDownOutlined,
  CaretUpOutlined,
  CloseOutlined,
  HolderOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { useDebouncedState } from '@mantine/hooks';
import { Card } from 'antd';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import {
  WHITE_COLOR,
  WHITE_SECONDARY_COLOR,
} from '@/config/color';
import { usePolicyBuilderStore } from '@/stores/policy-builder';
import { PolicyBuilderSection } from '@/types/policy-builder';

const CkEditor = dynamic(
  () => import('@utilComponents/ck-editor'),
  {
    ssr: false,
  }
);

export type PolicyBuilderFormItemProps = {
  policySection: PolicyBuilderSection;
  index: number;
};

export const PolicyBuilderFormItem = ({
  policySection,
  index,
}: PolicyBuilderFormItemProps) => {
  const [value, setValue] = useDebouncedState<
    string | null
  >(null, 1000);

  const {
    policySections,
    onMoveUpPolicySection,
    onMoveDownPolicySection,
    onToggleSettingPolicySection,
    onToggleHidePolicySection,
    onChangePolicySectionValue,
  } = usePolicyBuilderStore();

  useEffect(() => {
    if (value) {
      onChangePolicySectionValue(
        policySection.key,
        value
      );
    }
  }, [
    onChangePolicySectionValue,
    policySection.key,
    value,
  ]);

  return (
    <Card
      className={css`
        .ant-card-head {
          background-color: ${WHITE_SECONDARY_COLOR};
          padding-bottom: 12px;
        }

        .ant-card-body {
          padding: 0;

          .ck-toolbar {
            background-color: ${WHITE_COLOR} !important;
            border-top: 1px solid #e8e8e8 !important;
            border-right: none !important;
            border-left: none !important;
            border-bottom: 1px solid #e8e8e8 !important;
            border-radius: 0 !important;
          }

          .ck-content {
            border: none !important;
            border-bottom-left-radius: 0.625rem !important;
            border-bottom-right-radius: 0.625rem !important;
          }
        }
      `}
      title={
        <>
          <HolderOutlined className="mr-2 text-gray-light" />
          {policySection?.name as string}
        </>
      }
      extra={
        <div>
          <CaretUpOutlined
            className="ml-2"
            hidden={index === 0}
            onClick={() =>
              onMoveUpPolicySection(policySection?.key)
            }
          />
          <CaretDownOutlined
            className="ml-2"
            hidden={index === policySections.length - 1}
            onClick={() =>
              onMoveDownPolicySection(policySection?.key)
            }
          />
          <SettingOutlined
            className="ml-2"
            onClick={() =>
              onToggleSettingPolicySection(
                policySection?.key
              )
            }
          />
          <CloseOutlined
            className="ml-2"
            onClick={() =>
              onToggleHidePolicySection(
                policySection?.key
              )
            }
          />
        </div>
      }
    >
      <CkEditor
        value={policySection?.value ?? ''}
        onChange={(value) => setValue(value)}
      />
    </Card>
  );
};
