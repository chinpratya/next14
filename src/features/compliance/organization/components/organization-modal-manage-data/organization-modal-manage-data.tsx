import { Form } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RcFile } from 'antd/lib/upload';

import { useNotifications } from '@/stores/notifications';
import { ImportAndExportModal } from '@components/import-and-export-modal';
import { IntlMessage } from '@utilComponents/intl-message';
import { FileUtils } from '@/utils';

import { useImportOrganization } from '../../api/import-organization';
import { createOrganizationPayload } from '../../types';

export type ModalManageDatatype = {
  open: boolean;
  onToggle: () => void;
};

export const ModalManageData = ({
  open,
  onToggle,
}: ModalManageDatatype) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const [datafile, setDataFile] = useState<
    createOrganizationPayload[]
  >([]);

  const { submit, isLoading } = useImportOrganization({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'compliance.notification.import'
        ) as string,
      });
      // form.resetFields();
      // setDataFile([]);
      onToggle();
    },
  });

  const onSubmit = async (file: RcFile) => {
    form.validateFields();
    const formData = new FormData();
    const base64 = await FileUtils.convertRcFileBase64(
      file
    );

    const blob = await FileUtils.convertBase64ToBlob(
      base64
    );
    formData.append('file', blob, file.name);

    submit(formData);
  };

  const columns = [
    {
      title: (
        <IntlMessage id="compliance.organization.name" />
      ),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: (
        <IntlMessage id="compliance.organization.orgGroup" />
      ),
      dataIndex: 'typeOrg',
      key: 'typeOrg',
    },
    {
      title: (
        <IntlMessage id="compliance.organization.industryGroup" />
      ),
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: (
        <IntlMessage id="compliance.organization.businessCategory" />
      ),
      dataIndex: 'bussi',
      key: 'bussi',
    },
  ];

  const dataSource = [
    {
      name: 'บริษัท XXXX จำกัด',
      typeOrg: 'XXXX',
      group: 'XXXX',
      bussi: 'XXXX',
    },
  ];

  const onDownloadFile = () => {
    const link = document.createElement('a');
    link.href = '/downloads/import_organization.csv';
    link.download = 'import_organization.csv';
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
      onUploadFile={onSubmit}
      isLoading={isLoading}
    />
  );
};
