import { useSetState } from '@mantine/hooks';

import { ANY } from '@/types';

export type UseToggleState<T> = {
  openCreate: boolean;
  openEdit: boolean;
  openRemove: boolean;
  openPreview: boolean;
  openDuplicate: boolean;
  openReset: boolean;
  openFilter: boolean;
  openImport: boolean;
  openChoose: boolean;
  openManage: boolean;
  openChange: boolean;
  openPublish: boolean;
  openGetScript: boolean;
  openReject: boolean;
  openSend: boolean;
  openClosed: boolean;
  data?: T | ANY;
};

export const useToggle = <T extends object>() => {
  const initialState: UseToggleState<T> = {
    openCreate: false,
    openEdit: false,
    openRemove: false,
    openPreview: false,
    openDuplicate: false,
    openReset: false,
    openFilter: false,
    openImport: false,
    openChoose: false,
    openManage: false,
    openChange: false,
    openPublish: false,
    openGetScript: false,
    openReject: false,
    openSend: false,
    openClosed: false,
    data: undefined,
  };

  const [state, setState] =
    useSetState<UseToggleState<T>>(initialState);

  const create = (data?: T | ANY) =>
    setState({ openCreate: !state.openCreate, data });
  const edit = (data?: T | Record<string, unknown>) =>
    setState({ openEdit: !state.openEdit, data });
  const remove = (data?: T | Record<string, unknown>) =>
    setState({ openRemove: !state.openRemove, data });
  const preview = (data?: T | Record<string, unknown>) =>
    setState({ openPreview: !state.openPreview, data });
  const duplicate = (
    data?: T | Record<string, unknown>
  ) =>
    setState({
      openDuplicate: !state.openDuplicate,
      data,
    });
  const reset = (data?: T | Record<string, unknown>) =>
    setState({ openReset: !state.openReset, data });
  const filter = (data?: T | Record<string, unknown>) =>
    setState({ openFilter: !state.openFilter, data });
  const importData = (
    data?: T | Record<string, unknown>
  ) => setState({ openImport: !state.openImport, data });
  const choose = (data?: T | Record<string, unknown>) =>
    setState({ openChoose: !state.openChoose, data });

  const manage = (data?: T | Record<string, unknown>) =>
    setState({ openManage: !state.openManage, data });
  const change = (data?: T | Record<string, unknown>) =>
    setState({ openChange: !state.openChange, data });
  const publish = (data?: T | Record<string, unknown>) =>
    setState({ openPublish: !state.openPublish, data });
  const getScript = (
    data?: T | Record<string, unknown>
  ) =>
    setState({
      openGetScript: !state.openGetScript,
      data,
    });
  const reject = (data?: T | Record<string, unknown>) =>
    setState({
      openReject: !state.openReject,
      data,
    });
  const send = (data?: T | Record<string, unknown>) =>
    setState({
      openSend: !state.openSend,
      data,
    });

  const closed = (data?: T | Record<string, unknown>) =>
    setState({ openClosed: !state.openClosed, data });

  const resetAll = () => setState(initialState);

  return {
    ...state,
    create,
    edit,
    remove,
    preview,
    duplicate,
    reset,
    filter,
    importData,
    choose,
    manage,
    change,
    publish,
    getScript,
    reject,
    send,
    closed,
    resetAll,
  };
};
