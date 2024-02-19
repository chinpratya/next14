import { Card, Col, Row, Steps } from 'antd';

import { tokens } from '@/lang';
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
      <IntlMessage
        id={tokens.dataBreach.responsePlan.general}
      />
    ),
  },
  {
    title: (
      <IntlMessage
        id={tokens.dataBreach.responsePlan.user}
      />
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
          <Col {...getColLayout(12)}>
            <Steps current={current ?? 0} items={steps} />
          </Col>
        </Row>
      </Card>
      <Card>
        <Row justify="center">
          <Col {...getColLayout(12)}>
            {stepRender(current ?? 0)}
          </Col>
        </Row>
      </Card>
    </>
  );
};
