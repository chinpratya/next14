import { css } from '@emotion/css';
import { Droppable } from '@hello-pangea/dnd';
import {
  Card,
  Row,
  Col,
  Radio,
  Divider,
  Grid,
  Typography,
  Skeleton,
  RadioChangeEvent,
  FormInstance,
} from 'antd';
import { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { usePermission, useToggle } from '@/hooks';
import { permissions } from '@/permissions';
import {
  PolicyBuilderContext,
  PolicyBuilderForm,
  PolicyBuilderFormContent,
  PolicyBuilderFormFields,
} from '@/shared';
import { usePolicyBuilderStore } from '@/stores/policy-builder';
import utils, { getColLayout } from '@/utils';
import { Flex } from '@components/flex';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetPolicyTemplateCustomize } from '../../api/get-policy-template-customize';
import { PolicyAddWizardModal } from '../policy-add-wizard-modal';
import { PolicyBuilderFormSetting } from '../policy-builder-form-setting';

export type PolicyBuilderProps = {
  policyId: string;
  templateId?: string;
  form: FormInstance;
};

export const PolicyBuilder = ({
  policyId,
  templateId,
  form,
}: PolicyBuilderProps) => {
  const toggle = useToggle();

  const editPermission = usePermission({
    moduleName: 'policy',
    policies: [
      permissions['pdpakit:policy:document:update'],
    ],
  });

  const { isHideAllPolicySections, initPolicySections } =
    usePolicyBuilderStore();

  const [currentSetting, setCurrentSetting] =
    useState<string>('formFields');

  const isMobile = !utils
    .getBreakPoint(Grid.useBreakpoint())
    .includes('xl');

  const { data, isLoading, isError } =
    useGetPolicyTemplateCustomize({
      templateId: policyId,
    });

  useEffect(() => {
    form.setFieldsValue({
      form_setting: data?.form_setting,
    });
    if (data?.form_sections) {
      initPolicySections(data?.form_sections);
    }
  }, [data, form, initPolicySections]);

  const onChangeCurrentSetting = (
    e: RadioChangeEvent
  ) => {
    setCurrentSetting(e.target.value);
  };

  return (
    <PolicyBuilderContext>
      <FallbackError isError={isError}>
        <Card>
          {isLoading ? (
            <Skeleton active />
          ) : (
            <Row
              style={{ minHeight: 'calc(100vh - 384px)' }}
            >
              <Col
                {...getColLayout(16)}
                className={
                  isMobile ? '' : 'border-right pr-4'
                }
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
                  <Droppable droppableId="policy-form-sections">
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{
                            background:
                              snapshot.isDraggingOver
                                ? '#FAFAFB'
                                : '',
                            minHeight: '100vh',
                            padding: '20px',
                          }}
                        >
                          {isHideAllPolicySections ? (
                            <div
                              className={css`
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                text-align: center;
                                height: 50vh;
                              `}
                            >
                              <h3
                                className={css`
                                  margin-top: 50vh;
                                `}
                              >
                                <IntlMessage id="policyManagement.policy.detail.builder.addPolicy" />{' '}
                                <Typography.Link
                                  onClick={() =>
                                    editPermission.isAllow
                                      ? toggle.create()
                                      : null
                                  }
                                  style={{
                                    color:
                                      editPermission.isAllow
                                        ? ''
                                        : '#928F8F',
                                  }}
                                >
                                  Wizard
                                </Typography.Link>
                              </h3>
                              <p>
                                <IntlMessage id="policyManagement.policy.detail.builder.selectPolicy" />
                              </p>
                            </div>
                          ) : (
                            <PolicyBuilderForm />
                          )}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </Scrollbars>
              </Col>
              <Col
                {...getColLayout(8)}
                className={isMobile ? '' : 'pl-4'}
              >
                <Flex justifyContent="center">
                  <Radio.Group
                    value={currentSetting}
                    onChange={onChangeCurrentSetting}
                    options={[
                      {
                        label: (
                          <IntlMessage id="policyManagement.policy.detail.builder.formFields" />
                        ),
                        value: 'formFields',
                      },
                      {
                        label: (
                          <IntlMessage id="policyManagement.policy.detail.builder.formContent" />
                        ),
                        value: 'formContent',
                      },
                    ]}
                    optionType="button"
                    buttonStyle="solid"
                  />
                </Flex>
                <Divider />
                <Scrollbars
                  autoHide
                  autoHideTimeout={1000}
                  autoHideDuration={200}
                  style={{
                    height: '100vh',
                    minHeight: 750,
                  }}
                >
                  {currentSetting === 'formFields' ? (
                    <PolicyBuilderFormFields
                      isLoading={isLoading}
                    />
                  ) : null}
                  <PolicyBuilderFormContent
                    form={form}
                    hidden={
                      currentSetting !== 'formContent'
                    }
                  />
                </Scrollbars>
              </Col>
            </Row>
          )}
        </Card>
        <PolicyAddWizardModal
          open={toggle.openCreate}
          onCancel={() => toggle.create()}
          templateId={templateId}
          policyId={policyId}
        />
        <PolicyBuilderFormSetting />
      </FallbackError>
    </PolicyBuilderContext>
  );
};
