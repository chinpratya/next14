import { Card, Col, Row, Steps } from 'antd';

import { getColLayout } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { UserTableSelect } from '../../../../admin';
import {
  WorkflowGeneralData,
  WorkflowGeneralDataProps,
} from '../workflow-general-data';

export type WorkflowCreateProps =
  WorkflowGeneralDataProps & {
    current?: number;
    selectUsers?: string[];
    onSelectUsers?: (selectedRowKeys: string[]) => void;
  };

const steps = [
  {
    title: (
      <IntlMessage id="dsarAutomation.setting.workflow.basicInfo.general" />
    ),
  },
  {
    title: (
      <IntlMessage id="dsarAutomation.setting.workflow.basicInfo.user" />
    ),
  },
];

export const WorkflowCreate = ({
  current,
  form,
  selectUsers,
  onSelectUsers,
}: WorkflowCreateProps) => {
  const stepRender = (current: number) => {
    return {
      0: <WorkflowGeneralData form={form} />,
      1: (
        <UserTableSelect
          selectedRowKeys={selectUsers}
          onSelect={onSelectUsers}
        />
      ),
    }[current];
  };

  return (
    <>
      <Card>
        <Row justify="center" className="pt-2 pb-2">
          <Col {...getColLayout(14)}>
            <Steps current={current ?? 0} items={steps} />
          </Col>
        </Row>
      </Card>
      <Card>
        <Row justify="center">
          <Col {...getColLayout(14)}>
            {stepRender(current ?? 0)}
          </Col>
        </Row>
      </Card>
    </>
  );
};
