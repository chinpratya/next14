import {
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Card, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import { usePermission, useToggle } from '@/hooks';
import { permissions } from '@/permissions';
import { useConsentBuilderStore } from '@/stores/consent-builder';
import { useNotifications } from '@/stores/notifications';
import { ConsentFormType } from '@/types';
import { DeleteModal } from '@components/delete-modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteWebformActivity } from '../../api/delete-webform-activity';
import { useGetWebformTemplate } from '../../api/get-webform-template';
import { useListWebformActivity } from '../../api/list-webform-activity';
import { WebFormActivity } from '../../types';

import { ModalAddProcessingActivities } from './modal-add-processing-activities';

export type WebformBasicInfoProcessingActivitiesProps = {
  webformId: string;
};
export const WebformBasicInfoProcessingActivities = ({
  webformId,
}: WebformBasicInfoProcessingActivitiesProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { showNotification } = useNotifications();

  const { formItems, formConditions, formSetting } =
    useConsentBuilderStore();

  const webformTemplate =
    useGetWebformTemplate(webformId);

  const { data, isError, isLoading } =
    useListWebformActivity({
      webformId,
    });

  const editPermission = usePermission({
    moduleName: 'dsar',
    policies: [
      permissions['pdpakit:dsar:webform:update'],
    ],
  });

  const deleteActivity = useDeleteWebformActivity({
    webformId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.webForm.activityProcessing.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const columns: ColumnsType<WebFormActivity> = [
    {
      title: (
        <IntlMessage id="dsarAutomation.setting.webForm.detail.basicInfo.activity.name" />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.setting.webForm.detail.basicInfo.activity.group" />
      ),
      key: 'groupName',
      dataIndex: 'groupName',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.setting.webForm.detail.basicInfo.activity.tag" />
      ),
      key: 'tagName',
      dataIndex: 'tagName',
      width: 100,
      render: (tagName: string[]) =>
        tagName?.map((tag: string) => (
          <Tag className="mx-1 my-1" key={tag}>
            {tag}
          </Tag>
        )),
    },
    {
      key: 'action',
      width: 50,
      render: (data: WebFormActivity) => (
        <DeleteOutlined
          className="cursor-pointer"
          onClick={() => toggle.remove(data)}
        />
      ),
    },
  ];

  const disableKey =
    data?.data.map((data) => data.ObjectUUID) ?? [];

  const onDelete = () => {
    deleteActivity.submit({
      activityId: toggle.data?.ObjectUUID as string,
      formLanguage: webformTemplate?.data?.Language,
      form: {
        formItems: formItems ?? [],
        formConditions,
        formSetting,
      } as ConsentFormType,
    });
  };

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="dsarAutomation.setting.webForm.detail.basicInfo.activity.title" />
        }
        extra={
          <Button
            icon={<PlusOutlined />}
            type="link"
            onClick={() => toggle.create()}
            disabled={!editPermission.isAllow}
          >
            <IntlMessage id="dsarAutomation.setting.webForm.detail.basicInfo.activity.add" />
          </Button>
        }
      >
        <Table
          rowKey="ObjectUUID"
          columns={columns}
          tableLayout="fixed"
          scroll={{ x: 300 }}
          dataSource={data?.data ?? []}
          loading={isLoading}
        />
        <ModalAddProcessingActivities
          open={toggle.openCreate}
          onCancel={() => toggle.create()}
          webformId={webformId}
          disableKey={disableKey}
        />
        <DeleteModal
          open={toggle.openRemove}
          identifier={toggle.data?.name as string}
          loading={deleteActivity.isLoading}
          onCancel={() => toggle.remove()}
          onDelete={onDelete}
        />
      </Card>
    </FallbackError>
  );
};
