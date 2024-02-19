import { Typography } from 'antd';

import { ConsentPolicyType } from '@/types';

export type ConsentBuilderPolicyProps = {
  policy: ConsentPolicyType;
};

export const ConsentBuilderPolicy = ({
  policy,
}: ConsentBuilderPolicyProps) => {
  return (
    <Typography.Title
      level={4}
      className="font-weight-bold"
    >
      <Typography.Link
        href={`https://${policy.policyLink}`}
        target="_blank"
      >
        {policy.policyName}
      </Typography.Link>
    </Typography.Title>
  );
};
