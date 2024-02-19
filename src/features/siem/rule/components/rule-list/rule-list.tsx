import { Card, Typography } from 'antd';
import { t } from 'i18next';
import { useRouter } from 'next/router';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { usePagination, useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';

import { useDeleteRule } from '../../api/delete-rule';
import { useListRule } from '../../api/list-rule';
import { Rule } from '../../types';
import { RuleDuplicateModal } from '../rule-duplicate-modal';

import { RuleTable } from './rule-table';

type RuleListProps = {
  search?: string;
};

export const RuleList = ({ search }: RuleListProps) => {
  const router = useRouter();
  const toggle = useToggle<Rule>();
  const { showNotification } = useNotifications();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const deleteRule = useDeleteRule({
    search,
    page,
    pageSize,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.deleted'
        ) as string,
      });
      toggle.remove();
    },
  });

  const { data, isError, isLoading } = useListRule({
    search,
    page,
    pageSize,
  });

  const onEdit = (ruleId: string) =>
    router.push(`${router.pathname}/${ruleId}`);

  const totalRecord =
    (data?.meta?.total_page || 1) * pageSize;

  return (
    <FallbackError isError={isError}>
      <Card>
        <RuleTable
          dataSource={data?.data ?? []}
          isLoading={isLoading}
          onEdit={onEdit}
          onDelete={toggle.remove}
          onDuplicate={toggle.duplicate}
        />
        <Pagination
          current={page}
          total={totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <DeleteModal
          title={
            <IntlMessage id="siem.detectionRule.deleteActionHeader" />
          }
          content={
            <>
              <Typography className="text-gray">
                <IntlMessage id="siem.detectionRule.deleteActionText" />
              </Typography>
              <Typography className="text-gray mt-2">
                <IntlMessage id="siem.detectionRule.deleteActionTextCondition" />
              </Typography>
            </>
          }
          identifier={toggle.data?.name as string}
          open={toggle.openRemove}
          okText={
            <IntlMessage id="siem.detectionRule.siemDelete" />
          }
          cancelText={
            <IntlMessage id="siem.detectionRule.siemDeleteCancel" />
          }
          onCancel={() => toggle.remove()}
          onDelete={() =>
            deleteRule.submit(toggle.data?.id as string)
          }
        />
        <RuleDuplicateModal
          rule={toggle.data}
          open={toggle.openDuplicate}
          onCancel={toggle.duplicate}
        />
      </Card>
    </FallbackError>
  );
};
