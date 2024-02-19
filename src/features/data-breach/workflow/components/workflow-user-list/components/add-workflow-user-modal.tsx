import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UserTableSelect } from '@/features/admin';
import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useAddWorkflowUser } from '../../../api/add-workflow-user';

export type AddWorkflowUserModalProps = {
  workflowId: string;
  alreadySelectedUserIds?: string[];
  open?: boolean;
  onClose?: () => void;
};

export const AddWorkflowUserModal = ({
  workflowId,
  alreadySelectedUserIds,
  open,
  onClose,
}: AddWorkflowUserModalProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const [selectedUser, setSelectedUser] = useState<
    string[]
  >([]);

  const { submit, isLoading } = useAddWorkflowUser({
    workflowId,
    onSuccess: () => {
      onClose?.();
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.responsePlan.notifications
            .addUser
        ) as string,
      });
    },
  });

  const handleAddUser = () => {
    submit(selectedUser);
  };

  const handleSelectUser = (userIds: string[]) => {
    setSelectedUser(userIds);
  };

  return (
    <Modal
      title={
        <IntlMessage
          id={tokens.dataBreach.responsePlan.selectUser}
        />
      }
      open={open}
      onCancel={onClose}
      onOk={handleAddUser}
      okButtonProps={{
        loading: isLoading,
        disabled: selectedUser.length === 0,
      }}
      destroyOnClose
      afterClose={() => setSelectedUser([])}
    >
      <UserTableSelect
        selectedRowKeys={selectedUser}
        onSelect={handleSelectUser}
        disabledRowKeys={alreadySelectedUserIds}
      />
    </Modal>
  );
};
