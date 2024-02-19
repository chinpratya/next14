import {
  DownloadOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Button,
  Dropdown,
  Form,
  FormInstance,
} from 'antd';
import { Dayjs } from 'dayjs';
import { t } from 'i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';

import { useCreateScheduler } from '../../api/create-scheduler';
import { useDownloadReport } from '../../api/download-report';
import { ReportSchedulersSettingModal } from '../report-schedulers-setting-modal';

type ReportExtraProps = {
  tab: string;
  form: FormInstance;
};

export const ReportExtra = ({
  tab,
  form: filterForm,
}: ReportExtraProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const toggle = useToggle();

  const createScheduler = useCreateScheduler({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.created'
        ) as string,
      });
      toggle.create();
    },
  });

  const downloadReport = useDownloadReport({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'logManagement.notification.downloaded'
        ) as string,
      });
    },
  });

  const onExport = () => {
    const { hostname, indices, timestamp } =
      filterForm.getFieldsValue();

    const from = (timestamp[0] as Dayjs)
      .add(7, 'h')
      .toISOString();
    const to = (timestamp[1] as Dayjs)
      .add(7, 'h')
      .toISOString();

    downloadReport.submit({
      type: 'pdf',
      module: 'SIEM',
      report_type: 'report',
      filter: {
        indices: indices ? [indices] : [],
        hosts: (hostname as string[]).some(
          (item) => item === ''
        )
          ? []
          : hostname,
        from,
        to,
        type: 'all',
        limit: 10,
      },
    });
  };

  const onCreateScheduler = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const payload = {
      ...values,
      module: 'SIEM',
      filter: {
        type: 'all',
        limit: 10,
      },
    };
    createScheduler.submit(payload);
  };

  switch (tab) {
    case 'index':
      return (
        <Dropdown
          menu={{
            items: [{ label: 'PDF', key: 'PDF' }],
            onClick: () => onExport(),
          }}
          trigger={['click']}
          overlayClassName={css`
            .ant-dropdown-menu-item:hover {
              background: #fff;
            }
          `}
        >
          <Button loading={downloadReport.isLoading}>
            <DownloadOutlined className="mr-2" />
            <IntlMessage id="siem.reportSummary.downloadReport" />
          </Button>
        </Dropdown>
      );
    case 'scheduler':
      return (
        <>
          <PermissionWrapper
            moduleName="siem"
            policies={[
              permissions['cyber:siem:report:create'],
            ]}
          >
            <Button
              type="primary"
              onClick={toggle.create}
            >
              <PlusOutlined className="mr-2" />
              <IntlMessage id="logManagement.create" />
            </Button>
          </PermissionWrapper>

          <ReportSchedulersSettingModal
            form={form}
            loading={createScheduler.isLoading}
            open={toggle.openCreate}
            onCancel={toggle.create}
            onSubmit={onCreateScheduler}
          />
        </>
      );
    default:
      return <></>;
  }
};
