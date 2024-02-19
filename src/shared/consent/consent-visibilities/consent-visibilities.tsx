import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Collapse,
  Divider,
  Dropdown,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';

import { useConsentBuilderStore } from '@/stores/consent-builder';
import { IntlMessage } from '@utilComponents/intl-message';

import { VisibilityForm } from './components/visibility-form';

export type ConsentVisibilitiesProps = {
  usageConditions?: string[];
};

export const ConsentVisibilities = ({
  usageConditions = ['visibility'],
}: ConsentVisibilitiesProps) => {
  const [activeKey, setActiveKey] = useState<
    string[] | string | null
  >(null);

  const {
    formConditions,
    quickAddCondition,
    deleteCondition,
  } = useConsentBuilderStore();

  useEffect(() => {
    if (activeKey === null) {
      setActiveKey(formConditions.map((c) => c.id));
    }
  }, [activeKey, formConditions]);

  useEffect(() => {
    const lastCondition =
      formConditions[formConditions.length - 1];
    if (lastCondition) {
      setActiveKey([
        ...((activeKey as string[]) ?? []),
        lastCondition.id,
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formConditions]);

  const availableConditions = [
    {
      key: 'visibility',
      label: 'กฎการมองเห็น',
      onClick: () => quickAddCondition('visibility'),
    },
    {
      key: 'workflow',
      label: 'กฎการทำงาน',
      onClick: () => quickAddCondition('workflow'),
    },
  ];

  const addConditionItems = availableConditions?.filter(
    (condition) =>
      usageConditions?.includes(condition.key)
  );

  const isDefaultRule =
    usageConditions?.length === 1 &&
    usageConditions?.includes('visibility');

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <Typography.Text>
          <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.visibilityRule.configure" />
        </Typography.Text>
        <div className="mt-3">
          {isDefaultRule ? (
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() =>
                quickAddCondition('visibility')
              }
            >
              <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.visibilityRule.add" />
            </Button>
          ) : (
            <Dropdown
              menu={{
                items: addConditionItems,
              }}
            >
              <Button
                icon={<PlusOutlined />}
                type="primary"
              >
                <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.visibilityRule.add" />
              </Button>
            </Dropdown>
          )}
        </div>
        <Divider />
      </div>
      {formConditions.length > 0 ? (
        <Collapse
          activeKey={activeKey ?? []}
          onChange={(keys) => {
            if (Array.isArray(keys)) {
              setActiveKey(Array.from(new Set(keys)));
            }
          }}
        >
          {formConditions.map((visibility, index) => (
            <Collapse.Panel
              key={visibility?.id}
              header={
                visibility?.name ?? `Rule ${index + 1}`
              }
              extra={
                <DeleteOutlined
                  onClick={() =>
                    deleteCondition(visibility?.id)
                  }
                />
              }
            >
              <div className="p-3">
                <VisibilityForm visibility={visibility} />
              </div>
            </Collapse.Panel>
          ))}
        </Collapse>
      ) : null}
    </>
  );
};
