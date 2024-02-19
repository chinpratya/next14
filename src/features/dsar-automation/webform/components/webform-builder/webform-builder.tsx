import { useSetState } from '@mantine/hooks';
import {
  Card,
  Col,
  Divider,
  Grid,
  Radio,
  Row,
} from 'antd';
import { useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import {
  ConsentBuilderContent,
  ConsentBuilderContext,
  ConsentBuilderForm,
  ConsentBuilderFormContent,
  ConsentBuilderFormFields,
  ConsentBuilderLogo,
  ConsentStyleWrapper,
  ConsentVisibilities,
} from '@/shared';
import { useConsentBuilderStore } from '@/stores/consent-builder';
import utils, { getColLayout } from '@/utils';
import { Flex } from '@components/flex';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetWebformTemplate } from '../../api/get-webform-template';

const { useBreakpoint } = Grid;

export type WebformBuilderProps = {
  webformId: string;
};

export const WebformBuilder = ({
  webformId,
}: WebformBuilderProps) => {
  const { onInitiateForm, reset, formSetting } =
    useConsentBuilderStore();

  const { data, isError, isLoading } =
    useGetWebformTemplate(webformId);

  const [state, setState] = useSetState<{
    selectedTab:
      | 'formFields'
      | 'formContent'
      | 'visibilityRule';
  }>({
    selectedTab: 'formFields',
  });

  const isMobile = !utils
    .getBreakPoint(useBreakpoint())
    .includes('xl');

  useEffect(() => {
    if (data) {
      onInitiateForm(data.form);
    }
    return () => {
      reset();
    };
  }, [data, onInitiateForm, reset]);

  return (
    <FallbackError isError={isError}>
      <ConsentBuilderContext>
        <Card loading={isLoading}>
          <Row
            style={{ minHeight: 'calc(100vh - 384px)' }}
          >
            <Col
              {...getColLayout(16)}
              className={
                isMobile ? '' : 'border-right pr-4'
              }
            >
              <ConsentStyleWrapper
                pageSetting={formSetting?.page}
              >
                <ConsentBuilderLogo />
                <ConsentBuilderContent type="header" />
                <ConsentBuilderForm />
                <ConsentBuilderContent type="footer" />
              </ConsentStyleWrapper>
            </Col>
            <Col
              {...getColLayout(8)}
              className={isMobile ? '' : 'pl-4'}
            >
              <Scrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                style={{
                  height: '100vh',
                  minHeight: 750,
                }}
              >
                <Flex justifyContent="center">
                  <Radio.Group
                    value={state.selectedTab}
                    onChange={(e) =>
                      setState({
                        selectedTab: e.target.value,
                      })
                    }
                    options={[
                      {
                        label: (
                          <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formFields" />
                        ),
                        value: 'formFields',
                      },
                      {
                        label: (
                          <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formContent" />
                        ),
                        value: 'formContent',
                      },
                      {
                        label: (
                          <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.rule" />
                        ),
                        value: 'visibilityRule',
                        style: {
                          minWidth: 80,
                          textAlign: 'center',
                        },
                      },
                    ]}
                    optionType="button"
                    buttonStyle="solid"
                  />
                </Flex>
                <Divider />
                {state.selectedTab === 'formFields' && (
                  <ConsentBuilderFormFields
                    isUseActivitiesPanel={false}
                    isUsePurposesPanel={false}
                  />
                )}
                {state.selectedTab === 'formContent' && (
                  <ConsentBuilderFormContent />
                )}
                {state.selectedTab ===
                  'visibilityRule' && (
                  <ConsentVisibilities
                    usageConditions={[
                      'visibility',
                      'workflow',
                    ]}
                  />
                )}
              </Scrollbars>
            </Col>
          </Row>
        </Card>
      </ConsentBuilderContext>
    </FallbackError>
  );
};
