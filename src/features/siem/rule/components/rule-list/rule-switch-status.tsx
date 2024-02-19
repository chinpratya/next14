import { Switch } from 'antd';
import { t } from 'i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useNotifications } from '@/stores/notifications';

import { useUpdateRuleStatus } from '../../api/update-rule-status';

type RuleSwitchStatusProps = {
  ruleId: string;
  enabled: boolean;
};

export const RuleSwitchStatus = ({
  enabled,
  ruleId,
}: RuleSwitchStatusProps) => {
  const { showNotification } = useNotifications();

  const { submit, isLoading } = useUpdateRuleStatus({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.updated'
        ) as string,
      });
    },
  });

  const onChange = (status: boolean) => {
    submit({
      id: ruleId,
      status: status ? 'enable' : 'disable',
    });
  };

  return (
    <Switch
      loading={isLoading}
      defaultChecked={enabled}
      checkedChildren={
        <IntlMessage id="logManagement.on" />
      }
      unCheckedChildren={
        <IntlMessage id="logManagement.off" />
      }
      onChange={(value) => onChange?.(value)}
    />
  );
};
