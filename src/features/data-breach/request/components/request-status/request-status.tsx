import {
  ERROR_COLOR,
  GREEN_PRIMARY_COLOR,
  GREY_PRIMARY_COLOR,
  PROCESSING_COLOR,
  SUCCESS_COLOR,
} from '@/config/color';
import { tokens } from '@/lang';
import { ShowTagStatus } from '@components/show-tag-status';

const statusItems = [
  {
    label: tokens.common.status.open,
    key: 'opened',
    color: GREY_PRIMARY_COLOR,
  },
  {
    label: tokens.common.status.inProgress,
    key: 'inprogress',
    color: PROCESSING_COLOR,
  },
  {
    label: tokens.common.status.inProgress,
    key: 'in_progress',
    color: PROCESSING_COLOR,
  },
  {
    label: tokens.common.status.complete,
    key: 'complete',
    color: SUCCESS_COLOR,
  },
  {
    label: tokens.common.status.reject,
    key: 'reject',
    color: ERROR_COLOR,
  },
  {
    label: tokens.common.status.reject,
    key: 'Reject',
    color: ERROR_COLOR,
  },
  {
    label: tokens.common.status.close,
    key: 'closed',
    color: GREEN_PRIMARY_COLOR,
  },
  {
    label: tokens.common.status.close,
    key: 'Close',
    color: GREEN_PRIMARY_COLOR,
  },
];

export type RequestStatusProps = {
  status?: string;
};

export const RequestStatus = ({
  status,
}: RequestStatusProps) => {
  return (
    <ShowTagStatus status={status} items={statusItems} />
  );
};
