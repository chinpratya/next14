import { css } from '@emotion/css';
import {
  useLocalStorage,
  useSetState,
} from '@mantine/hooks';
import { Divider, Form, Steps } from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useUpdateDomain } from '../../../domain';
import { useGetBanner } from '../../api/get-banner';
import { BannerSettingType } from '../../types';

import { BannerWizardPreview } from './banner-wizard-preview';
import { StyleLayoutSetting } from './style-layout-setting';

export type BannerWizardProps = {
  open?: boolean;
  onClose?: () => void;
  domainId?: string;
};

const steps = [
  {
    title: (
      <IntlMessage
        id={tokens.cookieManagement.modalWizard.step1}
      />
    ),
    description: (
      <IntlMessage
        id={
          tokens.cookieManagement.modalWizard
            .step1Description
        }
      />
    ),
  },
  {
    title: (
      <IntlMessage
        id={tokens.cookieManagement.modalWizard.step2}
      />
    ),
    description: (
      <IntlMessage
        id={
          tokens.cookieManagement.modalWizard
            .step2Description
        }
      />
    ),
  },
  {
    title: (
      <IntlMessage
        id={tokens.cookieManagement.modalWizard.step3}
      />
    ),
    description: (
      <IntlMessage
        id={
          tokens.cookieManagement.modalWizard
            .step3Description
        }
      />
    ),
  },
];

const stepsRender = (current: number, domainId: string) =>
  ({
    0: <StyleLayoutSetting type="banner" />,
    1: <StyleLayoutSetting type="preference" />,
    2: <BannerWizardPreview domainId={domainId} />,
  }[current]);

export const BannerWizard = ({
  open,
  onClose,
  domainId,
}: BannerWizardProps) => {
  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const [
    localStorageBannerPreview,
    setLocalStorageBannerPreview,
  ] = useLocalStorage({
    key: 'banner_preview',
    defaultValue: {},
  });

  const [state, setState] = useSetState<{
    current: number;
    setting?: BannerSettingType;
  }>({
    current: 0,
  });

  const updateDomain = useUpdateDomain({
    domainId: domainId ?? '',
    onSuccess: () => {
      onClose?.();
      showNotification({
        type: 'success',
        message: t(tokens.common.notification.saved),
      });
    },
  });

  const [form] = Form.useForm();

  const { data, isLoading, isError } = useGetBanner(
    domainId ?? ''
  );

  const onCurrentChange = (current: number) => {
    setState({ current });
  };

  const okText =
    state.current === 2
      ? t(tokens.common.save)
      : t(tokens.common.next);
  const cancelText =
    state.current === 0
      ? t(tokens.common.cancel)
      : t(tokens.common.back);

  const onOk = () => {
    if (state.current === 2) {
      updateDomain.submit({
        setting: state.setting,
      });
    } else {
      setState({ current: state.current + 1 });
    }
  };

  const onCancel = () => {
    if (state.current === 0) {
      onClose?.();
    } else {
      setState({ current: state.current - 1 });
    }
  };

  useEffect(() => {
    if (data && !state.setting) {
      setLocalStorageBannerPreview({
        ...(localStorageBannerPreview ?? {}),
        [domainId ?? '']: data,
      });
      form.setFieldsValue(data);
      setState({ setting: data });
    }
  }, [
    data,
    domainId,
    form,
    localStorageBannerPreview,
    setLocalStorageBannerPreview,
    setState,
    state.setting,
  ]);

  const onValuesChange = (
    changedValues: Record<string, unknown>
  ) => {
    setLocalStorageBannerPreview({
      ...(localStorageBannerPreview ?? {}),
      [domainId ?? '']: _.merge(
        state.setting,
        changedValues
      ),
    });
    setState({
      setting: _.merge(state.setting, changedValues),
    });
  };

  return (
    <Modal
      title={
        <IntlMessage
          id={tokens.cookieManagement.modalWizard.title}
        />
      }
      open={open}
      width="75vw"
      okText={okText}
      cancelText={cancelText}
      onOk={onOk}
      onCancel={onClose}
      loading={isLoading}
      cancelButtonProps={{
        onClick: onCancel,
      }}
      okButtonProps={{
        loading: updateDomain.isLoading,
      }}
      afterClose={() => {
        setState({ current: 0 });
        form.resetFields();
      }}
    >
      <FallbackError isError={isError}>
        <div className="pl-4 pr-4">
          <Steps
            current={state.current}
            className={css`
              .ant-steps-item-description {
                max-width: 200px !important;
              }
            `}
            onChange={onCurrentChange}
            items={steps}
          />
        </div>
        <Divider />
        <div
          className="pl-4 pr-4"
          style={{
            height: 500,
          }}
        >
          <Form
            form={form}
            onValuesChange={onValuesChange}
          >
            {stepsRender(state.current, domainId ?? '')}
          </Form>
        </div>
      </FallbackError>
    </Modal>
  );
};
