import { useSetState } from '@mantine/hooks';
import _ from 'lodash';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { InnerAppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';

import { useListFile } from '../../../../shared';
import { useListIcon } from '../../../share';
import { useUpdateMaturityModel } from '../../api/update-maturity-model';
import { MaturityModelDetail } from '../../types';

import { MaturityModelManageDetailModalMainContent } from './maturity-model-manage-detail-modal-main-content';
import { MaturityModelManageDetailModalSideContent } from './maturity-model-manage-detail-modal-side-content';

export type MaturityModelManageDetailModalProps = {
  open?: boolean;
  maturityModelId: string;
  maturityModels?: MaturityModelDetail[];
  onCancel?: () => void;
};

type MaturityModelManageDetailModalState = {
  selectedKey?: string;
  maturityModels: MaturityModelDetail[];
};

export const MaturityModelManageDetailModal = ({
  open,
  onCancel,
  maturityModelId,
  maturityModels,
}: MaturityModelManageDetailModalProps) => {
  const { showNotification } = useNotifications();
  const { data: icons } = useListIcon();
  const { data: files } = useListFile({
    module: 'assessment-automation',
    group: 'maturity-model',
  });

  const [state, setState] =
    useSetState<MaturityModelManageDetailModalState>({
      selectedKey: '',
      maturityModels: [],
    });

  const updateMaturityModel = useUpdateMaturityModel({
    maturityModelId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'บันทึกข้อมูลสำเร็จ',
      });
      onCancel?.();
    },
  });

  const onSelectedKeyChange = (key: string) => {
    setState({ selectedKey: key });
  };

  const onRemoveMaturityModel = (key: string) => {
    const keyIndex =
      state.maturityModels?.findIndex(
        (m) => m.ObjectUUID === key
      ) ?? 0;
    if (keyIndex !== -1) {
      const newSelectedKey =
        keyIndex === 0
          ? state.maturityModels?.[1]?.ObjectUUID
          : state.maturityModels?.[keyIndex - 1]
              ?.ObjectUUID;
      setState({
        selectedKey: newSelectedKey,
        maturityModels: state.maturityModels?.filter(
          (m) => m.ObjectUUID !== key
        ),
      });
    }
  };

  const onAddMaturityModel = () => {
    const icon = _.find(files, {
      key: icons?.[0]?.fileID,
    });
    const newMaturityModel: MaturityModelDetail = {
      ObjectUUID: uuid(),
      columnName: 'untitled',
      columnDetail: 'detail',
      icon: icon?.url ?? '',
      description: '',
    };
    setState({
      selectedKey: newMaturityModel.ObjectUUID,
      maturityModels: [
        ...(state?.maturityModels ?? []),
        newMaturityModel,
      ],
    });
  };

  const onMaturityModelChange = (
    maturityModel: Record<string, unknown>
  ) => {
    const maturityModels = [
      ...(state.maturityModels ?? []),
    ];
    const index = maturityModels.findIndex(
      (m) => m.ObjectUUID === state.selectedKey
    );
    if (index !== -1) {
      maturityModels[index] = {
        ...maturityModels[index],
        ...maturityModel,
      };
      setState({ maturityModels });
    }
  };

  const sideContent = (
    <MaturityModelManageDetailModalSideContent
      selectedKey={state.selectedKey}
      onSelect={onSelectedKeyChange}
      maturityModels={state.maturityModels}
      onAddColumn={onAddMaturityModel}
      onRemoveColumn={onRemoveMaturityModel}
    />
  );

  const mainContent = (
    <MaturityModelManageDetailModalMainContent
      maturityModel={state.maturityModels?.find(
        (m) => m.ObjectUUID === state.selectedKey
      )}
      onChange={onMaturityModelChange}
    />
  );

  useEffect(() => {
    if (open) {
      if (maturityModels?.length && !state.selectedKey) {
        setState({
          selectedKey: maturityModels[0].ObjectUUID,
        });
        setState({ maturityModels });
      }
    }
    if (!open) {
      setState({
        selectedKey: '',
        maturityModels: [],
      });
    }
  }, [open, maturityModels, setState, state.selectedKey]);

  return (
    <Modal
      title="เพิ่มรายละเอียด Maturity Model"
      open={open}
      onCancel={onCancel}
      width="75vw"
      bodyPadding={0}
      onOk={() =>
        updateMaturityModel.submit(state.maturityModels)
      }
      okButtonProps={{
        loading: updateMaturityModel.isLoading,
      }}
    >
      <InnerAppLayout
        border
        sideContentWidth={350}
        sideContent={sideContent}
        mainContent={mainContent}
      />
    </Modal>
  );
};
