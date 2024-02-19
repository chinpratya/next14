import { Button, FormInstance } from 'antd';
import { t } from 'i18next';
import { useRouter } from 'next/router';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useNotifications } from '@/stores/notifications';

import { useUpdateIndiceDetail } from '../../api/update-indice';
import { IndiceDetail } from '../../types';

export type InfoExtraProps = {
  form: FormInstance;
  data?: IndiceDetail;
};

export const InfoExtra = ({
  form,
  data,
}: InfoExtraProps) => {
  const router = useRouter();
  const indiceId = router.query.indiceId as string;
  const isEditor = router.query?.edit === 'true';

  const { showNotification } = useNotifications();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'logManagement.notification.updated'
      ) as string,
    });
  };

  const update = useUpdateIndiceDetail({
    indiceId,
    onSuccess,
  });

  const onSaveIndice = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    // const { unit, total } = values;

    // // const storage =
    // //   unit === 'TB'
    // //     ? total * 1024
    // //     : unit === 'MB'
    // //     ? total / 1024
    // //     : total;

    const payload = {
      name: values.name,
      description: values.description,
      retention: values.retention,
      notify: values.notify,
      module: 'LM',
      storage: data?.storage,
    };

    update.submit(payload);
  };

  return (
    <>
      {isEditor ? (
        <Button
          type="primary"
          loading={update.isLoading}
          onClick={onSaveIndice}
        >
          <IntlMessage id="logManagement.update" />
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={() => {
            router.query.edit = 'true';
            router.push(router);
          }}
        >
          <IntlMessage id="logManagement.edit" />
        </Button>
      )}
    </>
  );
};
