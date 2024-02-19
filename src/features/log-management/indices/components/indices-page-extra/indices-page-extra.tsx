import { FormInstance } from 'antd';

import { IndiceDetail } from '../../types';
import { IndicesLogForwardingExtra } from '../indices-log-forwarding/indices-log-forwarding-extra';
// import { IndicesNotificationConditionExtra } from '../indices-notification-condition-list/indices-notification-condition-extra';

import { InfoExtra } from './info-extra';

type IndicesPageExtraProps = {
  form: FormInstance;
  data?: IndiceDetail;
  currentTab: string;
  isUpdate?: boolean;
  isCreate?: boolean;
};

export const IndicesPageExtra = ({
  form,
  data,
  currentTab,
  isUpdate,
  isCreate,
}: IndicesPageExtraProps) => {
  if (currentTab === 'info') {
    return (
      <>
        {isUpdate && (
          <InfoExtra form={form} data={data} />
        )}
      </>
    );
  } else if (currentTab === 'forwarding') {
    {
      return (
        <>{isCreate && <IndicesLogForwardingExtra />}</>
      );
    }
  }
  // else if (currentTab === 'notification') {
  //   return <IndicesNotificationConditionExtra />;
  // }

  return null;
};
