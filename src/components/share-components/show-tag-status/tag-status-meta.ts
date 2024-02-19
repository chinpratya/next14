import React, { ReactNode } from 'react';

import { tokens } from '@/lang';

export interface Status {
  key: string;
  label: string | React.ReactNode;
  color: string;
  icon?: ReactNode;
}

export const STATUS_ITEMS: Status[] = [
  {
    key: 'success',
    label: tokens.common.status.success,
    color: '#52c41a',
  },
  {
    key: 'error',
    label: tokens.common.status.error,
    color: '#f5222d',
  },
  {
    key: 'warning',
    label: tokens.common.status.warning,
    color: '#faad14',
  },
  {
    key: 'active',
    label: tokens.common.status.active,
    color: '#52c41a',
  },
  {
    key: 'inactive',
    label: tokens.common.status.inactive,
    color: '#f5222d',
  },
  {
    key: 'pending',
    label: tokens.common.status.pending,
    color: '#faad14',
  },
  {
    key: 'suspended',
    label: tokens.common.status.suspended,
    color: '#f5222d',
  },
  {
    key: 'deleted',
    label: tokens.common.status.deleted,
    color: '#f5222d',
  },
  {
    key: 'blocked',
    label: tokens.common.status.blocked,
    color: '#f5222d',
  },
  {
    key: 'unverified',
    label: tokens.common.status.unverified,
    color: '#faad14',
  },
  {
    key: 'publish',
    label: tokens.common.status.publish,
    color: '#52c41a',
  },
  {
    key: 'complete',
    label: tokens.common.status.complete,
    color: '#52c41a',
  },
  {
    key: 'draft',
    label: tokens.common.status.draft,
    color: '#C4C4C4',
  },
  {
    key: 'waiting',
    label: tokens.common.status.waiting,
    color: '#faad14',
  },
  {
    key: 'waiting verify',
    label: tokens.common.status.waitingVerify,
    color: '#faad14',
  },
  {
    key: 'verified',
    label: tokens.common.status.verified,
    color: '#52c41a',
  },
  {
    key: 'expired',
    label: tokens.common.status.expired,
    color: '#f5222d',
  },
  {
    key: 'disclosure',
    label: tokens.common.status.disclosure,
    color: '#04D182',
  },
  {
    key: 'usage',
    label: tokens.common.status.usage,
    color: '#3E79F7',
  },
  {
    key: 'collect',
    label: tokens.common.status.collect,
    color: '#A461D8',
  },
  {
    key: 'transfer',
    label: tokens.common.status.transfer,
    color: '#FADB14',
  },
  {
    key: 'withdraw',
    label: tokens.common.status.withdraw,
    color: '#F5222D',
  },
  {
    key: 'reject',
    label: tokens.common.status.reject,
    color: '#F5222D',
  },
  {
    key: 'approve',
    label: tokens.common.status.approve,
    color: '#52C41A',
  },
  {
    key: 'true',
    label: tokens.common.status.enable,
    color: '#04D182',
  },
  {
    key: 'false',
    label: tokens.common.status.disable,
    color: '#FF6B72',
  },
  {
    key: 'enable',
    label: tokens.common.status.enable,
    color: '#04D182',
  },
  {
    key: 'disable',
    label: tokens.common.status.disable,
    color: '#FF6B72',
  },
  {
    key: 'assigned',
    label: tokens.common.status.assigned,
    color: '#3E79F7',
  },
];
