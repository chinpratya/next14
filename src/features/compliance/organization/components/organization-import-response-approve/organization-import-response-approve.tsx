import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import { ImportAndExportModal } from '@components/import-and-export-modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useImportRespApprOfInstitute } from '../../api/import-resp-appr-of-institute';

export type OrganizationImportResponseApproveProps = {
  organizationId: string;
  instituteId: string;
  open: boolean;
  onToggle: () => void;
};

export const OrganizationImportResponseApprove = ({
  organizationId,
  instituteId,
  open,
  onToggle,
}: OrganizationImportResponseApproveProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const { submit, isLoading } =
    useImportRespApprOfInstitute({
      organizationId,
      instituteId,
      onSuccess: () => {
        onToggle();
        showNotification({
          type: 'success',
          message: t(
            'compliance.notification.import'
          ) as string,
        });
      },
    });

  const columns = [
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.listRespondents.name" />
      ),
      dataIndex: 'respondentName',
      key: 'respondentName',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.listRespondents.department" />
      ),
      dataIndex: 'respondentDepartment',
      key: 'respondentDepartment',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.listRespondents.position" />
      ),
      dataIndex: 'respondentPosition',
      key: 'respondentPosition',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.listRespondents.email" />
      ),
      dataIndex: 'respondentEmail',
      key: 'respondentEmail',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.listRespondents.tel" />
      ),
      dataIndex: 'respondentTel',
      key: 'respondentTel',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.listRespondents.description" />
      ),
      dataIndex: 'respondentDescription',
      key: 'respondentDescription',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.listRespondents.approver" />
      ),
      dataIndex: 'approverName',
      key: 'approverName',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.listRespondents.department" />
      ),
      dataIndex: 'approverDepartment',
      key: 'approverDepartment',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.listRespondents.position" />
      ),
      dataIndex: 'approverPosition',
      key: 'approverPosition',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.listRespondents.email" />
      ),
      dataIndex: 'approverEmail',
      key: 'approverEmail',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.listRespondents.tel" />
      ),
      dataIndex: 'approverTel',
      key: 'approverTel',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="compliance.organization.detail.branch.listRespondents.description" />
      ),
      dataIndex: 'approverDescription',
      key: 'approverDescription',
      ellipsis: true,
      width: 150,
    },
  ];

  const dataSource = [
    {
      key: '39451d75-9cfb-4781-8629-5dedecf82c87',
      respondentName: 'นาย XXXXX',
      respondentDepartment: 'XXXX',
      respondentPosition: 'XXXX',
      respondentEmail: 'XXXX@example.com',
      respondentTel: 'XXXX',
      respondentDescription: 'XXXX',
      approverName: 'นาย XXXXX',
      approverDepartment: 'XXXX',
      approverPosition: 'XXXX',
      approverEmail: 'XXXX@example.com',
      approverTel: 'XXXX',
      approverDescription: 'XXXX',
    },
    {
      key: 'cf201d78-ee6f-4e0b-b35a-0fbcadaba4a1',
      respondentName: 'นาย XXXXX',
      respondentDepartment: 'XXXX',
      respondentPosition: 'XXXX',
      respondentEmail: 'XXXX@example.com',
      respondentTel: 'XXXX',
      respondentDescription: 'XXXX',
      approverName: 'นาย XXXXX',
      approverDepartment: 'XXXX',
      approverPosition: 'XXXX',
      approverEmail: 'XXXX@example.com',
      approverTel: 'XXXX',
      approverDescription: 'XXXX',
    },
  ];

  const onDownloadFile = () => {
    const link = document.createElement('a');
    link.href =
      '/downloads/import_assessment_respondents.csv';
    link.download = 'import_assessment_respondents.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ImportAndExportModal
      open={open}
      onToggle={onToggle}
      columns={columns}
      dataSource={dataSource}
      onDownloadFile={onDownloadFile}
      onUploadFile={submit}
      isLoading={isLoading}
    />
  );
};
