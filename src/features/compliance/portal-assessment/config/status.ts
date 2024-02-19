import {
  GREY_PRIMARY_COLOR,
  PENDING_COLOR,
  PROCESSING_COLOR,
  RED_PRIMARY_COLOR,
  SUCCESS_COLOR,
  GREEN_PRIMARY_COLOR,
} from '@/config/color';
import { tokens } from '@/lang';
import { ShowTagStatusProps } from '@components/show-tag-status';

export const STATUS_ITEMS: ShowTagStatusProps['items'] = [
  {
    key: 'in_progress',
    label: tokens.common.status.processing,
    color: PROCESSING_COLOR,
  },
  {
    key: 'waiting_progress',
    label: tokens.common.status.pending,
    color: GREY_PRIMARY_COLOR,
  },
  {
    key: 'draft',
    label: tokens.common.status.draft,
    color: GREY_PRIMARY_COLOR,
  },
  {
    key: 'wait_send',
    label: tokens.common.status.waitingSend,
    color: PENDING_COLOR,
  },
  {
    key: 'waiting_update',
    label: tokens.common.status.waitingUpdate,
    color: PENDING_COLOR,
  },
  {
    key: 'approve',
    label: tokens.common.status.approved,
    color: SUCCESS_COLOR,
  },
  {
    key: 'ready_to_send',
    label: tokens.common.status.readySend,
    color: GREEN_PRIMARY_COLOR,
  },
  {
    key: 'success',
    label: tokens.common.status.done,
    color: SUCCESS_COLOR,
  },
  {
    key: 'waiting_approve',
    label: tokens.common.status.waitingApprove,
    color: PENDING_COLOR,
  },
  {
    key: 'reject',
    label: tokens.common.status.reject,
    color: RED_PRIMARY_COLOR,
  },
  {
    key: 'in_progress_approve',
    label: tokens.common.status.inProgressApprove,
    color: PENDING_COLOR,
  },
  {
    key: 'overdue',
    label: tokens.common.status.overdue,
    color: RED_PRIMARY_COLOR,
  },
];
